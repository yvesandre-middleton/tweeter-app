/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {

// Function uses ajax to fetch and post tweets. This also helps check if input is non
// existent and too long and if not prevents submission and helps display error messages
$(function() {
  var $newTweet = $('.my-form')
  var $allTweets = $('.all-tweets')
  $newTweet.on('submit', function (ev) {
    ev.preventDefault()
    if ($('textarea').val().length === 0) {
      $('.error2').addClass('displayErrors')
    } else if ($('textarea').val().length <= 140 && $('textarea').val().length !== 0) {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function (data) {
        console.log('Success: ', data)
        console.log(data)
        loadTweets()
        $('.tweet').remove()
        $('textarea').val('')
        $('.counter').text('140')
        }
    })
    }
  })
})

// Function loads tweets using ajax request
const loadTweets = () => {

  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (loadTweets) {
      console.log('Success: ', loadTweets)
      renderTweets(loadTweets)
      // location.reload()
    }
  })
}

loadTweets()

// Function renders tweets using ajax request
function renderTweets(data) {
  for (key of data) {
    var $tweet = createTweetElement(key)
    $('.all-tweets').prepend($tweet)
// Function helps us show icons when hovering over a tweet
  }
    $('.tweet').on('mouseleave', function (){
    $(this).removeClass('hover')
    })

  $('.tweet').on('mouseenter', function (){
    $(this).addClass('hover')
  })
}

  $('.tweet').on('mouseleave', function (){
    $(this).removeClass('hover')
  })

  $('.tweet').on('mouseenter', function (){
    $(this).addClass('hover')
  })
// Function toggles or compose form up and down
  $('.compose-button').on('click', function (){
    $('.new-tweet').slideToggle(300)
    $('textarea').focus()
    console.log('hello')
  })

})
// Function converts date to display minutes, hours, or days ago tweet was posted
function convertDate(created_at) {
  var milliseconds = Date.now() - created_at
  var seconds = milliseconds / 1000
  var minutes = seconds / 60
  var hours = minutes / 60
  var days = hours / 24
  if (seconds < 60) {
    return (Math.round(seconds) + ' Second(s) ago')
  } else if (minutes < 60) {
    return (Math.round(minutes) + ' Minute(s) ago')
  } else if (hours < 24) {
    return (Math.round(hours) + ' Hour(s) ago')
  } else (days > 0)
  return (Math.round(days) + ' Day(s) ago')
}
// Function creates a new tweet
function createTweetElement (tweet) {
  return '<article class="tweet"> \
              <header class="tweet-header"><img class="handle-logo" src="' + tweet.user.avatars.regular + '"/><p class="name">' + tweet.user.name + '</p><p class="handle">' + tweet.user.handle + '</p></header> \
              <p class="tweet-content">' + escape(tweet.content.text) + '</p> \
              <footer>' + convertDate(tweet.created_at) + '\
              <div class="icons"> \
              <i class="fa fa-flag" aria-hidden="true"></i> \
              <i class="fa fa-retweet" aria-hidden="true"></i> \
              <i class="fa fa-heart" aria-hidden="true"></i> \
              </div> \
            </footer> \
            </article>'
}
// Function helps us esacape unsafe characters so script can't be inputted into
// form and have it render output
function escape(str) {
  var div = document.createElement('div')
  div.appendChild(document.createTextNode(str))
  return div.innerHTML
}






