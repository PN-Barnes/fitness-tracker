const express = require('express');
const mongojs = require('mongojs');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

const Workout = require('./models/workout');
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const databaseUrl = 'fitnessTracker';
const collections = ['Workout'];
const db = mongojs(databaseUrl, collections);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
});

app.get('/exercise', (req, res) => {
  // if (error) {
  //   res.send(error);
  // } else {
  res.sendFile(path.join(__dirname, './public/exercise.html'));
  // }
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.get('/stats', (req, res) => {});

app.get('/api/workouts', (req, res) => {
  db.Workout.findOne((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get('/api/workouts/range', (req, res) => {
  db.Workout.find()
    .sort({ day: 1 })
    .limit(7, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
});

// app.post('/api/workouts', (req, res) => {
//   Workout.create(req.body)
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//       console.log('Successful');
//     });
// });

// ? Port is listening //
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
