// modules laden (express als framework)
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('dotenv').config()

// view engine setup > templates weergeven
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

//de routes defineren (zelfde structuur als mappen)
var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');

// connect routers to routes, weblinkjes
app.use('/', indexRouter);
app.use('/', detailRouter);

app.checkData = function(songData){}

io.on('connection', function(socket){
	// console.log('a user connected');
	socket.on('disconnect', function(){
		// console.log('user disconnected');
	});

	socket.on('getTracksFromPlaylist', function(songData){
		app.checkData = function(songData){
			io.emit('newTracksFromPlaylist', songData);
		}
	});
});

//run
http.listen(8000, function(){
  console.log('App listening on port 8000!');
});
