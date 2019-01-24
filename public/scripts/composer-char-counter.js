/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line no-undef
// eslint-disable-next-line func-names
$(function () {
  const tweet = "textarea[name='text']";
  // eslint-disable-next-line func-names
  $(tweet).on('input change reset', function() {
    let charCounter = 140 - $(this).val().length;
    let counter = $(this).siblings('.counter');
    counter.text(charCounter);
    if (charCounter < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  });
});
