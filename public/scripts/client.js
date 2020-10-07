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



const createTweetElement = (tweet) => {
  const $tweet = `<article class="article">
        
  <div class="tweet-header-container">
    <div class="tweet-header-left">
      <img src="${tweet.user.avatars}"/>
      <header class="tweet-header">${tweet.user.name}</header>
    </div>
   
    <header class="tweet-header-2">${tweet.user.handle}</header>
  </div>
  <p class="tweet-body">${tweet.content.text}</p>
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
  // loops through tweets
  let $tweet = '';
  data.forEach(tweet => {
    console.log(tweet);
    $tweet += createTweetElement(tweet);
  })
   $('.article').append($tweet);
}

$(document).ready(function () {
  // renderTweets(data);

  const $button = $('#btn');
  $button.on('click', function (event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    const $textContent = $("#form")
    console.log('textContent :', $textContent);
    console.log($textContent.serialize())
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: $textContent.serialize(),
    }).then(function() {
        alert( "Data Saved" );
      
    });

    const loadTweets = () => {
      $.ajax('/tweets', { method: 'GET' })
        .then(function (res, err) {
          renderTweets(res)
        });
      }
      loadTweets();
  

  });

});


