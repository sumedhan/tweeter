$( function() {
  let tweet = "textarea[name='text']";
  $(tweet).on("input", function() {
    let charCounter = 140 - $(this).val().length;
    let counter = $(this).siblings(".counter");
    counter.text(charCounter);
    if(charCounter < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});
