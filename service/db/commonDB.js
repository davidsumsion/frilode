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

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((e) => {
  console.log(`Unable to connect to database with ${url} because ${e.message}`);
  process.exit(1);
});

///////////
// Users //
///////////

function getUser(username) {
  try {
    const user =  userCollection.findOne({ username: username });
    return user
  } catch (e) {
    throw new Error(`Error in getUser: ${e}`)
  }
}

function getUserByToken(token) {
  try {
    return userCollection.findOne({ token: token });
  } catch (e) {
    throw new Error(`Error in getUserByToken: ${e}`)
  }
}

async function createUser(email, password) {
  try {
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
  } catch (e) {
    throw new Error(`Error in createUser: ${e}`)
  }
}

async function updateUserInfo(updatedUserInfo, token) {
  try {
    const {phone, firstName, lastName, preferredName} = updatedUserInfo
    await userCollection.updateOne(
      { token: token }, 
      {$set:{firstName: firstName, lastName:lastName, preferredName: preferredName, phone: phone}}
      )
  } catch (e) {
    throw new Error(`Error in updateUserInfo: ${e}`)
  }
}

//////////////
// Vehicles //
async function getVehiclesByClass(vehicleType) {
  try {
    return await vehicleCollection.find({ vehicleType: vehicleType}).toArray()
  } catch (e) {
    throw new Error(`Error in getVehiclesByClass: ${e}`)
  }
}

async function rentVehicle(vehicleID) {
  try {
    await vehicleCollection.updateOne(
      {_id: ObjectId(vehicleID)},
      { $set: {rented: true}}
    )
  } catch (e) {
    throw new Error(`Error in rentVehicle: ${e}`)
  }
}

function createVehicle(vehicle) {
  try {
    const requiredFields = [ 'vehicleType', 'name', 'priceDay', 'priceHour', 'make', 'model', 'description', 'image']
    const missingFields = requiredFields.filter(field => !vehicle[field]);
    if (missingFields.length === 0 ){
      vehicleCollection.insertOne(vehicle)
    } else {
      throw new Error(`Missing required field(s) for vehicle: ${missingFields.join(", ")}`)
    }
  } catch (e) {
    throw new Error(`Error in createVehicle: ${e.message}`)
  }
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
