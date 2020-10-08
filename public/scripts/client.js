/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
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
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]


const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createTweetElement = (tweet) => {
  const $tweet = `<article class="article">
        
  <div class="tweet-header-container">
    <div class="tweet-header-left">
      <img src="${tweet.user.avatars}"/>
      <header class="tweet-header">${tweet.user.name}</header>
    </div>
   
    <header class="tweet-header-2">${tweet.user.handle}</header>
  </div>
  <p class="tweet-body">${escape(tweet.content.text)}</p>
  <div class="line"></div>
  <div class="tweet-footer-container">
    <footer class="tweet-footer-container">${tweet.created_at}</footer>
    <div class="tweet-icon-container">
      <img class="bottom-image">&#9787
      <img class="bottom-image">&#9835
      <img class="bottom-image">&#9829

    </div>
  </div>



  </article>`
  return $tweet;
}

const renderTweets = function(data) {
  data.forEach(tweet => {
    $("#tweet-section").prepend(createTweetElement(tweet));
    $('.counter').html(140);
  })
}

   

$(document).ready(function () {
 
  const $button = $('#btn');
  $button.on('click', function (event) {
    $(".error").slideUp();
  
    event.preventDefault();

    const $textContent = $("#form");
    const newTweet = ($("#tweet-text").val()); //jquery gets me the value of tweettext

    if (newTweet.length > 140 || newTweet.length === 0) {
      $(".error").slideDown();
      $('.error').css({"visibility": "visible" });
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: $textContent.serialize(),
    
      }).then((res) => {
        document.getElementById("form").reset();
        $.ajax("/tweets/", { method: 'GET' })
        .then(function (res, err) {
        console.log('res :', res);
          renderTweets([res[res.length-1]])

        })
      })
    }
  });
        
        
        
  

    
    
      const loadTweets = () => {
        $.ajax('/tweets', { method: 'GET' })
          .then(function (res, err) {
            renderTweets(res)
          });
        }
        loadTweets();

});


