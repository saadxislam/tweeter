/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Escape XSS chars
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const dateObj = new Date(tweet.created_at * 1000);
  const utcString = dateObj.toUTCString();

  const time = utcString.slice(0, 11);
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
    <footer class="tweet-footer-container">${time}</footer>
    <div class="tweet-icon-container">
      <img class="bottom-image">&#x1f501
      <img class="bottom-image">&#x1f308
      <img class="bottom-image">&#9829

    </div>
  </div>
  </article>`;
  return $tweet;
};

//Loop thru an array of objects to render one tweet
const renderTweets = function(data) {
  data.forEach(tweet => {
    $("#tweet-section").prepend(createTweetElement(tweet));
    $('.counter').html(140);
  });
};

$(document).ready(function() {

  const $button = $('#btn');
  $button.on('click', function(event) {
    $(".error").slideUp();
    event.preventDefault();

    const $textContent = $("#form");
    const newTweet = ($("#tweet-text").val());

    if (newTweet.length > 140 || newTweet.length === 0) {
      $(".error").slideDown();
      $('.error').css({ "visibility": "visible" });
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: $textContent.serialize(),
      }).then((res) => {
        document.getElementById("form").reset();
        $.ajax("/tweets/", { method: 'GET' })
          .then(function(res, err) {
            console.log('res :', res);
            renderTweets([res[res.length - 1]]);
          });
      });
    }
  });

  //Getting tweets from the db
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(res, err) {
        renderTweets(res);
      });
  };
  loadTweets();
});


