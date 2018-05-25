(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var errorMessage = document.querySelector('.offline');
var socket = io();

if (navigator.onLine) {
	errorMessage.classList.remove('active');
} else {
	errorMessage.innerHTML = "The browser is not able to connect to a local area network (LAN) or a router";
	errorMessage.classList.add('active');
}

window.addEventListener("offline", function(e) {
	errorMessage.innerHTML = "The browser is not able to connect to a local area network (LAN) or a router";
	errorMessage.classList.add('active');
}, false);

window.addEventListener("online", function(e) {
	errorMessage.classList.remove('active');
}, false);

socket.on('disconnect', function() {
	console.log('disconnect..');
	errorMessage.innerHTML = "Your server is offline, or your WiFi is down";
	errorMessage.classList.add('active');
});

socket.on('connect', function() {
	console.log('connection is working');
	errorMessage.classList.remove('active');
});

},{}],2:[function(require,module,exports){
var socket = io();
var button = document.querySelectorAll('.add');
var form = document.querySelector('form.add');

/* search song */
for (var i = 0; i < button.length; i++) {
	button[i].addEventListener('click', function(e){
		var url = e.target.parentElement.childNodes[1].src;
		var trackKey = e.target.parentElement.childNodes[3].innerHTML;
		var trackID = e.target.parentElement.childNodes[7].innerHTML;
		var artistKey = e.target.parentElement.childNodes[5].innerHTML;
		var artistID = e.target.parentElement.childNodes[9].innerHTML;

		console.log(url);

		socket.emit('add song', {
			image: url,
			track: trackKey,
			trackid: trackID,
			artist: artistKey,
			artistid: artistID,
			user: window.user.id
		})
	});
}

socket.on('newTracksFromPlaylist', function(results){
	var divRight = document.querySelector('.right .playlist');
	var ul = document.querySelector('.right ol');

	ul.remove()
	var ulNew = document.createElement('ol');
	divRight.appendChild(ulNew);

	for(var i=0; i < results.length; i++) {
		var li = document.createElement('li');
		// li.classList.add('track');
		ulNew.appendChild(li);

		var img = document.createElement('img');
		img.src = results[i].image;
		li.appendChild(img);

		var trackName = results[i].track
		var trackArtistName = results[i].artist
		var p = document.createElement('p');
		var textnode = document.createTextNode(trackName);
		p.appendChild(textnode);
		li.appendChild(p);

		var p2 = document.createElement('p');
		var textnode = document.createTextNode(trackArtistName);
		p2.appendChild(textnode);
		li.appendChild(p2);
	}
});

socket.on('currentPlaying', function(currentTrack){
	var main = document.querySelector('.contact');
	var div = document.querySelector('main .overall');
	var playlist = window.playlist;
	var divOverall = document.createElement('div');


	playlist.forEach(function(el){
		if(el.trackid == currentTrack.body.item.id && el.user_username == window.user.id) {
			var p = document.createElement('p');
			var textnode = document.createTextNode('Suus luister nu jouw nummer "' + el.track + '"');
			p.appendChild(textnode);
			divOverall.appendChild(p);
		} else {
			var p = document.querySelector('.overall p');
		}
	})

	if(currentTrack.body.is_playing == true) {
		div.remove()
		divOverall.classList.add('overall');
		main.appendChild(divOverall);

		var divFlex = document.createElement('div');
		// divOverall.appendChild(divFlex);
		divOverall.insertBefore(divFlex, divOverall.childNodes[0]);


		var div1 = document.createElement('div');
		div1.classList.add('one');
		divFlex.appendChild(div1);

		var div2 = document.createElement('div');
		div2.classList.add('two');
		divFlex.appendChild(div2);

		var div3 = document.createElement('div');
		div3.classList.add('three');
		divFlex.appendChild(div3);

	} else {
		div.remove()
		var divOverall = document.createElement('div');
		divOverall.classList.add('overall');
		main.appendChild(divOverall);
	}
	// if(playlist.includes(currentTrack.body.item.id)) {
	// 	console.log('yes');
	// } else {
	// 	console.log('no');
	// }

})

socket.on('fail', function(fail){
	console.log(fail);
	errorMessage.classList.add('active');
});

},{}],3:[function(require,module,exports){
// var socket = io();
// var button = document.querySelectorAll('.add');
// var form = document.querySelector('form.add');
// console.log(form)
//
// /* playlist suus */
// setTimeout(function(){
// 	socket.emit('getTracksFromPlaylist');
// }, 1000);
//
// socket.on('newTracksFromPlaylist', function(dataSongs){
// 	var divRight = document.querySelector('.right');
// 	var ul = document.querySelector('.right ul');
// 	ul.remove()
// 	var ulNew = document.createElement('ul');
// 	divRight.appendChild(ulNew);
//
// 	for(var i=0; i < dataSongs.body.tracks.items.length; i++) {
// 		var trackName = dataSongs.body.tracks.items[i].track.name;
// 		var trackArtistName = dataSongs.body.tracks.items[i].track.artists[0].name;
// 		var li = document.createElement('li');
// 		var textnode = document.createTextNode(trackName + ' - ' + trackArtistName);
// 		li.appendChild(textnode);
// 		ulNew.appendChild(li);
// 	}
// });
//
// /* search song */
// // for (var i = 0; i < button.length; i++) {
// 	form.addEventListener('submit', function(e){
//
// 		var trackKey = e.target.parentElement.childNodes[5].innerHTML;
// 		var artistKey = e.target.parentElement.childNodes[7].innerHTML;
//
// 		socket.emit('add song', {
// 			track: trackKey,
// 			artist: artistKey
// 		})
// 	});
// // }
//
//
// socket.on('song', function(song){
// 	var divRight = document.querySelector('.right');
// 	var ul = document.querySelector('.right ul');
// 	ul.remove()
// 	var ulNew = document.createElement('ul');
// 	divRight.appendChild(ulNew);
//
// 	for(var i=0; i < dataSongs.body.tracks.items.length; i++) {
// 		var trackName = dataSongs.body.tracks.items[i].track.name;
// 		var trackArtistName = dataSongs.body.tracks.items[i].track.artists[0].name;
// 		var li = document.createElement('li');
// 		var textnode = document.createTextNode(trackName + ' - ' + trackArtistName);
// 		li.appendChild(textnode);
// 		ulNew.appendChild(li);
// 	}
// });

},{}],4:[function(require,module,exports){
console.log('test');

},{}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvb2ZmbGluZS5qcyIsInB1YmxpYy9qcy9zb2NrZXQtbmV3LmpzIiwicHVibGljL2pzL3NvY2tldC5qcyIsInB1YmxpYy9qcy90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmZsaW5lJyk7XG52YXIgc29ja2V0ID0gaW8oKTtcblxuaWYgKG5hdmlnYXRvci5vbkxpbmUpIHtcblx0ZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xufSBlbHNlIHtcblx0ZXJyb3JNZXNzYWdlLmlubmVySFRNTCA9IFwiVGhlIGJyb3dzZXIgaXMgbm90IGFibGUgdG8gY29ubmVjdCB0byBhIGxvY2FsIGFyZWEgbmV0d29yayAoTEFOKSBvciBhIHJvdXRlclwiO1xuXHRlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCBmdW5jdGlvbihlKSB7XG5cdGVycm9yTWVzc2FnZS5pbm5lckhUTUwgPSBcIlRoZSBicm93c2VyIGlzIG5vdCBhYmxlIHRvIGNvbm5lY3QgdG8gYSBsb2NhbCBhcmVhIG5ldHdvcmsgKExBTikgb3IgYSByb3V0ZXJcIjtcblx0ZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xufSwgZmFsc2UpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9ubGluZVwiLCBmdW5jdGlvbihlKSB7XG5cdGVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbn0sIGZhbHNlKTtcblxuc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdkaXNjb25uZWN0Li4nKTtcblx0ZXJyb3JNZXNzYWdlLmlubmVySFRNTCA9IFwiWW91ciBzZXJ2ZXIgaXMgb2ZmbGluZSwgb3IgeW91ciBXaUZpIGlzIGRvd25cIjtcblx0ZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xufSk7XG5cbnNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnY29ubmVjdGlvbiBpcyB3b3JraW5nJyk7XG5cdGVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbn0pO1xuIiwidmFyIHNvY2tldCA9IGlvKCk7XG52YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkZCcpO1xudmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmFkZCcpO1xuXG4vKiBzZWFyY2ggc29uZyAqL1xuZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b24ubGVuZ3RoOyBpKyspIHtcblx0YnV0dG9uW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHVybCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1sxXS5zcmM7XG5cdFx0dmFyIHRyYWNrS2V5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzNdLmlubmVySFRNTDtcblx0XHR2YXIgdHJhY2tJRCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s3XS5pbm5lckhUTUw7XG5cdFx0dmFyIGFydGlzdEtleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s1XS5pbm5lckhUTUw7XG5cdFx0dmFyIGFydGlzdElEID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzldLmlubmVySFRNTDtcblxuXHRcdGNvbnNvbGUubG9nKHVybCk7XG5cblx0XHRzb2NrZXQuZW1pdCgnYWRkIHNvbmcnLCB7XG5cdFx0XHRpbWFnZTogdXJsLFxuXHRcdFx0dHJhY2s6IHRyYWNrS2V5LFxuXHRcdFx0dHJhY2tpZDogdHJhY2tJRCxcblx0XHRcdGFydGlzdDogYXJ0aXN0S2V5LFxuXHRcdFx0YXJ0aXN0aWQ6IGFydGlzdElELFxuXHRcdFx0dXNlcjogd2luZG93LnVzZXIuaWRcblx0XHR9KVxuXHR9KTtcbn1cblxuc29ja2V0Lm9uKCduZXdUcmFja3NGcm9tUGxheWxpc3QnLCBmdW5jdGlvbihyZXN1bHRzKXtcblx0dmFyIGRpdlJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5wbGF5bGlzdCcpO1xuXHR2YXIgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQgb2wnKTtcblxuXHR1bC5yZW1vdmUoKVxuXHR2YXIgdWxOZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xuXHRkaXZSaWdodC5hcHBlbmRDaGlsZCh1bE5ldyk7XG5cblx0Zm9yKHZhciBpPTA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHQvLyBsaS5jbGFzc0xpc3QuYWRkKCd0cmFjaycpO1xuXHRcdHVsTmV3LmFwcGVuZENoaWxkKGxpKTtcblxuXHRcdHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRpbWcuc3JjID0gcmVzdWx0c1tpXS5pbWFnZTtcblx0XHRsaS5hcHBlbmRDaGlsZChpbWcpO1xuXG5cdFx0dmFyIHRyYWNrTmFtZSA9IHJlc3VsdHNbaV0udHJhY2tcblx0XHR2YXIgdHJhY2tBcnRpc3ROYW1lID0gcmVzdWx0c1tpXS5hcnRpc3Rcblx0XHR2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja05hbWUpO1xuXHRcdHAuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuXHRcdGxpLmFwcGVuZENoaWxkKHApO1xuXG5cdFx0dmFyIHAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdHZhciB0ZXh0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRyYWNrQXJ0aXN0TmFtZSk7XG5cdFx0cDIuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuXHRcdGxpLmFwcGVuZENoaWxkKHAyKTtcblx0fVxufSk7XG5cbnNvY2tldC5vbignY3VycmVudFBsYXlpbmcnLCBmdW5jdGlvbihjdXJyZW50VHJhY2spe1xuXHR2YXIgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0Jyk7XG5cdHZhciBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluIC5vdmVyYWxsJyk7XG5cdHZhciBwbGF5bGlzdCA9IHdpbmRvdy5wbGF5bGlzdDtcblx0dmFyIGRpdk92ZXJhbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXG5cdHBsYXlsaXN0LmZvckVhY2goZnVuY3Rpb24oZWwpe1xuXHRcdGlmKGVsLnRyYWNraWQgPT0gY3VycmVudFRyYWNrLmJvZHkuaXRlbS5pZCAmJiBlbC51c2VyX3VzZXJuYW1lID09IHdpbmRvdy51c2VyLmlkKSB7XG5cdFx0XHR2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdHZhciB0ZXh0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdTdXVzIGx1aXN0ZXIgbnUgam91dyBudW1tZXIgXCInICsgZWwudHJhY2sgKyAnXCInKTtcblx0XHRcdHAuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuXHRcdFx0ZGl2T3ZlcmFsbC5hcHBlbmRDaGlsZChwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmFsbCBwJyk7XG5cdFx0fVxuXHR9KVxuXG5cdGlmKGN1cnJlbnRUcmFjay5ib2R5LmlzX3BsYXlpbmcgPT0gdHJ1ZSkge1xuXHRcdGRpdi5yZW1vdmUoKVxuXHRcdGRpdk92ZXJhbGwuY2xhc3NMaXN0LmFkZCgnb3ZlcmFsbCcpO1xuXHRcdG1haW4uYXBwZW5kQ2hpbGQoZGl2T3ZlcmFsbCk7XG5cblx0XHR2YXIgZGl2RmxleCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdC8vIGRpdk92ZXJhbGwuYXBwZW5kQ2hpbGQoZGl2RmxleCk7XG5cdFx0ZGl2T3ZlcmFsbC5pbnNlcnRCZWZvcmUoZGl2RmxleCwgZGl2T3ZlcmFsbC5jaGlsZE5vZGVzWzBdKTtcblxuXG5cdFx0dmFyIGRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYxLmNsYXNzTGlzdC5hZGQoJ29uZScpO1xuXHRcdGRpdkZsZXguYXBwZW5kQ2hpbGQoZGl2MSk7XG5cblx0XHR2YXIgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdjIuY2xhc3NMaXN0LmFkZCgndHdvJyk7XG5cdFx0ZGl2RmxleC5hcHBlbmRDaGlsZChkaXYyKTtcblxuXHRcdHZhciBkaXYzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2My5jbGFzc0xpc3QuYWRkKCd0aHJlZScpO1xuXHRcdGRpdkZsZXguYXBwZW5kQ2hpbGQoZGl2Myk7XG5cblx0fSBlbHNlIHtcblx0XHRkaXYucmVtb3ZlKClcblx0XHR2YXIgZGl2T3ZlcmFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdk92ZXJhbGwuY2xhc3NMaXN0LmFkZCgnb3ZlcmFsbCcpO1xuXHRcdG1haW4uYXBwZW5kQ2hpbGQoZGl2T3ZlcmFsbCk7XG5cdH1cblx0Ly8gaWYocGxheWxpc3QuaW5jbHVkZXMoY3VycmVudFRyYWNrLmJvZHkuaXRlbS5pZCkpIHtcblx0Ly8gXHRjb25zb2xlLmxvZygneWVzJyk7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ25vJyk7XG5cdC8vIH1cblxufSlcblxuc29ja2V0Lm9uKCdmYWlsJywgZnVuY3Rpb24oZmFpbCl7XG5cdGNvbnNvbGUubG9nKGZhaWwpO1xuXHRlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG59KTtcbiIsIi8vIHZhciBzb2NrZXQgPSBpbygpO1xuLy8gdmFyIGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQnKTtcbi8vIHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5hZGQnKTtcbi8vIGNvbnNvbGUubG9nKGZvcm0pXG4vL1xuLy8gLyogcGxheWxpc3Qgc3V1cyAqL1xuLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gXHRzb2NrZXQuZW1pdCgnZ2V0VHJhY2tzRnJvbVBsYXlsaXN0Jyk7XG4vLyB9LCAxMDAwKTtcbi8vXG4vLyBzb2NrZXQub24oJ25ld1RyYWNrc0Zyb21QbGF5bGlzdCcsIGZ1bmN0aW9uKGRhdGFTb25ncyl7XG4vLyBcdHZhciBkaXZSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCcpO1xuLy8gXHR2YXIgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQgdWwnKTtcbi8vIFx0dWwucmVtb3ZlKClcbi8vIFx0dmFyIHVsTmV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbi8vIFx0ZGl2UmlnaHQuYXBwZW5kQ2hpbGQodWxOZXcpO1xuLy9cbi8vIFx0Zm9yKHZhciBpPTA7IGkgPCBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXMubGVuZ3RoOyBpKyspIHtcbi8vIFx0XHR2YXIgdHJhY2tOYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLm5hbWU7XG4vLyBcdFx0dmFyIHRyYWNrQXJ0aXN0TmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5hcnRpc3RzWzBdLm5hbWU7XG4vLyBcdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbi8vIFx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja05hbWUgKyAnIC0gJyArIHRyYWNrQXJ0aXN0TmFtZSk7XG4vLyBcdFx0bGkuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuLy8gXHRcdHVsTmV3LmFwcGVuZENoaWxkKGxpKTtcbi8vIFx0fVxuLy8gfSk7XG4vL1xuLy8gLyogc2VhcmNoIHNvbmcgKi9cbi8vIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9uLmxlbmd0aDsgaSsrKSB7XG4vLyBcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4vL1xuLy8gXHRcdHZhciB0cmFja0tleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s1XS5pbm5lckhUTUw7XG4vLyBcdFx0dmFyIGFydGlzdEtleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s3XS5pbm5lckhUTUw7XG4vL1xuLy8gXHRcdHNvY2tldC5lbWl0KCdhZGQgc29uZycsIHtcbi8vIFx0XHRcdHRyYWNrOiB0cmFja0tleSxcbi8vIFx0XHRcdGFydGlzdDogYXJ0aXN0S2V5XG4vLyBcdFx0fSlcbi8vIFx0fSk7XG4vLyAvLyB9XG4vL1xuLy9cbi8vIHNvY2tldC5vbignc29uZycsIGZ1bmN0aW9uKHNvbmcpe1xuLy8gXHR2YXIgZGl2UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQnKTtcbi8vIFx0dmFyIHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IHVsJyk7XG4vLyBcdHVsLnJlbW92ZSgpXG4vLyBcdHZhciB1bE5ldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4vLyBcdGRpdlJpZ2h0LmFwcGVuZENoaWxkKHVsTmV3KTtcbi8vXG4vLyBcdGZvcih2YXIgaT0wOyBpIDwgZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0dmFyIHRyYWNrTmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5uYW1lO1xuLy8gXHRcdHZhciB0cmFja0FydGlzdE5hbWUgPSBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXNbaV0udHJhY2suYXJ0aXN0c1swXS5uYW1lO1xuLy8gXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4vLyBcdFx0dmFyIHRleHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHJhY2tOYW1lICsgJyAtICcgKyB0cmFja0FydGlzdE5hbWUpO1xuLy8gXHRcdGxpLmFwcGVuZENoaWxkKHRleHRub2RlKTtcbi8vIFx0XHR1bE5ldy5hcHBlbmRDaGlsZChsaSk7XG4vLyBcdH1cbi8vIH0pO1xuIiwiY29uc29sZS5sb2coJ3Rlc3QnKTtcbiJdfQ==
