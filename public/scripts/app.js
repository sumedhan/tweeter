/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( function() {
  $(".article.tweet").on("hover",  function () {
    this.children().css("opacity","1");
  })
})
