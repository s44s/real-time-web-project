var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// credentials for spotify
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : 'http://localhost:3000'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		// playlistData: data.body
	});

	//search
	// var scopes = ['user-read-private', 'user-read-email'],
	//     redirectUri = 'https://example.com/callback',
	//     clientId = '5fe01282e44241328a84e7c5cc169165',
	//     state = 'some-state-of-my-choice';

	// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
	// var spotifyApi = new SpotifyWebApi({
	//   redirectUri : redirectUri,
	//   clientId : clientId
	// });
	//
	// // Create the authorization URL
	// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
	//
	// // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
	// console.log(authorizeURL);
	//
	// //playlist
	spotifyApi.clientCredentialsGrant()
	  .then(function(data) {
	    // Save the access token so that it's used in future calls
	    spotifyApi.setAccessToken(data.body['access_token']);

			setInterval(function(){
				spotifyApi.getPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID)
					.then(function(data) {
						req.app.checkData(data)
					})
			}, 3000),
			function(err) {
			    console.log('Something went wrong when loading the data!', err);
			  }
	  }, function(err) {
	        console.log('Something went wrong when retrieving an access token', err);
	  });
});

// Retrieve an access token.
module.exports = router;
