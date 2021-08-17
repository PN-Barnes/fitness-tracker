const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: Number,
  exercises: [
    {
      workoutType: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
  totalDuration: {
    timeType: Number,
  },
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
