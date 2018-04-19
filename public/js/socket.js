var socket = io();

setTimeout(function(){
	socket.emit('getTracksFromPlaylist');
}, 1000);

socket.on('newTracksFromPlaylist', function(dataSongs){
	console.log(dataSongs.body)
	var main = document.querySelector('main');
	var ul = document.querySelector('main ul');
	ul.remove()
	var ulNew = document.createElement('ul');
	main.appendChild(ulNew);

	//playlistData.name

	for(var i=0; i < dataSongs.body.tracks.items.length; i++) {
		var trackName = dataSongs.body.tracks.items[i].track.name;
		var trackArtistName = dataSongs.body.tracks.items[i].track.artists[0].name;
		var li = document.createElement('li');
		var textnode = document.createTextNode(trackName + ' - ' + trackArtistName);
		li.appendChild(textnode);
		ulNew.appendChild(li);
	}
});
