var sys = require('sys');
var OAuth = require('oauth').OAuth;
var google_request_url = "https://www.google.com/accounts/OAuthGetRequestToken";
var google_access_url = "https://www.google.com/accounts/OAuthAuthorizeToken";
var oa = new OAuth(google_request_url, google_access_url,
  "anonymous", "anonymous", "1.0A", undefined, "HMAC-SHA1");
var request_payload = {"scope": "https://spreadsheets.google.com/feeds"};

oa.getOAuthRequestToken(request_payload, function(err, oauth_token, oauth_secret, results) {
  logerr(JSON.stringify(err));
  console.log('oauth_token: [' + oauth_token + ']');
  console.log('oauth_token_secret: [' + oauth_secret + ']');
  console.log('results: ' + JSON.stringify(results));

  console.log('Go to https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=' + oauth_token);
  console.log('Please enter the verification code and press enter: ');

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(input) {
    var code = input.trim();
    console.log("Using verification code: [" + code + "]");
    oa.getOAuthAccessToken(oauth_token, oauth_secret, code, function(err, access_token, access_secret, results) {
      logerr(JSON.stringify(err));

      console.log('oauth_access_token: ' + access_token);
      console.log('oauth_access_token_secret: ' + access_secret);

      var target = 'https://spreadsheets.google.com/feeds/spreadsheets/private/full';
      oa.get(target, access_token, access_secret, function(error, data) {
        logerr(JSON.stringify(err));
        console.log(data);
      });
    });
  });
});
