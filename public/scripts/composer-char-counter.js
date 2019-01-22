$(document).ready(function() {
  let tweet = "textarea[name='composeTweet']";
  $(tweet).on("input", function() {
    let charCounter = 140 - $(this).val().length;
    $(this).siblings(".counter").text(charCounter);
    if(charCounter < 0) {
      // $(this).parent().children(".counter").css("color", "red");
      $(this).siblings(".counter").addClass("invalid");
    }
  });
});