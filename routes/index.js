var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

// credentials for spotify
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : process.env.REDIRECT
});

/* search data */
var accessTokenSuus;
var dataSongs;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		user: req.user,
		dataSongs: dataSongs
	});

	// //playlist
	spotifyApi.clientCredentialsGrant()
	  .then(function(data) {
	    // Save the access token so that it's used in future calls
			accessTokenSuus = data.body['access_token'];
			console.log('The access token isss ' + data.body['access_token']);

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

router.post('/', function(req, res){
		var songSearch = req.body.song;
		var songID = req.body.value;

		if(!req.user){
			console.log('geen user')
		} else {
			// var code = req.query.valid;
			var accessToken = req.app.get('accessToken');
			var code = req.app.get('code');

			if(!songID) {
				spotifyApi.setAccessToken(accessToken);

				// Search tracks whose name, album or artist contains the word the user typed in
				spotifyApi.searchTracks(songSearch)
					.then(function(data) {
						res.render('index', {
							user: req.user,
							dataSongs: data.body.tracks
						});
					}, function(err) {
						console.log('Something went wrong!', err);
					});
			} else {
						spotifyApi.addTracksToPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID, ["spotify:track:" + songID],
							// {
							// 	position : 100
							// }
						).then(function(data) {
								req.app.newSongData(data)
								res.render('index', {
									user: req.user,
									dataSongs: data.body.tracks
								});
								console.log('Added tracks to playlist!');
							}, function(err) {
								console.log('Something went wrong.....', err);
							});
				  }
			}
});

// Retrieve an access token.
module.exports = router;
