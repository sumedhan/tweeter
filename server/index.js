/* eslint-disable no-multi-spaces */

'use strict';

// Basic express setup:

// eslint-disable-next-line no-multi-spaces
const PORT          = 8080;
const express       = require('express');
const bodyParser    = require('body-parser');

const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//  Connecting to MongoDB
// eslint-disable-next-line prefer-destructuring
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

// Retrieving data from MongoDB
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log('Connected to MongoDB');

  const DataHelpers = require('./lib/data-helpers.js')(db);

  const tweetsRoutes = require('./routes/tweets')(DataHelpers);

  app.use('/tweets', tweetsRoutes);

  app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT);
  });
});


