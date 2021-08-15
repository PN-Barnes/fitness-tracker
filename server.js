const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
