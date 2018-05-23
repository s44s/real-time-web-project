// modules laden (express als framework)
var express = require('express');
var app = express();

//spotify session passport
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var fetch = require('node-fetch');

//socket
var http = require('http').Server(app);
var io = require('socket.io')(http);

//database
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var connection = {
  host: "167.99.32.214",
  user: "root",
  password: "lotje129a",
	port: "3306",
	database: "portfolio"
};

var con = mysql.createConnection(connection);
app.use(myConnection(mysql, connection, 'single'));

//.env file
require('dotenv').config()

//passport spotify
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// view engine setup > templates weergeven
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : process.env.REDIRECT
});

passport.use(new SpotifyStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.REDIRECT
  }, function(accessToken, refreshToken, expires_in, profile, done) {
		app.set('accessToken', accessToken);

    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));


	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: false
	}));
	app.use(methodOverride());
	app.use(session({
		resave: true,
    secret: 'secret',
    saveUninitialized: true
	}));
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());

	//de routes defineren (zelfde structuur als mappen)
	var indexRouter = require('./routes/index');
	var loginRouter = require('./routes/login');

	// connect routers to routes, weblinkjes
	app.use('/', indexRouter);
	app.use('/login', loginRouter);

	// GET /auth/spotify
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request. The first step in spotify authentication will involve redirecting
	//   the user to spotify.com. After authorization, spotify will redirect the user
	//   back to this application at /auth/spotify/callback
	app.get('/auth/spotify',
	  passport.authenticate('spotify', {
			scope: [
				'playlist-read-collaborative',
				'playlist-read-private',
				'playlist-modify-public',
				'playlist-modify-private',
				'user-modify-playback-state',
				'user-read-currently-playing',
				'user-read-playback-state'
			], showDialog: true}),
	  function(req, res){
	// The request will be redirected to spotify for authentication, so this
	// function will not be called.
	});

	// GET /auth/spotify/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request. If authentication fails, the user will be redirected back to the
	//   login page. Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/callback',
	  passport.authenticate('spotify', { failureRedirect: '/login' }),
	  function(req, res) {
			var code = req.query.code;
			app.set('code', code);
			res.redirect('/');
	  });

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/login');
	});

// Playlist real-time
app.currentPlaying = function(currentPlaying){}

// app.getUser = function(user){
	io.on('connection', function(socket){
		socket.on('add song', function(song){

			spotify();

			var post = {
				track: song.track,
				trackid: song.trackid,
				artist: song.artist,
				artistid: song.artistid,
				image: song.image,
				user_username: song.user
			};

			con.query('INSERT INTO track SET ?', post, function (error, results, fields) {
				if (error) throw error;
			});

			con.query('SELECT * FROM track', function(err, results) {
				io.emit('newTracksFromPlaylist', results);
			})

		});

		app.currentPlaying = function(currentPlaying){
			io.emit('currentPlaying', currentPlaying)
		}

	});

// }

// Run
http.listen(8000, function(){
  console.log('App listening on port 8000!');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
		return next();
	}
  res.redirect('/login');
}
