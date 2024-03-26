const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');


const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// // JSON body parsing using built-in middleware
app.use(express.json());

// // Serve up the front-end static content hosting
app.use(express.static('public'));

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);



// // Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//LOGIN STUFF
////////////

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});



////VEHICLES STUFF
//////////////////


var apiSecureRouter = express.Router();
app.use(`/api`, apiSecureRouter);

apiSecureRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


apiSecureRouter.delete('/delete', (req, res) => {
  console.log("made it to delete")
  if (req.body.vehicle == 'jetski'){
    DB.deleteVehicles('jetski');
    res.sendStatus(200);
  } else if (req.body.vehicle == 'snowmobile'){
    DB.deleteVehicles('snowmobile');
    res.sendStatus(200);
  } else if (req.body.vehicle == 'razor'){
    DB.deleteVehicles('razor');
    res.sendStatus(200);
  }
});


// GetJetSkis
apiSecureRouter.get('/jetSki', async (_req, res) => {
    // res.send(jetSkiList);
    const jetSkis = await DB.getJetSkis();
    res.send(jetSkis);
  });

// SubmitJetSki
apiSecureRouter.post('/jetSki', (req, res) => {
    const jetSkiList = DB.postJetSki(req.body);
    // console.log(req.body);
    // jetSkiList.push(req.body);
    res.send(jetSkiList);
});




// GetSnowmobiles
apiSecureRouter.get('/snowmobile', async (_req, res) => {
    const snowmobiles = await DB.getSnowmobiles();
    res.send(snowmobiles);
  });

// SubmitSnowmobile
apiSecureRouter.post('/snowmobile', (req, res) => {
    const snowmobileList = DB.postSnowmobile(req.body);
  // console.log(req.body);
  // jetSkiList.push(req.body);
  // res.send(jetSkiList);
    // console.log(req.body);
    // snowmobileList.push(req.body);
    res.send(snowmobileList);
    });




// Get Razor
apiSecureRouter.get('/razor', async (_req, res) => {
    const razorList = await DB.getRazors();
    res.send(razorList);
  });

// Submit Razor
apiSecureRouter.post('/razor', (req, res) => {
  const razorList = DB.postRazor(req.body);
    // console.log(req.body);
    // razorList.push(req.body);
    res.send(razorList);
    });





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



// let snowmobileList = []
// let jetSkiList = []
// let razorList = []
//needs to be below getters and setters
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);


// // updateScores considers a new score for inclusion in the high scores.
// // The high scores are saved in memory and disappear whenever the service is restarted.
// let scores = [];
// function updateScores(newScore, scores) {
//   let found = false;
//   for (const [i, prevScore] of scores.entries()) {
//     if (newScore.score > prevScore.score) {
//       scores.splice(i, 0, newScore);
//       found = true;
//       break;
//     }
//   }

//   if (!found) {
//     scores.push(newScore);
//   }

//   if (scores.length > 10) {
//     scores.length = 10;
//   }

//   return scores;
// }

