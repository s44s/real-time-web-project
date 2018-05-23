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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvc29ja2V0LW5ldy5qcyIsInB1YmxpYy9qcy9zb2NrZXQuanMiLCJwdWJsaWMvanMvdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBzb2NrZXQgPSBpbygpO1xudmFyIGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQnKTtcbnZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5hZGQnKTtcblxuLyogc2VhcmNoIHNvbmcgKi9cbmZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9uLmxlbmd0aDsgaSsrKSB7XG5cdGJ1dHRvbltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB1cmwgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbMV0uc3JjO1xuXHRcdHZhciB0cmFja0tleSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1szXS5pbm5lckhUTUw7XG5cdFx0dmFyIHRyYWNrSUQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbN10uaW5uZXJIVE1MO1xuXHRcdHZhciBhcnRpc3RLZXkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbNV0uaW5uZXJIVE1MO1xuXHRcdHZhciBhcnRpc3RJRCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1s5XS5pbm5lckhUTUw7XG5cblx0XHRjb25zb2xlLmxvZyh1cmwpO1xuXG5cdFx0c29ja2V0LmVtaXQoJ2FkZCBzb25nJywge1xuXHRcdFx0aW1hZ2U6IHVybCxcblx0XHRcdHRyYWNrOiB0cmFja0tleSxcblx0XHRcdHRyYWNraWQ6IHRyYWNrSUQsXG5cdFx0XHRhcnRpc3Q6IGFydGlzdEtleSxcblx0XHRcdGFydGlzdGlkOiBhcnRpc3RJRCxcblx0XHRcdHVzZXI6IHdpbmRvdy51c2VyLmlkXG5cdFx0fSlcblx0fSk7XG59XG5cbnNvY2tldC5vbignbmV3VHJhY2tzRnJvbVBsYXlsaXN0JywgZnVuY3Rpb24ocmVzdWx0cyl7XG5cdHZhciBkaXZSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAucGxheWxpc3QnKTtcblx0dmFyIHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IG9sJyk7XG5cblx0dWwucmVtb3ZlKClcblx0dmFyIHVsTmV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcblx0ZGl2UmlnaHQuYXBwZW5kQ2hpbGQodWxOZXcpO1xuXG5cdGZvcih2YXIgaT0wOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0Ly8gbGkuY2xhc3NMaXN0LmFkZCgndHJhY2snKTtcblx0XHR1bE5ldy5hcHBlbmRDaGlsZChsaSk7XG5cblx0XHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1nLnNyYyA9IHJlc3VsdHNbaV0uaW1hZ2U7XG5cdFx0bGkuYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdHZhciB0cmFja05hbWUgPSByZXN1bHRzW2ldLnRyYWNrXG5cdFx0dmFyIHRyYWNrQXJ0aXN0TmFtZSA9IHJlc3VsdHNbaV0uYXJ0aXN0XG5cdFx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0dmFyIHRleHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHJhY2tOYW1lKTtcblx0XHRwLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRsaS5hcHBlbmRDaGlsZChwKTtcblxuXHRcdHZhciBwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFja0FydGlzdE5hbWUpO1xuXHRcdHAyLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRsaS5hcHBlbmRDaGlsZChwMik7XG5cdH1cbn0pO1xuXG5zb2NrZXQub24oJ2N1cnJlbnRQbGF5aW5nJywgZnVuY3Rpb24oY3VycmVudFRyYWNrKXtcblx0dmFyIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdCcpO1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbiAub3ZlcmFsbCcpO1xuXHR2YXIgcGxheWxpc3QgPSB3aW5kb3cucGxheWxpc3Q7XG5cdHZhciBkaXZPdmVyYWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblxuXHRwbGF5bGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGVsKXtcblx0XHRpZihlbC50cmFja2lkID09IGN1cnJlbnRUcmFjay5ib2R5Lml0ZW0uaWQgJiYgZWwudXNlcl91c2VybmFtZSA9PSB3aW5kb3cudXNlci5pZCkge1xuXHRcdFx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHR2YXIgdGV4dG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU3V1cyBsdWlzdGVyIG51IGpvdXcgbnVtbWVyIFwiJyArIGVsLnRyYWNrICsgJ1wiJyk7XG5cdFx0XHRwLmFwcGVuZENoaWxkKHRleHRub2RlKTtcblx0XHRcdGRpdk92ZXJhbGwuYXBwZW5kQ2hpbGQocCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJhbGwgcCcpO1xuXHRcdH1cblx0fSlcblxuXHRpZihjdXJyZW50VHJhY2suYm9keS5pc19wbGF5aW5nID09IHRydWUpIHtcblx0XHRkaXYucmVtb3ZlKClcblx0XHRkaXZPdmVyYWxsLmNsYXNzTGlzdC5hZGQoJ292ZXJhbGwnKTtcblx0XHRtYWluLmFwcGVuZENoaWxkKGRpdk92ZXJhbGwpO1xuXG5cdFx0dmFyIGRpdkZsZXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHQvLyBkaXZPdmVyYWxsLmFwcGVuZENoaWxkKGRpdkZsZXgpO1xuXHRcdGRpdk92ZXJhbGwuaW5zZXJ0QmVmb3JlKGRpdkZsZXgsIGRpdk92ZXJhbGwuY2hpbGROb2Rlc1swXSk7XG5cblxuXHRcdHZhciBkaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2MS5jbGFzc0xpc3QuYWRkKCdvbmUnKTtcblx0XHRkaXZGbGV4LmFwcGVuZENoaWxkKGRpdjEpO1xuXG5cdFx0dmFyIGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYyLmNsYXNzTGlzdC5hZGQoJ3R3bycpO1xuXHRcdGRpdkZsZXguYXBwZW5kQ2hpbGQoZGl2Mik7XG5cblx0XHR2YXIgZGl2MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdjMuY2xhc3NMaXN0LmFkZCgndGhyZWUnKTtcblx0XHRkaXZGbGV4LmFwcGVuZENoaWxkKGRpdjMpO1xuXG5cdH0gZWxzZSB7XG5cdFx0ZGl2LnJlbW92ZSgpXG5cdFx0dmFyIGRpdk92ZXJhbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXZPdmVyYWxsLmNsYXNzTGlzdC5hZGQoJ292ZXJhbGwnKTtcblx0XHRtYWluLmFwcGVuZENoaWxkKGRpdk92ZXJhbGwpO1xuXHR9XG5cdC8vIGlmKHBsYXlsaXN0LmluY2x1ZGVzKGN1cnJlbnRUcmFjay5ib2R5Lml0ZW0uaWQpKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ3llcycpO1xuXHQvLyB9IGVsc2Uge1xuXHQvLyBcdGNvbnNvbGUubG9nKCdubycpO1xuXHQvLyB9XG5cbn0pXG4iLCIvLyB2YXIgc29ja2V0ID0gaW8oKTtcbi8vIHZhciBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRkJyk7XG4vLyB2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0uYWRkJyk7XG4vLyBjb25zb2xlLmxvZyhmb3JtKVxuLy9cbi8vIC8qIHBsYXlsaXN0IHN1dXMgKi9cbi8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbi8vIFx0c29ja2V0LmVtaXQoJ2dldFRyYWNrc0Zyb21QbGF5bGlzdCcpO1xuLy8gfSwgMTAwMCk7XG4vL1xuLy8gc29ja2V0Lm9uKCduZXdUcmFja3NGcm9tUGxheWxpc3QnLCBmdW5jdGlvbihkYXRhU29uZ3Mpe1xuLy8gXHR2YXIgZGl2UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQnKTtcbi8vIFx0dmFyIHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0IHVsJyk7XG4vLyBcdHVsLnJlbW92ZSgpXG4vLyBcdHZhciB1bE5ldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4vLyBcdGRpdlJpZ2h0LmFwcGVuZENoaWxkKHVsTmV3KTtcbi8vXG4vLyBcdGZvcih2YXIgaT0wOyBpIDwgZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0dmFyIHRyYWNrTmFtZSA9IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtc1tpXS50cmFjay5uYW1lO1xuLy8gXHRcdHZhciB0cmFja0FydGlzdE5hbWUgPSBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXNbaV0udHJhY2suYXJ0aXN0c1swXS5uYW1lO1xuLy8gXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4vLyBcdFx0dmFyIHRleHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHJhY2tOYW1lICsgJyAtICcgKyB0cmFja0FydGlzdE5hbWUpO1xuLy8gXHRcdGxpLmFwcGVuZENoaWxkKHRleHRub2RlKTtcbi8vIFx0XHR1bE5ldy5hcHBlbmRDaGlsZChsaSk7XG4vLyBcdH1cbi8vIH0pO1xuLy9cbi8vIC8qIHNlYXJjaCBzb25nICovXG4vLyAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbi5sZW5ndGg7IGkrKykge1xuLy8gXHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuLy9cbi8vIFx0XHR2YXIgdHJhY2tLZXkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbNV0uaW5uZXJIVE1MO1xuLy8gXHRcdHZhciBhcnRpc3RLZXkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbN10uaW5uZXJIVE1MO1xuLy9cbi8vIFx0XHRzb2NrZXQuZW1pdCgnYWRkIHNvbmcnLCB7XG4vLyBcdFx0XHR0cmFjazogdHJhY2tLZXksXG4vLyBcdFx0XHRhcnRpc3Q6IGFydGlzdEtleVxuLy8gXHRcdH0pXG4vLyBcdH0pO1xuLy8gLy8gfVxuLy9cbi8vXG4vLyBzb2NrZXQub24oJ3NvbmcnLCBmdW5jdGlvbihzb25nKXtcbi8vIFx0dmFyIGRpdlJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0Jyk7XG4vLyBcdHZhciB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCB1bCcpO1xuLy8gXHR1bC5yZW1vdmUoKVxuLy8gXHR2YXIgdWxOZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuLy8gXHRkaXZSaWdodC5hcHBlbmRDaGlsZCh1bE5ldyk7XG4vL1xuLy8gXHRmb3IodmFyIGk9MDsgaSA8IGRhdGFTb25ncy5ib2R5LnRyYWNrcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuLy8gXHRcdHZhciB0cmFja05hbWUgPSBkYXRhU29uZ3MuYm9keS50cmFja3MuaXRlbXNbaV0udHJhY2submFtZTtcbi8vIFx0XHR2YXIgdHJhY2tBcnRpc3ROYW1lID0gZGF0YVNvbmdzLmJvZHkudHJhY2tzLml0ZW1zW2ldLnRyYWNrLmFydGlzdHNbMF0ubmFtZTtcbi8vIFx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuLy8gXHRcdHZhciB0ZXh0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRyYWNrTmFtZSArICcgLSAnICsgdHJhY2tBcnRpc3ROYW1lKTtcbi8vIFx0XHRsaS5hcHBlbmRDaGlsZCh0ZXh0bm9kZSk7XG4vLyBcdFx0dWxOZXcuYXBwZW5kQ2hpbGQobGkpO1xuLy8gXHR9XG4vLyB9KTtcbiIsImNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4iXX0=
