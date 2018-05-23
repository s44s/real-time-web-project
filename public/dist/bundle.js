(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

		console.log(window.user);
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
	console.log(ul);

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

	if(currentTrack.body.is_playing == true) {
		div.remove()
		var divOverall = document.createElement('div');
		divOverall.classList.add('overall');
		main.appendChild(divOverall);

		var divFlex = document.createElement('div');
		divOverall.appendChild(divFlex);

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


	playlist.forEach(function(el){
		if(el.trackid == currentTrack.body.item.id && el.user_username == window.user.id) {
			var p = document.createElement('p');
			var textnode = document.createTextNode('Suus luister nu jouw nummer "' + el.track + '"');
			p.appendChild(textnode);
			divOverall.appendChild(p);
		} else {
			var p = document.querySelector('.overall p');
			// if(!p) {
			//
			// } else {
			// 	console.log('remove');
			// 	p.remove();
			// }
		}
	})
	// if(playlist.includes(currentTrack.body.item.id)) {
	// 	console.log('yes');
	// } else {
	// 	console.log('no');
	// }

})

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
console.log('test');

},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvc29ja2V0LW5ldy5qcyIsInB1YmxpYy9qcy9zb2NrZXQuanMiLCJwdWJsaWMvanMvdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIHNvY2tldCA9IGlvKCk7XG52YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkZCcpO1xudmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmFkZCcpO1xuXG4vKiBzZWFyY2ggc29uZyAqL1xuZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b24ubGVuZ3RoOyBpKyspIHtcblx0YnV0dG9uW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHVybCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1sxXS5zcmM7XG5cdFx0dmFyIHRyYWNrS2V5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzNdLmlubmVySFRNTDtcblx0XHR2YXIgdHJhY2tJRCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s3XS5pbm5lckhUTUw7XG5cdFx0dmFyIGFydGlzdEtleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s1XS5pbm5lckhUTUw7XG5cdFx0dmFyIGFydGlzdElEID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzldLmlubmVySFRNTDtcblxuXHRcdGNvbnNvbGUubG9nKHdpbmRvdy51c2VyKTtcblx0XHRzb2NrZXQuZW1pdCgnYWRkIHNvbmcnLCB7XG5cdFx0XHRpbWFnZTogdXJsLFxuXHRcdFx0dHJhY2s6IHRyYWNrS2V5LFxuXHRcdFx0dHJhY2tpZDogdHJhY2tJRCxcblx0XHRcdGFydGlzdDogYXJ0aXN0S2V5LFxuXHRcdFx0YXJ0aXN0aWQ6IGFydGlzdElELFxuXHRcdFx0dXNlcjogd2luZG93LnVzZXIuaWRcblx0XHR9KVxuXHR9KTtcbn1cblxuc29ja2V0Lm9uKCduZXdUcmFja3NGcm9tUGxheWxpc3QnLCBmdW5jdGlvbihyZXN1bHRzKXtcblx0dmFyIGRpdlJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5wbGF5bGlzdCcpO1xuXHR2YXIgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQgb2wnKTtcblx0Y29uc29sZS5sb2codWwpO1xuXG5cdHVsLnJlbW92ZSgpXG5cdHZhciB1bE5ldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG5cdGRpdlJpZ2h0LmFwcGVuZENoaWxkKHVsTmV3KTtcblxuXHRmb3IodmFyIGk9MDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdC8vIGxpLmNsYXNzTGlzdC5hZGQoJ3RyYWNrJyk7XG5cdFx0dWxOZXcuYXBwZW5kQ2hpbGQobGkpO1xuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdGltZy5zcmMgPSByZXN1bHRzW2ldLmltYWdlO1xuXHRcdGxpLmFwcGVuZENoaWxkKGltZyk7XG5cblx0XHR2YXIgdHJhY2tOYW1lID0gcmVzdWx0c1tpXS50cmFja1xuXHRcdHZhciB0cmFja0FydGlzdE5hbWUgPSByZXN1bHRzW2ldLmFydGlzdFxuXHRcdHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdHZhciB0ZXh0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRyYWNrTmFtZSk7XG5cdFx0cC5hcHBlbmRDaGlsZCh0ZXh0bm9kZSk7XG5cdFx0bGkuYXBwZW5kQ2hpbGQocCk7XG5cblx0XHR2YXIgcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0dmFyIHRleHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHJhY2tBcnRpc3ROYW1lKTtcblx0XHRwMi5hcHBlbmRDaGlsZCh0ZXh0bm9kZSk7XG5cdFx0bGkuYXBwZW5kQ2hpbGQocDIpO1xuXHR9XG59KTtcblxuc29ja2V0Lm9uKCdjdXJyZW50UGxheWluZycsIGZ1bmN0aW9uKGN1cnJlbnRUcmFjayl7XG5cdHZhciBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QnKTtcblx0dmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gLm92ZXJhbGwnKTtcblx0dmFyIHBsYXlsaXN0ID0gd2luZG93LnBsYXlsaXN0O1xuXG5cdGlmKGN1cnJlbnRUcmFjay5ib2R5LmlzX3BsYXlpbmcgPT0gdHJ1ZSkge1xuXHRcdGRpdi5yZW1vdmUoKVxuXHRcdHZhciBkaXZPdmVyYWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2T3ZlcmFsbC5jbGFzc0xpc3QuYWRkKCdvdmVyYWxsJyk7XG5cdFx0bWFpbi5hcHBlbmRDaGlsZChkaXZPdmVyYWxsKTtcblxuXHRcdHZhciBkaXZGbGV4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2T3ZlcmFsbC5hcHBlbmRDaGlsZChkaXZGbGV4KTtcblxuXHRcdHZhciBkaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2MS5jbGFzc0xpc3QuYWRkKCdvbmUnKTtcblx0XHRkaXZGbGV4LmFwcGVuZENoaWxkKGRpdjEpO1xuXG5cdFx0dmFyIGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYyLmNsYXNzTGlzdC5hZGQoJ3R3bycpO1xuXHRcdGRpdkZsZXguYXBwZW5kQ2hpbGQoZGl2Mik7XG5cblx0XHR2YXIgZGl2MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdjMuY2xhc3NMaXN0LmFkZCgndGhyZWUnKTtcblx0XHRkaXZGbGV4LmFwcGVuZENoaWxkKGRpdjMpO1xuXG5cdH0gZWxzZSB7XG5cdFx0ZGl2LnJlbW92ZSgpXG5cdFx0dmFyIGRpdk92ZXJhbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXZPdmVyYWxsLmNsYXNzTGlzdC5hZGQoJ292ZXJhbGwnKTtcblx0XHRtYWluLmFwcGVuZENoaWxkKGRpdk92ZXJhbGwpO1xuXHR9XG5cblxuXHRwbGF5bGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGVsKXtcblx0XHRpZihlbC50cmFja2lkID09IGN1cnJlbnRUcmFjay5ib2R5Lml0ZW0uaWQgJiYgZWwudXNlcl91c2VybmFtZSA9PSB3aW5kb3cudXNlci5pZCkge1xuXHRcdFx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU3V1cyBsdWlzdGVyIG51IGpvdXcgbnVtbWVyIFwiJyArIGVsLnRyYWNrICsgJ1wiJyk7XG5cdFx0XHRwLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRcdGRpdk92ZXJhbGwuYXBwZW5kQ2hpbGQocCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJhbGwgcCcpO1xuXHRcdFx0Ly8gaWYoIXApIHtcblx0XHRcdC8vXG5cdFx0XHQvLyB9IGVsc2Uge1xuXHRcdFx0Ly8gXHRjb25zb2xlLmxvZygncmVtb3ZlJyk7XG5cdFx0XHQvLyBcdHAucmVtb3ZlKCk7XG5cdFx0XHQvLyB9XG5cdFx0fVxuXHR9KVxuXHQvLyBpZihwbGF5bGlzdC5pbmNsdWRlcyhjdXJyZW50VHJhY2suYm9keS5pdGVtLmlkKSkge1xuXHQvLyBcdGNvbnNvbGUubG9nKCd5ZXMnKTtcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHRjb25zb2xlLmxvZygnbm8nKTtcblx0Ly8gfVxuXG59KVxuIiwiLy8gdmFyIHNvY2tldCA9IGlvKCk7XG4vLyB2YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkZCcpO1xuLy8gdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmFkZCcpO1xuLy8gY29uc29sZS5sb2coZm9ybSlcbi8vXG4vLyAvKiBwbGF5bGlzdCBzdXVzICovXG4vLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4vLyBcdHNvY2tldC5lbWl0KCdnZXRUcmFja3NGcm9tUGxheWxpc3QnKTtcbi8vIH0sIDEwMDApO1xuLy9cbi8vIHNvY2tldC5vbignbmV3VHJhY2tzRnJvbVBsYXlsaXN0JywgZnVuY3Rpb24oZGF0YVNvbmdzKXtcbi8vIFx0dmFyIGRpdlJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0Jyk7XG4vLyBcdHZhciB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCB1bCcpO1xuLy8gXHR1bC5yZW1vdmUoKVxuLy8gXHR2YXIgdWxOZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuLy8gXHRkaXZSaWdodC5hcHBlbmRDaGlsZCh1bE5ldyk7XG4vL1xuLy8gXHRmb3IodmFyIGk9MDsgaSA8IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuLy8gXHRcdHZhciB0cmFja05hbWUgPSBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXNbaV0udHJhY2submFtZTtcbi8vIFx0XHR2YXIgdHJhY2tBcnRpc3ROYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLmFydGlzdHNbMF0ubmFtZTtcbi8vIFx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuLy8gXHRcdHZhciB0ZXh0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRyYWNrTmFtZSArICcgLSAnICsgdHJhY2tBcnRpc3ROYW1lKTtcbi8vIFx0XHRsaS5hcHBlbmRDaGlsZCh0ZXh0bm9kZSk7XG4vLyBcdFx0dWxOZXcuYXBwZW5kQ2hpbGQobGkpO1xuLy8gXHR9XG4vLyB9KTtcbi8vXG4vLyAvKiBzZWFyY2ggc29uZyAqL1xuLy8gLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b24ubGVuZ3RoOyBpKyspIHtcbi8vIFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbi8vXG4vLyBcdFx0dmFyIHRyYWNrS2V5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzVdLmlubmVySFRNTDtcbi8vIFx0XHR2YXIgYXJ0aXN0S2V5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzddLmlubmVySFRNTDtcbi8vXG4vLyBcdFx0c29ja2V0LmVtaXQoJ2FkZCBzb25nJywge1xuLy8gXHRcdFx0dHJhY2s6IHRyYWNrS2V5LFxuLy8gXHRcdFx0YXJ0aXN0OiBhcnRpc3RLZXlcbi8vIFx0XHR9KVxuLy8gXHR9KTtcbi8vIC8vIH1cbi8vXG4vL1xuLy8gc29ja2V0Lm9uKCdzb25nJywgZnVuY3Rpb24oc29uZyl7XG4vLyBcdHZhciBkaXZSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCcpO1xuLy8gXHR2YXIgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQgdWwnKTtcbi8vIFx0dWwucmVtb3ZlKClcbi8vIFx0dmFyIHVsTmV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbi8vIFx0ZGl2UmlnaHQuYXBwZW5kQ2hpbGQodWxOZXcpO1xuLy9cbi8vIFx0Zm9yKHZhciBpPTA7IGkgPCBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXMubGVuZ3RoOyBpKyspIHtcbi8vIFx0XHR2YXIgdHJhY2tOYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLm5hbWU7XG4vLyBcdFx0dmFyIHRyYWNrQXJ0aXN0TmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5hcnRpc3RzWzBdLm5hbWU7XG4vLyBcdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbi8vIFx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja05hbWUgKyAnIC0gJyArIHRyYWNrQXJ0aXN0TmFtZSk7XG4vLyBcdFx0bGkuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuLy8gXHRcdHVsTmV3LmFwcGVuZENoaWxkKGxpKTtcbi8vIFx0fVxuLy8gfSk7XG4iLCJjb25zb2xlLmxvZygndGVzdCcpO1xuIl19
