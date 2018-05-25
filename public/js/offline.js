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
