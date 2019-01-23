/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(function () {
  const tweetData = [
    {
      'user': {
        'name': 'Newton',
        'avatars': {
          'small':   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
          'regular': 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
          'large':   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png'
        },
        'handle': '@SirIsaac'
      },
      'content': {
        'text': 'If I have seen further it is by standing on the shoulders of giants'
      },
      'created_at': 1461116232227
    },
    {
      'user': {
        'name': 'Descartes',
        'avatars': {
          'small':   'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png',
          'regular': 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png',
          'large':   'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png'
        },
        'handle': '@rd' },
      'content': {
        'text': 'Je pense , donc je suis'
      },
      'created_at': 1461113959088
    },
    {
      'user': {
        'name': 'Johann von Goethe',
        'avatars': {
          'small':   'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png',
          'regular': 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png',
          'large':   'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png'
        },
        'handle': '@johann49'
      },
      'content': {
        'text': 'Es ist nichts schrecklicher als eine tätige Unwissenheit.'
      },
      'created_at': 1461113796368
    }
  ];

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
    var $timeStamp = $('<span>').text(timeStamp);
  
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

  // Load initial tweets
  renderTweets(tweetData);

  //  Event listener for submitting form to post new tweet
  $('#tweetcreater').on('submit', function(event) {
    // prevent the default behavor
    event.preventDefault();
    const serializedData = $(this).serialize();

    // Ajax post
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serializedData
    }).done(function() {
      // on success, refresh the creaks on the page
      renderTweets(tweetData);
      console.log("Yup! I am done");
    });
  });
  
});
