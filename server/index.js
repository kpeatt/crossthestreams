var util = require('util'),
    twitter = require('twitter'),
    secret = require('./secret');

var twit = new twitter({
    consumer_key: secret.consumer_key,
    consumer_secret: secret.consumer_secret,
    access_token_key: secret.access_token_key,
    access_token_secret: secret.access_token_secret
});

twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
    console.log(util.inspect(data));
});
