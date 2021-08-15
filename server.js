const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./controllers');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

const databaseUrl = 'fitnessTracker';
const collections = ['workouts'];
const db = mongojs(databaseUrl, collections);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

db.on('error', (error) => {
  console.log('Database Error:', error);
});

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
