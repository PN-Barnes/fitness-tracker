const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

const { Workout } = require('./models');
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitnessTracker',
  {
    useNewUrlParser: true,
  }
);

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.get('/api/workouts', (req, res) => {
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.get('/api/workouts/range', (req, res) => {
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  })
    .sort({ day: -1 })
    .limit(7);
});

app.post('/api/workouts', (req, res) => {
  const newExercise = req.body;
  Workout.create(newExercise)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.put('/api/workouts/:id', (req,res) => {
//   db.Workout.update({
//     id: mongojs.ObjectId(params.id)
//   },
//   {
//     $set: {
//       req.body
//     }
//   })
// })

// ? Port is listening //
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
