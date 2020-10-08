$(document).ready(function() {
  $('#tweet-text').keyup(function(evt){
    const $input = $(this); //this is umm this
    const inputDynamic = ($input.val().length); // input.val is a string, and .length gives us the dynamic value of our input
    const form = $input.closest('form') //up the tree
    const counter = form.find('.counter') // down the tree
    counter.html(140 - inputDynamic); //counter.html accesses the innerHTML

    if(inputDynamic > 140){
      counter.addClass('redColor');
    } else {
      counter.removeClass('redColor');
    }
  });
});

// const newTweet = ($("#tweet-text").val()); //jquery gets me the value of tweettext
// if (newTweet.length > 140 || newTweet.length === 0) {
//   alert('please enter a valid tweet');