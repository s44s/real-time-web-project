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
		console.log(el);
		if(el.trackid == currentTrack.body.item.id && el.user_username == window.user.id) {
			var p = document.createElement('p');
			var textnode = document.createTextNode('Suus luister nu jouw nummer "' + el.track + '"');
			p.appendChild(textnode);
			divOverall.appendChild(p);
		} else {
			console.log('no');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvc29ja2V0LW5ldy5qcyIsInB1YmxpYy9qcy9zb2NrZXQuanMiLCJwdWJsaWMvanMvdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgc29ja2V0ID0gaW8oKTtcbnZhciBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRkJyk7XG52YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0uYWRkJyk7XG5cbi8qIHNlYXJjaCBzb25nICovXG5mb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbi5sZW5ndGg7IGkrKykge1xuXHRidXR0b25baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHR2YXIgdXJsID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzFdLnNyYztcblx0XHR2YXIgdHJhY2tLZXkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbM10uaW5uZXJIVE1MO1xuXHRcdHZhciB0cmFja0lEID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzddLmlubmVySFRNTDtcblx0XHR2YXIgYXJ0aXN0S2V5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzWzVdLmlubmVySFRNTDtcblx0XHR2YXIgYXJ0aXN0SUQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbOV0uaW5uZXJIVE1MO1xuXG5cdFx0Y29uc29sZS5sb2cod2luZG93LnVzZXIpO1xuXHRcdHNvY2tldC5lbWl0KCdhZGQgc29uZycsIHtcblx0XHRcdGltYWdlOiB1cmwsXG5cdFx0XHR0cmFjazogdHJhY2tLZXksXG5cdFx0XHR0cmFja2lkOiB0cmFja0lELFxuXHRcdFx0YXJ0aXN0OiBhcnRpc3RLZXksXG5cdFx0XHRhcnRpc3RpZDogYXJ0aXN0SUQsXG5cdFx0XHR1c2VyOiB3aW5kb3cudXNlci5pZFxuXHRcdH0pXG5cdH0pO1xufVxuXG5zb2NrZXQub24oJ25ld1RyYWNrc0Zyb21QbGF5bGlzdCcsIGZ1bmN0aW9uKHJlc3VsdHMpe1xuXHR2YXIgZGl2UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLnBsYXlsaXN0Jyk7XG5cdHZhciB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCBvbCcpO1xuXHRjb25zb2xlLmxvZyh1bCk7XG5cblx0dWwucmVtb3ZlKClcblx0dmFyIHVsTmV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcblx0ZGl2UmlnaHQuYXBwZW5kQ2hpbGQodWxOZXcpO1xuXG5cdGZvcih2YXIgaT0wOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0Ly8gbGkuY2xhc3NMaXN0LmFkZCgndHJhY2snKTtcblx0XHR1bE5ldy5hcHBlbmRDaGlsZChsaSk7XG5cblx0XHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1nLnNyYyA9IHJlc3VsdHNbaV0uaW1hZ2U7XG5cdFx0bGkuYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdHZhciB0cmFja05hbWUgPSByZXN1bHRzW2ldLnRyYWNrXG5cdFx0dmFyIHRyYWNrQXJ0aXN0TmFtZSA9IHJlc3VsdHNbaV0uYXJ0aXN0XG5cdFx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0dmFyIHRleHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHJhY2tOYW1lKTtcblx0XHRwLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRsaS5hcHBlbmRDaGlsZChwKTtcblxuXHRcdHZhciBwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja0FydGlzdE5hbWUpO1xuXHRcdHAyLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRsaS5hcHBlbmRDaGlsZChwMik7XG5cdH1cbn0pO1xuXG5zb2NrZXQub24oJ2N1cnJlbnRQbGF5aW5nJywgZnVuY3Rpb24oY3VycmVudFRyYWNrKXtcblx0dmFyIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdCcpO1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbiAub3ZlcmFsbCcpO1xuXHR2YXIgcGxheWxpc3QgPSB3aW5kb3cucGxheWxpc3Q7XG5cblx0aWYoY3VycmVudFRyYWNrLmJvZHkuaXNfcGxheWluZyA9PSB0cnVlKSB7XG5cdFx0ZGl2LnJlbW92ZSgpXG5cdFx0dmFyIGRpdk92ZXJhbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXZPdmVyYWxsLmNsYXNzTGlzdC5hZGQoJ292ZXJhbGwnKTtcblx0XHRtYWluLmFwcGVuZENoaWxkKGRpdk92ZXJhbGwpO1xuXG5cdFx0dmFyIGRpdkZsZXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXZPdmVyYWxsLmFwcGVuZENoaWxkKGRpdkZsZXgpO1xuXG5cdFx0dmFyIGRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYxLmNsYXNzTGlzdC5hZGQoJ29uZScpO1xuXHRcdGRpdkZsZXguYXBwZW5kQ2hpbGQoZGl2MSk7XG5cblx0XHR2YXIgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdjIuY2xhc3NMaXN0LmFkZCgndHdvJyk7XG5cdFx0ZGl2RmxleC5hcHBlbmRDaGlsZChkaXYyKTtcblxuXHRcdHZhciBkaXYzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2My5jbGFzc0xpc3QuYWRkKCd0aHJlZScpO1xuXHRcdGRpdkZsZXguYXBwZW5kQ2hpbGQoZGl2Myk7XG5cblx0fSBlbHNlIHtcblx0XHRkaXYucmVtb3ZlKClcblx0XHR2YXIgZGl2T3ZlcmFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdk92ZXJhbGwuY2xhc3NMaXN0LmFkZCgnb3ZlcmFsbCcpO1xuXHRcdG1haW4uYXBwZW5kQ2hpbGQoZGl2T3ZlcmFsbCk7XG5cdH1cblxuXG5cdHBsYXlsaXN0LmZvckVhY2goZnVuY3Rpb24oZWwpe1xuXHRcdGNvbnNvbGUubG9nKGVsKTtcblx0XHRpZihlbC50cmFja2lkID09IGN1cnJlbnRUcmFjay5ib2R5Lml0ZW0uaWQgJiYgZWwudXNlcl91c2VybmFtZSA9PSB3aW5kb3cudXNlci5pZCkge1xuXHRcdFx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU3V1cyBsdWlzdGVyIG51IGpvdXcgbnVtbWVyIFwiJyArIGVsLnRyYWNrICsgJ1wiJyk7XG5cdFx0XHRwLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRcdGRpdk92ZXJhbGwuYXBwZW5kQ2hpbGQocCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKCdubycpO1xuXHRcdH1cblx0fSlcblx0Ly8gaWYocGxheWxpc3QuaW5jbHVkZXMoY3VycmVudFRyYWNrLmJvZHkuaXRlbS5pZCkpIHtcblx0Ly8gXHRjb25zb2xlLmxvZygneWVzJyk7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ25vJyk7XG5cdC8vIH1cblxufSlcbiIsIi8vIHZhciBzb2NrZXQgPSBpbygpO1xuLy8gdmFyIGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQnKTtcbi8vIHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5hZGQnKTtcbi8vIGNvbnNvbGUubG9nKGZvcm0pXG4vL1xuLy8gLyogcGxheWxpc3Qgc3V1cyAqL1xuLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gXHRzb2NrZXQuZW1pdCgnZ2V0VHJhY2tzRnJvbVBsYXlsaXN0Jyk7XG4vLyB9LCAxMDAwKTtcbi8vXG4vLyBzb2NrZXQub24oJ25ld1RyYWNrc0Zyb21QbGF5bGlzdCcsIGZ1bmN0aW9uKGRhdGFTb25ncyl7XG4vLyBcdHZhciBkaXZSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCcpO1xuLy8gXHR2YXIgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQgdWwnKTtcbi8vIFx0dWwucmVtb3ZlKClcbi8vIFx0dmFyIHVsTmV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbi8vIFx0ZGl2UmlnaHQuYXBwZW5kQ2hpbGQodWxOZXcpO1xuLy9cbi8vIFx0Zm9yKHZhciBpPTA7IGkgPCBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXMubGVuZ3RoOyBpKyspIHtcbi8vIFx0XHR2YXIgdHJhY2tOYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLm5hbWU7XG4vLyBcdFx0dmFyIHRyYWNrQXJ0aXN0TmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5hcnRpc3RzWzBdLm5hbWU7XG4vLyBcdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbi8vIFx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja05hbWUgKyAnIC0gJyArIHRyYWNrQXJ0aXN0TmFtZSk7XG4vLyBcdFx0bGkuYXBwZW5kQ2hpbGQodGV4dG5vZGUpO1xuLy8gXHRcdHVsTmV3LmFwcGVuZENoaWxkKGxpKTtcbi8vIFx0fVxuLy8gfSk7XG4vL1xuLy8gLyogc2VhcmNoIHNvbmcgKi9cbi8vIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9uLmxlbmd0aDsgaSsrKSB7XG4vLyBcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4vL1xuLy8gXHRcdHZhciB0cmFja0tleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s1XS5pbm5lckhUTUw7XG4vLyBcdFx0dmFyIGFydGlzdEtleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s3XS5pbm5lckhUTUw7XG4vL1xuLy8gXHRcdHNvY2tldC5lbWl0KCdhZGQgc29uZycsIHtcbi8vIFx0XHRcdHRyYWNrOiB0cmFja0tleSxcbi8vIFx0XHRcdGFydGlzdDogYXJ0aXN0S2V5XG4vLyBcdFx0fSlcbi8vIFx0fSk7XG4vLyAvLyB9XG4vL1xuLy9cbi8vIHNvY2tldC5vbignc29uZycsIGZ1bmN0aW9uKHNvbmcpe1xuLy8gXHR2YXIgZGl2UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQnKTtcbi8vIFx0dmFyIHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IHVsJyk7XG4vLyBcdHVsLnJlbW92ZSgpXG4vLyBcdHZhciB1bE5ldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4vLyBcdGRpdlJpZ2h0LmFwcGVuZENoaWxkKHVsTmV3KTtcbi8vXG4vLyBcdGZvcih2YXIgaT0wOyBpIDwgZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0dmFyIHRyYWNrTmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5uYW1lO1xuLy8gXHRcdHZhciB0cmFja0FydGlzdE5hbWUgPSBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXNbaV0udHJhY2suYXJ0aXN0c1swXS5uYW1lO1xuLy8gXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4vLyBcdFx0dmFyIHRleHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHJhY2tOYW1lICsgJyAtICcgKyB0cmFja0FydGlzdE5hbWUpO1xuLy8gXHRcdGxpLmFwcGVuZENoaWxkKHRleHRub2RlKTtcbi8vIFx0XHR1bE5ldy5hcHBlbmRDaGlsZChsaSk7XG4vLyBcdH1cbi8vIH0pO1xuIiwiY29uc29sZS5sb2coJ3Rlc3QnKTtcbiJdfQ==
