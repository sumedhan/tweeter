'use strict';

//Requires mongo object id
const ObjectId = require('mongodb').ObjectID;

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
      let tweetid = ObjectId(details.tweetid);
      let likes = details.likes;
      console.log(details);
      db.collection("tweets").findOneAndUpdate({'_id':tweetid}, {$set: {'likes': likes}}, (err, doc) => {
          callback(err, doc);
        });
    }
  }
};
