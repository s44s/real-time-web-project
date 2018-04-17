var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '4a05723db556401aab52bef3801c7886',
  clientSecret : '7e1ebd4fceb14a81b5bcb05461d8e2a8',
  redirectUri : 'http://localhost:3000'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	spotifyApi.clientCredentialsGrant()
	  .then(function(data) {
	    // Save the access token so that it's used in future calls
	    spotifyApi.setAccessToken(data.body['access_token']);

			spotifyApi.getPlaylist('suustenvoorde', '3PeLwm2ufAVHfHe4K4wroK?si=jY3PbUD1TgS0UnzhhmvMCQ')
			  .then(function(data) {
					res.render('index', {
						playlistData: data.body
					});

			  }, function(err) {
			    console.log('Something went wrong when loading the data!', err);
			  });
	  }, function(err) {
	        console.log('Something went wrong when retrieving an access token', err);
	  });
});

// Retrieve an access token.

module.exports = router;
