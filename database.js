const config = require('./dbConfig.json');
const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const uuid = require('uuid');
// const config = require('./dbConfig.json');

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

function postListJetSkis(jetskilist){
  jetSkiCollection.deleteMany({})
  jetSkiCollection.insertMany(jetskilist);
  return jetSkiCollection.find({}).toArray();
}


// function addScore(score) {
//   scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getJetSkis,
  postJetSki,
  postListJetSkis
};
