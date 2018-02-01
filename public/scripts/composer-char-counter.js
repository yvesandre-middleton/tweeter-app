
// Function changes the counter to red when it goes above 140
// Function also helps us display an error message and block submission when tweet
// is too long or there is nothing in the text field
$( document ).ready(function() {
    console.log( 'ready!' )
    $('textarea').on('input', function() {
      var charCount = $(this).val().length
      $('.counter').text(140 - charCount)
      console.log(charCount)
      if (charCount > 140) {
        $('.new-tweet .counter').addClass('red')
        $('.error1').addClass('displayErrors')
      } else if ($('textarea').val().length === 0) {
        $('.error2').addClass('displayErrors')
      } else {
        $('.new-tweet .counter').removeClass('red')
        $('.error1').removeClass('displayErrors')
        $('.error2').removeClass('displayErrors')
      }
      console.log( $(this).val().length) //The this keyword is a reference to the button
    })
})


