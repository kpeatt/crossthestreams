var util = require('util'),
    twitter = require('twitter'),
    secret = require('./secret');

var twit = new twitter({
    consumer_key: secret.consumer_key,
    consumer_secret: secret.consumer_secret,
    access_token_key: secret.access_token_key,
    access_token_secret: secret.access_token_secret
});

function filterGTEquals(arr, criteria) {
  return arr.filter(function(obj) {
    return Object.keys(criteria).every(function(c) {
      return obj[c] >= criteria[c];
    });
  });
}

function buildScore(arr){
    for(var i=0; i<arr.length; i++){
        if(!arr[i].score){
            arr[i].score = 0;
        }
                        
        if(arr[i].entities.hashtags.length > 0){
            arr[i].score++;
        }
        
        if(arr[i].favorite_count > 0){
            arr[i].score++;
        }
        
        if(arr[i].retweet_count > 0){
            arr[i].score++;
        }
    }
    return arr;
}

function generateClues(arr, length){
    var newClues = [];
    if(!length){
        length = 10;
    }
    
    for(var i=0; i<length; i++){
        var theClue = {};
        theClue.id = arr[i].id;
        theClue.created_at = arr[i].created_at;
        theClue.screen_name = arr[i].user.screen_name;
        theClue.name = arr[i].user.name;
        theClue.profile_background_image_url = arr[i].user.profile_background_image_url;
        theClue.text = arr[i].text;
        newClues[i] = theClue;
    }
    return newClues;
}

twit.get('/statuses/user_timeline.json', {count: 100, screen_name:"kpeatt"}, function(data) {
    var scored = buildScore(data);
    
    var filtered = filterGTEquals(scored, { score : 1 });
    
    var sorted = filtered.sort(function(a, b){
        if(a.score > b.score){
            return -1;
        }
        if(a.score < b.score){
            return 1;
        }
        return 0
    });
    console.log(generateClues(sorted));
    //console.log(sorted);
});

/*
twit.verifyCredentials(function(data) {
        console.log(util.inspect(data));
    })
*/

// build up a score for tweets based upon 
// existing entities.hashtags.length, favorite_count, retweet_count

