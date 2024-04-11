const config = require('./dbConfig.json');
const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { MongoRuntimeError } = require('mongodb/lib/error');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
// const scoreCollection = db.collection('score');
const jetSkiCollection = db.collection('jetski');
const snowmobileCollection = db.collection('snowmobile');
const razorCollection = db.collection('razor');


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});



// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}


function getJetSkis() {
  return jetSkiCollection.find({}).toArray();
}

function postJetSki(jetSki) {
  jetSkiCollection.insertOne(jetSki)
  return jetSkiCollection.find({}).toArray();
}

function deleteVehicles(indicator){
  if (indicator == "jetski"){
    jetSkiCollection.deleteMany({});
  } else if (indicator == 'snowmobile') {
    snowmobileCollection.deleteMany({});
  } else if (indicator == 'razor') {
    razorCollection.deleteMany({});
  }
  
}


function getSnowmobiles() {
  return snowmobileCollection.find({}).toArray();
}

function postSnowmobile(snowmobile) {
  snowmobileCollection.insertOne(snowmobile)
  return snowmobileCollection.find({}).toArray();
}


function getRazors() {
  return razorCollection.find({}).toArray();
}

function postRazor(razor) {
  razorCollection.insertOne(razor)
  return razorCollection.find({}).toArray();
}



module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getJetSkis,
  postJetSki,
  deleteVehicles,
  getSnowmobiles,
  postSnowmobile,
  getRazors,
  postRazor,

};
