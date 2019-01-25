'use strict';

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require('./util/simulate-delay');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },


    // Get all tweets in `db`
    getTweets (callback) {
      db.collection("tweets").find().toArray((callback));
    },

    //Likes the tweet
    likeTweet (details, callback) {
      let tweetid = details.tweetid;
      let likeOrUnlike = (details.likeOrUnlike);
      //console.log(tweetid, likeOrUnlike);
      //db.collection("tweets").findOneAndUpdate({})
    }






  }
};
