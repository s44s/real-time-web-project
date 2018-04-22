(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var socket = io();
var form = document.querySelector('form')

/* playlist suus */
setTimeout(function(){
	socket.emit('getTracksFromPlaylist');
}, 1000);

socket.on('newTracksFromPlaylist', function(dataSongs){
	var divRight = document.querySelector('.right');
	var ul = document.querySelector('.right ul');
	ul.remove()
	var ulNew = document.createElement('ul');
	divRight.appendChild(ulNew);

	for(var i=0; i < dataSongs.body.tracks.items.length; i++) {
		var trackName = dataSongs.body.tracks.items[i].track.name;
		var trackArtistName = dataSongs.body.tracks.items[i].track.artists[0].name;
		var li = document.createElement('li');
		var textnode = document.createTextNode(trackName + ' - ' + trackArtistName);
		li.appendChild(textnode);
		ulNew.appendChild(li);
	}
});

/* search song */
form.addEventListener('submit', function(e){
	var song = document.querySelector('#song');

	e.preventDefault();
	socket.emit('search song', {
		value: song.value
	})

	song.value = '';
});

socket.on('song', function(song){
	console.log(song.value)
	// var messages = document.getElementById('messages');
	// var li = document.createElement('li');
	// var textnode = document.createTextNode(song.username + ': ' + song.message);         // Create a text node
	// li.appendChild(textnode);
	// messages.appendChild(li);
});

},{}],2:[function(require,module,exports){
console.log('test');

},{}]},{},[1,2]);
