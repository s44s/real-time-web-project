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
