/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

const express = require('express');
const userHelper = require('../lib/util/user-helper');

const tweetsRoutes = express.Router();

module.exports = (DataHelpers) => {
  tweetsRoutes.get('/', (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post('/', (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user,
      content: {
        text: req.body.text,
      },
      created_at: Date.now(),
      likes: '0',
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post('/:tweetid/like', (req, res) => {
    const details = {
      tweetid: req.params.tweetid,
      likes: req.body.likes,
    };
    DataHelpers.likeTweet(details, (err, doc) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.send(doc);
      }
    });
  });
  return tweetsRoutes;
};
