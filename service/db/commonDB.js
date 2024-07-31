const config = require('./dbConfig.json');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { MongoRuntimeError } = require('mongodb/lib/error');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

// current collections
const db = client.db('test');
const userCollection = db.collection('user');
const vehicleCollection = db.collection('vehicles');
const licenseCollection = db.collection('license');

// future collections
const bookingCollection = db.collection('booking');
// const mediaCollection = db.collection('media');
// const waiverCollection = db.collection('waiver');
// const messagesCollection = db.collection('messages');

// Old Collections
// const jetSkiCollection = db.collection('jetski');
// const snowmobileCollection = db.collection('snowmobile');
// const razorCollection = db.collection('razor');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

///////////
// Users //
function getUser(username) {
    const user =  userCollection.findOne({ username: username });
    return user
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: email,
    password: passwordHash,
    token: uuid.v4(),
    phone: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    rentedVehicles: {},
    ownedVehicles: {}
  };
  await userCollection.insertOne(user);
  return user;
}

async function updateUserInfo(updatedUserInfo, token) {
  try {
    const {phone, firstName, lastName, preferredName} = updatedUserInfo
    await userCollection.updateOne(
      { token: token }, 
      {$set:{firstName: firstName, lastName:lastName, preferredName: preferredName, phone: phone}}
      )
  } catch (e) {
    throw new Error(e)
  }
}

//////////////
// Vehicles //
function getVehiclesByClass(vehicleType) {
  return vehicleCollection.find({ vehicleType: vehicleType}).toArray()
}

async function rentVehicle(vehicleID) {
  await vehicleCollection.updateOne(
    {_id: ObjectId(vehicleID)},
    { $set: {rented: true}}
  )
}

function createVehicle(vehicle) {
  //TODO validate vehicle before this function is called
  vehicleCollection.insertOne(vehicle)
}

function removeVehicle(vehicleID) {
  vehicleCollection.deleteOne(
      { _id: ObjectId(vehicleID) }
  )
}


/////////////
// booking //
async function createBooking(userId, vehicleId, reservationDates) {
  const booking = {
    userId: userId,
    vehicleId: vehicleId,
    reservationDates: reservationDates
  }
  await bookingCollection.insertOne(booking)
  return booking._id
}

function getBooking(bookingId) {
  const booking = bookingCollection.findOne( {_id : bookingId} )
  return JSON.stringify(booking)
}




module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getVehiclesByClass,
  rentVehicle,
  createVehicle,
  updateUserInfo,
  createBooking,
  getBooking
}
