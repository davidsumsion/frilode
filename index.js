const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// // JSON body parsing using built-in middleware
app.use(express.json());

// // Serve up the front-end static content hosting
app.use(express.static('public'));

// // Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetJetSkis
apiRouter.get('/jetSki', (_req, res) => {
    res.send(jetSkiList);
  });

// SubmitJetSki
apiRouter.post('/jetSki', (req, res) => {
    console.log(req.body);
    jetSkiList.push(req.body);
    res.send(jetSkiList);
});

// SubmitJetSki
apiRouter.post('/jetSkiList', (req, res) => {
    console.log(req.body);
    jetSkiList = req.body
    res.send(jetSkiList);
});

// GetSnowmobiles
apiRouter.get('/snowmobile', (_req, res) => {
    res.send(snowmobileList);
  });

// SubmitSnowmobile
apiRouter.post('/snowmobile', (req, res) => {
    console.log(req.body);
    snowmobileList.push(req.body);
    res.send(snowmobileList);
    });


// GetRazor
apiRouter.get('/razor', (_req, res) => {
    res.send(razorList);
  });

// SubmitRazor
apiRouter.post('/razor', (req, res) => {
    console.log(req.body);
    razorList.push(req.body);
    res.send(razorList);
    });


// GetScores
// apiRouter.get('/scores', (_req, res) => {
//   res.send(scores);
// });

// // SubmitScore
// apiRouter.post('/score', (req, res) => {
//   scores = updateScores(req.body, scores);
//   res.send(scores);
// });






let snowmobileList = []
let jetSkiList = []
let razorList = []
//needs to be below getters and setters
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

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
