(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var socket = io();
var button = document.querySelectorAll('.add');
var form = document.querySelector('form.add');
console.log(form)

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
// for (var i = 0; i < button.length; i++) {
	form.addEventListener('submit', function(e){

		var trackKey = e.target.parentElement.childNodes[5].innerHTML;
		var artistKey = e.target.parentElement.childNodes[7].innerHTML;

		socket.emit('add song', {
			track: trackKey,
			artist: artistKey
		})
	});
// }


socket.on('song', function(song){
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

},{}],2:[function(require,module,exports){
console.log('test');

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvc29ja2V0LmpzIiwicHVibGljL2pzL3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIHNvY2tldCA9IGlvKCk7XG52YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkZCcpO1xudmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmFkZCcpO1xuY29uc29sZS5sb2coZm9ybSlcblxuLyogcGxheWxpc3Qgc3V1cyAqL1xuc2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRzb2NrZXQuZW1pdCgnZ2V0VHJhY2tzRnJvbVBsYXlsaXN0Jyk7XG59LCAxMDAwKTtcblxuc29ja2V0Lm9uKCduZXdUcmFja3NGcm9tUGxheWxpc3QnLCBmdW5jdGlvbihkYXRhU29uZ3Mpe1xuXHR2YXIgZGl2UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQnKTtcblx0dmFyIHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IHVsJyk7XG5cdHVsLnJlbW92ZSgpXG5cdHZhciB1bE5ldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdGRpdlJpZ2h0LmFwcGVuZENoaWxkKHVsTmV3KTtcblxuXHRmb3IodmFyIGk9MDsgaSA8IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0cmFja05hbWUgPSBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXNbaV0udHJhY2submFtZTtcblx0XHR2YXIgdHJhY2tBcnRpc3ROYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLmFydGlzdHNbMF0ubmFtZTtcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdHZhciB0ZXh0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRyYWNrTmFtZSArICcgLSAnICsgdHJhY2tBcnRpc3ROYW1lKTtcblx0XHRsaS5hcHBlbmRDaGlsZCh0ZXh0bm9kZSk7XG5cdFx0dWxOZXcuYXBwZW5kQ2hpbGQobGkpO1xuXHR9XG59KTtcblxuLyogc2VhcmNoIHNvbmcgKi9cbi8vIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9uLmxlbmd0aDsgaSsrKSB7XG5cdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSl7XG5cblx0XHR2YXIgdHJhY2tLZXkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbNV0uaW5uZXJIVE1MO1xuXHRcdHZhciBhcnRpc3RLZXkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbN10uaW5uZXJIVE1MO1xuXG5cdFx0c29ja2V0LmVtaXQoJ2FkZCBzb25nJywge1xuXHRcdFx0dHJhY2s6IHRyYWNrS2V5LFxuXHRcdFx0YXJ0aXN0OiBhcnRpc3RLZXlcblx0XHR9KVxuXHR9KTtcbi8vIH1cblxuXG5zb2NrZXQub24oJ3NvbmcnLCBmdW5jdGlvbihzb25nKXtcblx0dmFyIGRpdlJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0Jyk7XG5cdHZhciB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCB1bCcpO1xuXHR1bC5yZW1vdmUoKVxuXHR2YXIgdWxOZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXHRkaXZSaWdodC5hcHBlbmRDaGlsZCh1bE5ldyk7XG5cblx0Zm9yKHZhciBpPTA7IGkgPCBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdHJhY2tOYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLm5hbWU7XG5cdFx0dmFyIHRyYWNrQXJ0aXN0TmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5hcnRpc3RzWzBdLm5hbWU7XG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja05hbWUgKyAnIC0gJyArIHRyYWNrQXJ0aXN0TmFtZSk7XG5cdFx0bGkuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuXHRcdHVsTmV3LmFwcGVuZENoaWxkKGxpKTtcblx0fVxufSk7XG4iLCJjb25zb2xlLmxvZygndGVzdCcpO1xuIl19
