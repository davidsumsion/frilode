const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./db/commonDB.js');
const { peerProxy } = require('./db/peerProxy.js');
const authCookieName = 'token';

// The service port. The front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.set('trust proxy', true); // Trusts headers that are forwarded from the proxy to determine IP addresses


var apiRouter = express.Router();
app.use(`/api`, apiRouter);
var apiSecureRouter = express.Router();
app.use(`/api`, apiSecureRouter);

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

apiSecureRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized Request' });
  }
});

////////////////
//AUTHENTICATION
////////////////

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

apiRouter.post('/auth/create', async (req, res) => {
  const existingUser = await DB.getUser(req.body.username)
  if (!existingUser) {
    const user = await DB.createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ id: user._id, complete: false });
  } else {
    res.status(409).send({ msg: 'Existing User' });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      const userProfile = (user.phone, user.firstName, user.preferredName, user.lastName) ? true : false
      res.send({ id: user._id, complete: userProfile });
      return;
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } else {
    res.status(404).send({ msg: 'Username Does Not Exist' });
  }
});

apiRouter.delete('/auth/logout', (_req, res) => {
  try {
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    res.status(500).send({ msg: 'Error Logging Out' })
  }
});

apiSecureRouter.patch('/updateuser', async (req, res) => {
  const newUserInf = req.body
  const token = req.cookies.token;
  try {
    await DB.updateUserInfo(newUserInf, token)
    res.sendStatus(200)
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    res.status(500).send({ msg: 'Error Updating User' })
  }
})

//////////////////////////
////// Vehicle Calls /////
//////////////////////////

apiSecureRouter.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await DB.getVehiclesByClass(req.headers.vehicletype)
    res.send(vehicles)
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    res.status(500).send({ msg: 'Error Getting Vehicle By Class' })
  }
});

apiSecureRouter.patch('/rentVehicle', async (req, res) => {
  try {
    const vehicleId = req.body['vehicle-id'];
    await DB.rentVehicle(vehicleId)
    res.sendStatus(200)
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    res.status(500).send({ msg: 'Error Renting Vehicle' })
  }
})

apiSecureRouter.post('/addVehicle', async (req, res) => {
  try {
    await DB.createVehicle(req.body);
    res.sendStatus(200)
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    res.status(500).send({ msg: 'Error Adding Vehicle' })
  }
  
})

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
