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
var playlist;
var currentPlaying;

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.user){
		res.render('login')
	} else {

		console.log(req.user.emails[0].value);

		req.getConnection(function(err, connection) {
			var post = {
				username: req.user.id,
				displayname: req.user.displayName,
				image: req.user.photos[0],
				email: req.user.emails[0].value
			};

			//select user
			var userResults;

			connection.query('SELECT * FROM user', function(err, results) {
				// req.app.getUser(post.username)
				userResults = results;

				var array = [];
				userResults.forEach(function(el){
					array.push(el.username);
				});

				for (var i = 0; i < array.length; i++) {
					if(array.includes(post.username)) {
						console.log('name already exists')
					} else {
						var query = connection.query('INSERT INTO user SET ?', post, function (error, results, fields) {
							if (error) throw error;
						});
					}
				}

			});

			if(req.user.id == 'suustenvoorde'){
				var accessToken = req.app.get('accessToken');
				spotifyApi.setAccessToken(accessToken);

				// Get tracks in a playlist
				setInterval(function(){
					spotifyApi.getMyCurrentPlaybackState(process.env.USERNAME)
						.then(function(data) {
							// Output items
							// console.log(data.body.);
							currentPlaying = data;
							req.app.currentPlaying(currentPlaying)
						})
				}, 1000),
				function(err) {
						console.log('Ah oh Something went wrong when loading the data!', err);
					}
				}


			//get data from tracks
			connection.query('SELECT * FROM track', function(err, results) {
				playlist = results;

				// for (var i = 0; i < results.length; i++) {
				// 	// Remove tracks from a playlist at a specific position
				// 	spotifyApi.removeTracksFromPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID, [{ uri : "spotify:track:" + results[i].trackid }])
				// 	  .then(function(data) {
				// 	    // console.log('Tracks removed from playlist!');
				// 	  }, function(err) {
				// 	    console.log('Something went wrong!', err);
				// 	  });
				// 	spotifyApi.addTracksToPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID, ["spotify:track:" + results[i].trackid],
				// 		// {
				// 		// 	position : 100
				// 		// }
				// 	).then(function(data) {
				// 			// console.log('Added tracks to playlist!');
				// 		}, function(err) {
				// 			console.log('Something went wrong.....', err);
				// 		});
				// 	}

					res.render('index', {
						user: req.user,
						dataSongs: dataSongs,
						playlist: playlist
				});
			});
		});
	}

	//playlist
	// spotifyApi.clientCredentialsGrant()
	//   .then(function(data) {
	//     // Save the access token so that it's used in future calls
	// 		accessTokenSuus = data.body['access_token'];
	// 		// console.log('The access token isss ' + data.body['access_token']);
	//
	// 		spotifyApi.setAccessToken(data.body['access_token']);
	//
		// 	setInterval(function(){
		// 		spotifyApi.getPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID)
		// 			.then(function(data) {
		// 				req.app.checkData(data)
		// 			})
		// 	}, 3000),
		// 	function(err) {
		// 	    console.log('Something went wrong when loading the data!', err);
		// 	  }
	  // }, function(err) {
	  //       console.log('Something went wrong when retrieving an access token', err);
	  // });
});

router.post('/', function(req, res){
		var playlist;
		var songSearch = req.body.song;
		var songID = req.body.value;

		req.getConnection(function(err, connection) {
			connection.query('SELECT * FROM track', function(err, results) {
				playlist = results;
			});
		})

		if(!req.user){
			res.render('login');
		} else {
			var accessToken = req.app.get('accessToken');
			var code = req.app.get('code');

			if(!songID) {
				spotifyApi.setAccessToken(accessToken);

				// Search tracks whose name, album or artist contains the word the user typed in
				spotifyApi.searchTracks(songSearch)
					.then(function(data) {
						res.render('index', {
							user: req.user,
							dataSongs: data.body.tracks,
							playlist: playlist
						});
					}, function(err) {
						console.log('Something went wrong!', err);
					});
			} else {

				res.render('index', {
					user: req.user,
					dataSongs: dataSongs,
					playlist: playlist
				});
			}
		}
});

// Retrieve an access token.
module.exports = router;
