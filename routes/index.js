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

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.user){
		res.render('login')
	} else {

		req.getConnection(function(err, connection) {
			var post = {
				username: req.user.id,
				displayname: req.user.displayName,
				image: req.user.photos[0]
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

			//get data from tracks
			connection.query('SELECT * FROM track', function(err, results) {
				playlist = results;
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
	// 		setInterval(function(){
	// 			spotifyApi.getPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID)
	// 				.then(function(data) {
	// 					req.app.checkData(data)
	// 				})
	// 		}, 3000),
	// 		function(err) {
	// 		    console.log('Something went wrong when loading the data!', err);
	// 		  }
	//   }, function(err) {
	//         console.log('Something went wrong when retrieving an access token', err);
	//   });
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

				// spotifyApi.addTracksToPlaylist(process.env.USERNAME, process.env.PLAYLIST_ID, ["spotify:track:" + songID],
				// 	// {
				// 	// 	position : 100
				// 	// }
				// ).then(function(data) {
				// 		req.app.newSongData(data)
				// 		res.render('index', {
				// 			user: req.user,
				// 			dataSongs: data.body.tracks
				// 		});
				// 		console.log('Added tracks to playlist!');
				// 	}, function(err) {
				// 		console.log('Something went wrong.....', err);
				// 	});
			}
		}
});

// Retrieve an access token.
module.exports = router;
