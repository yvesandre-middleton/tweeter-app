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


//  const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

//  const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

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







