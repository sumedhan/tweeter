/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

$(function () {
  const tweetContainer = $('.tweet-container');

  function createTweetHeader(avatar, name, handle) {
    const $avatar = $('<img>').attr('src', avatar);
    const $name = $('<h2>').text(name);
    const $handle = $('<h5>').text(handle);
    const $header = $('<header>').append($avatar, $name, $handle);
    return $header;
  }

  function createTweetSection(contentText) {
    const $section = $('<section>').text(contentText);
    return $section;
  }

  function createTweetFooter(timeStamp, id, likes) {
    // Time ago calculator
    const timeStampInSeconds = timeStamp / 1000;
    const $timeStamp = $(`<span data-livestamp=${timeStampInSeconds}>`);

    // Uses the awesome icons CSS to display awesome icons.
    const $symbols = $('<span>').addClass('symbols');
    const $flag = $('<i>').addClass('fas fa-flag');
    const $retweet = $('<i>').addClass('fas fa-retweet');
    const $heart = $('<i>').addClass('fas fa-heart');
    $heart.data('tweetid', id);
    $heart.text(likes);

    $symbols.append($flag, $retweet, $heart);

    const $footer = $('<footer>');
    $footer.append($timeStamp, $symbols);
    return $footer;
  }

  //  Function creates tweet element with three helper functions creating header, section and footer
  function createTweetElement(tweetData) {
    const $tweet = $('<article>').addClass('tweet');
    const $header = createTweetHeader(tweetData.user.avatars.small,
      tweetData.user.name,
      tweetData.user.handle);
    $tweet.append($header);
    const $section = createTweetSection(tweetData.content.text);
    $tweet.append($section);
    // eslint-disable-next-line dot-notation
    const $footer = createTweetFooter(tweetData['created_at'], tweetData['_id'], tweetData.likes);
    $tweet.append($footer);
    return $tweet;
  }

  // Renders tweets to tweet-container
  function renderTweets(tweetData) {
    tweetContainer.empty();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tweetData.length; i++) {
      const $tweet = createTweetElement(tweetData[i]);
      tweetContainer.prepend($tweet);
    }
  }

  // Validates data entered
  function validateData(data) {
    if (!data) {
      return 'Error! Empty Tweet!';
    }
    if (data.length > 140) {
      return 'Over 140 characters!';
    }
    return true;
  }
  // Ajax to fetch tweets
  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).done(function (tweets) {
      renderTweets(tweets);
    });
  }

  // Called load tweets to load the page the first time
  loadTweets();
  //  Event listener for submitting form to post new tweet
  $('#tweetcreater').on('submit', function (event) {
    // prevent the default behavor
    event.preventDefault();
    $('.error').slideUp('fast');
    const serializedData = $(this).serialize();
    const $textarea = $(this).find('textarea');
    const $counter = $(this).find('.counter');
    const validate = validateData($textarea.val());
    if (validate === true) {
      // Ajax post
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serializedData,
      }).done(function () {
        // on success, refresh the tweets on the page
        loadTweets();
        document.getElementById('tweetcreater').reset();
        $counter.text(140);
      });
    } else {
      $('.error').text(validate);
      $('.error').slideDown('fast');
    }
  });

  // Toggle compose
  $('.compose').on('click', function () {
    const composeVisible = $('.new-tweet').is(':visible');
    if (composeVisible) {
      $('.new-tweet').slideUp('slow');
    } else {
      $('.new-tweet').slideDown('slow');
      $('section.new-tweet textarea').focus();
    }
  });


  // Like button
  $(document).on('click', '.symbols i.fa-heart', function () {
    const tweetid = $(this).data('tweetid');
    let likeNum = Number($(this).text());
    likeNum += 1;
    $.ajax({
      method: 'POST',
      url: `/tweets/${tweetid}/like`,
      data: { likes: likeNum },
    }).done(function () {
      loadTweets();
    });
  });
});
