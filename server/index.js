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
      return obj[c] >= criteria[c];
    });
  });
}

twit.get('/statuses/user_timeline.json', {count: 100, screen_name:"kpeatt", trim_user:true}, function(data) {
    //console.log(util.inspect(data));
    console.log(filter(data,{'favorite_count': 1}));
});

/*
twit.verifyCredentials(function(data) {
        console.log(util.inspect(data));
    })
*/

// build up a score for tweets based upon 
// existing entities.hashtags.length, favorite_count, retweet_count

/*
{
    "answer":"javascript",
    "text":"Tweet Button, Follow Button, and Web Intents $$$ANSWER$$$ now support SSL http:\/\/t.co\/9fbA0oYy ^TS",
    "user":{
        "created_at": "Mon Nov 29 21:18:15 +0000 2010",
        "name":"Twitter API", 
        "profile_image_url":"http:\/\/a2.twimg.com\/profile_images\/1438634086\/avatar_normal.png",
        "screen_name":"twitterapi",
    }
    
        
    }
}
*/