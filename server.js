const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const mongojs = require('mongojs');

const PORT = process.env.PORT || 3000;

const Workout = require('./models/workout');

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const databaseUrl = 'fitnessTracker';
const collections = ['workouts'];
const db = mongojs(databaseUrl, collections);
db.on('error', (error) => {
  console.log('Database Error:', error);
});

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
});

// app.get('/');

// ? Port is listening //
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
