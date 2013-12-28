var util = require('util'),
    twitter = require('twitter'),
    secret = require('./secret');

var twit = new twitter({
    consumer_key: secret.consumer_key,
    consumer_secret: secret.consumer_secret,
    access_token_key: secret.access_token_key,
    access_token_secret: secret.access_token_secret
});

function filter(arr, criteria) {
  return arr.filter(function(obj) {
    return Object.keys(criteria).every(function(c) {
      return obj[c] == criteria[c];
    });
  });
}

twit.get('/statuses/user_timeline.json', {count: 100, user_id:"timkim", screen_name:"timkim"}, function(data) {
    //console.log(util.inspect(data));
    console.log(filter(data,{'favorited': true}));
});

/*
twit.verifyCredentials(function(data) {
        console.log(util.inspect(data));
    })
*/