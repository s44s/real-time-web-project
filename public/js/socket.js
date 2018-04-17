var form = document.getElementsByTagName('form');
var radiobuttons = document.querySelectorAll('input[type="radio"]')
var socket = io();

for (i = 0; i < radiobuttons.length; i++) {
	radiobuttons[i].addEventListener('change', function(el){
		var backgroundColor = el.srcElement.value
		socket.emit('background change', backgroundColor);
	})
}

socket.on('background color', function(color){
	radiobuttons.forEach(function(el){
		if(el.value == color) {
			el.checked = true;
			document.body.style.backgroundColor = color;
		}
	})
});
