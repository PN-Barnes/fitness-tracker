const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: Date,
  exercises: [
    {
      type: String,
    },
  ],
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
