let mongoose = require('mongoose');
let { Workout } = require('../models');

mongoose.connect('mongodb://localhost/fitnessTracker', {
  useNewUrlParser: true,
  useFindAndModify: false,
});

let workoutSeed = [
  {
    day: new Date().setDate(new Date().getDate() - 9),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Bicep Curl',
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 9),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Lateral Pull',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 8),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Push Press',
        duration: 25,
        weight: 185,
        reps: 8,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 7),
    exercises: [
      {
        workoutType: 'cardio',
        name: 'Running',
        duration: 25,
        distance: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 6),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 5),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Quad Press',
        duration: 30,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
    exercises: [
      {
        workoutType: 'resistance',
        name: 'Military Press',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
];

Workout.deleteMany({})
  .then(() => Workout.insertMany(workoutSeed))
  .then((data) => {
    console.log(data.length + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
