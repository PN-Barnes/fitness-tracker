const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

const { Workout } = require('./models');
const { findOneAndUpdate } = require('./models/workout');
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
  Workout.create(req.body)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put('/api/workouts/:id', (req, res) => {
  console.log('API workouts route hit');
  console.log(req.body);
  const body = req.body;
  if (body.workoutType === 'resistance') {
    Workout.updateOne(
      { _id: req.params.id },
      {
        day: new Date(new Date().setDate(new Date().getDate())),
        exercises: [
          {
            workoutType: body.workoutType,
            exerciseName: body.exerciseName,
            duration: body.duration,
            weight: body.weight,
            reps: body.reps,
            sets: body.sets,
          },
        ],
      }
    )
      .then((exercise) => {
        console.log(Workout.exercises);
        console.log('Exercise Successful Resistance');
        res.status(200).json({ message: 'Succesful update' });
      })
      .catch((err) => {
        console.log('Resistance Fail');
        res.status(500).json(err);
      });
  } else {
    Workout.updateOne(
      { _id: req.params.id },
      {
        day: new Date(new Date().setDate(new Date().getDate())),
        exercises: [
          {
            workoutType: body.workoutType,
            exerciseName: body.exerciseName,
            distance: body.distance,
            duration: body.duration,
          },
        ],
        totalDuration: body.duration,
      }
    )
      .then((exercise) => {
        console.log(Workout.exercises);
        console.log('Exercise Successful Cardio');
        res.status(200).json({ message: 'Succesful update' });
      })
      .catch((err) => {
        console.log('Cardio fail');
        console.log(err);
        res.status(500).json(err);
      });
  }
});

app.delete('/api/workouts/:id', (req, res) => {
  const id = req.params.id;
  Workout.remove({ _id: id })
    .then((result) => {
      res.json(result, { message: 'successful delete' });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// ? Port is listening //
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
