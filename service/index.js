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
// Serve up the front-end static content hosting
app.use(express.static('public'));
// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());
// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);


var apiRouter = express.Router();
app.use(`/api`, apiRouter);
var apiSecureRouter = express.Router();
app.use(`/api`, apiSecureRouter);


////////////////
//AUTHENTICATION
////////////////

apiRouter.post('/auth/create', async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.username)
  const existingUser = await DB.getUser(req.body.username)
  if (existingUser) {
    console.log('Existing User')
    res.status(409).send({ msg: 'Existing User' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    console.log('New User Created')
    res.send({ id: user._id, complete: false});
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      const persInfo = (user.phone, user.firstName, user.preferredName, user.lastName) ? true : false
      res.send({ id: user._id, complete: persInfo });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token, ...user });
    // res.send({ authenticated: token === user.token, ...user });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

apiSecureRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiSecureRouter.patch('/updateuser', async (req, res) => {
  const newUserInf = req.body
  const token = req.cookies.token;
  try {
    await DB.updateUserInfo(newUserInf, token)
    res.sendStatus(200)
  } catch (e){
    console.log(`ERROR: ${e.message}`)
    res.sendStatus(500)
  }
})

// Erase DB Call
// apiSecureRouter.delete('/delete', (req, res) => {
//   if (req.body.vehicle == 'jetski'){
//     DB.deleteVehicles('jetski');
//     res.sendStatus(200);
//   } else if (req.body.vehicle == 'snowmobile'){
//     DB.deleteVehicles('snowmobile');
//     res.sendStatus(200);
//   } else if (req.body.vehicle == 'razor'){
//     DB.deleteVehicles('razor');
//     res.sendStatus(200);
//   }
// });


//////////////////////////
////// Vehicle Calls /////
apiSecureRouter.get('/vehicle', async (_req, res) =>{
  getVehicleHandler(_req.vehicleId)
    //implement 
});

apiSecureRouter.get('/vehicles', async (req, res) => {
  //TODO: implement error handling for when vehicleType DNE
  const vehicles = await DB.getVehiclesByClass(req.headers.vehicletype)
  res.send(vehicles)
});

apiSecureRouter.patch('/rentVehicle', async (req, res) => {
  //TODO: impolement error handling
  const vehicleId = req.body['vehicle-id'];
  await DB.rentVehicle(vehicleId)
  res.sendStatus(200)
})

apiSecureRouter.post('/addVehicle', async (req, res) => {
  // TODO: implement error handling
  await DB.createVehicle(req.body);
  res.sendStatus(200)
})


// //////////////////
// ///// Jet Ski ////
// apiSecureRouter.get('/jetSki', async (_req, res) => {
//     // res.send(jetSkiList);
//     console.log('get jet ski handler')
//     const jetSkis = await DB.getJetSkis();
//     res.send(jetSkis);
//   });

// apiSecureRouter.post('/jetSki', (req, res) => {
//   console.log('post jetski handler')
//     const jetSkiList = DB.postJetSki(req.body);
//     console.log(req.body);
//     // jetSkiList.push(req.body);
//     res.send(jetSkiList);
// });

// ////////////////////
// //// Snowmobile ////
// apiSecureRouter.get('/snowmobile', async (_req, res) => {
//     const snowmobiles = await DB.getSnowmobiles();
//     res.send(snowmobiles);
//   });

// apiSecureRouter.post('/snowmobile', (req, res) => {
//     const snowmobileList = DB.postSnowmobile(req.body);
//   // console.log(req.body);
//   // jetSkiList.push(req.body);
//   // res.send(jetSkiList);
//     // console.log(req.body);
//     // snowmobileList.push(req.body);
//     res.send(snowmobileList);
//     });

// ////////////////
// //// Razor /////
// apiSecureRouter.get('/razor', async (_req, res) => {
//     const razorList = await DB.getRazors();
//     res.send(razorList);
//   });

// apiSecureRouter.post('/razor', (req, res) => {
//   const razorList = DB.postRazor(req.body);
//     // console.log(req.body);
//     // razorList.push(req.body);
//     res.send(razorList);
//     });


    
// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);




/*
TODO:
 - TEST::: Combine vehicle API's to serve a single function (adding a vehicle, renting a vehicle, deleting a vehicle)
 - Object Validation before inserting into DB
 - Error handling on API's

*/
