var TwitterBot = require("node-twitterbot").TwitterBot;

var Bot = new TwitterBot({
  "consumer_secret": "consumer_secret",
    "consumer_key": "consumer_key",
    "access_token": "access_token",
    "access_token_secret": "access_token_secret"
  });

Bot.listen(listenerName, listenerFunction, function(twitter, action, tweet) {
  // Do something with the tweet
});
