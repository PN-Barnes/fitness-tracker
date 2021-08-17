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
  const body = req.body;
  if (body.workoutType === 'resistance') {
    Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
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
        },
      }
    )
      .then((exercise) => {
        res.json(exercise, { message: 'Succesful update' });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          workoutType: body.workoutType,
          exerciseName: body.exerciseName,
          duration: body.duration,
          distance: body.distance,
        },
      }
    )
      .then((exercise) => {
        res.json(exercise, { message: 'Succesful update' });
      })
      .catch((err) => {
        res.json(err);
      });
  }
  res.json({ message: 'successful Put route' });
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
