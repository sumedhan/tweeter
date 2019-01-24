/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  const tweetContainer = $('.tweet-container');

  //  Function that creates tweet element with three helper functions creating header, section and footer
  function createTweetElement(tweetData) {
    var $tweet = $('<article>').addClass('tweet');
    $header = createTweetHeader(tweetData.user.avatars.small, tweetData.user.name, tweetData.user.handle);
    $tweet.append($header);
    var $section = createTweetSection(tweetData.content.text);
    $tweet.append($section);
    var $footer = createTweetFooter(tweetData['created_at']);
    $tweet.append($footer);
    return $tweet;
  }

  function createTweetHeader(avatar, name, handle){
    var $avatar = $('<img>').attr('src',avatar);
    var $name = $('<h2>').text(name);
    var $handle = $('<h5>').text(handle);
    var $header = $('<header>').append($avatar, $name, $handle);
    return $header;
  }

  function createTweetSection(contentText) {
    var $section = $('<section>').text(contentText);
    return $section;
  }

  function createTweetFooter(timeStamp) {
    // Needs to changed to show time ago
    let timeStampInSeconds = timeStamp / 1000;
    var $timeStamp = $(`<span data-livestamp=${timeStampInSeconds}>`);
  
    // Uses the awesome icons CSS to display awesome icons.
    var $symbols = $('<span>').addClass('symbols');
    var $flag = $('<i>').addClass('fas fa-flag');
    var $retweet = $('<i>').addClass('fas fa-retweet');
    var $heart = $('<i>').addClass('fas fa-heart');
    $symbols.append($flag, $retweet, $heart);
    
    var $footer = $('<footer>');
    $footer.append($timeStamp, $symbols);
    return $footer;
  }

  // Renders tweets to tweet-container
  function renderTweets(tweetData) {
    tweetContainer.empty();
    for( var i = 0; i < tweetData.length; i++) {
      var $tweet = createTweetElement(tweetData[i]);
      tweetContainer.prepend($tweet);
    }
  }

  // Validates data entered 
  //The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
  //The form should not be cleared
  //The form should not submit
  function validateData(data) {
    if(!data) {
      return "Need to tweet something!"
    } else if (data.length > 140) {
      return "delete something";
    }
    return true;
  }
  // Ajax to fetch tweets 
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    }).done(function(tweets) {
      renderTweets(tweets);
    });
  };

  // Called load tweets to load the page the first time
  loadTweets();
  //  Event listener for submitting form to post new tweet
  $('#tweetcreater').on('submit', function(event) {
    // prevent the default behavor
    event.preventDefault();
    const serializedData = $(this).serialize();
    const $textarea = $(this).find("textarea")
    const $counter = $(this).find(".counter");
    const validate = validateData($textarea.val());
    if( validate === true) {
       // Ajax post
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: serializedData
        }).done(function() {
          // on success, refresh the creaks on the page
          loadTweets();
          document.getElementById('tweetcreater').reset();
          $counter.text(140);
        });
    } else {
      alert(validate);
    }
  });

  // Toggle compose 
  $(".compose").on('click', function() {
    $(".new-tweet").slideDown("slow");
    $("section.new-tweet textarea").focus();
  })

});
