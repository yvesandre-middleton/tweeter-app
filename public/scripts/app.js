/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {


$(function() {
  var $newTweet = $('.my-form');
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
        console.log('Success: ', data);
        // $allTweets.replaceWith(loadTweets);
        console.log(data)
        loadTweets()
        $('.tweet').remove()
        $('textarea').val('')
        $('.counter').text('140')
      }
    });
    }
  });
});

const loadTweets = () => {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (loadTweets) {
        console.log('Success: ', loadTweets);
        renderTweets(loadTweets);
        // location.reload()
      }
  });
}

  loadTweets()


  function renderTweets(data) {
    for (key of data) {
      var $tweet = createTweetElement(key);
      $('.all-tweets').prepend($tweet)

    }
    $('.tweet').on('mouseleave', function (){
    $(this).removeClass('hover')
  })

  $('.tweet').on('mouseenter', function (){
    $(this).addClass('hover')
  })
  }

 function createTweetElement (tweet) {
// var $tweet = $("<article>").addClass("tweet");
  return '<article class="tweet"> \
              <header class="tweet-header"><img class="handle-logo" src="' + tweet.user.avatars.regular + '"/><p class="name">' + tweet.user.name + '</p><p class="handle">' + tweet.user.handle + '</p></header> \
              <p class="tweet-content">' + escape(tweet.content.text) + '</p> \
              <footer>' + tweet.created_at + ' days ago\
              <div class="icons"> \
              <i class="fa fa-flag" aria-hidden="true"></i> \
              <i class="fa fa-retweet" aria-hidden="true"></i> \
              <i class="fa fa-heart" aria-hidden="true"></i> \
              </div> \
            </footer> \
            </article>'
}




  // $('footer .icons').hide()
  // renderTweets(data);

  $('.tweet').on('mouseleave', function (){
    $(this).removeClass('hover')
  })

  $('.tweet').on('mouseenter', function (){
    $(this).addClass('hover')
  })

  $('.compose-button').on('click', function (){
    $('.new-tweet').slideToggle(300)
    $('textarea').focus()
    console.log('hello')
  })

  function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

});







