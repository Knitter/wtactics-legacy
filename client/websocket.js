var game = {};

game.setStatus = function(msg) {
	console.log(msg);
	document.getElementById('status').innerHTML = msg;
}

game.die = function(msg) {
	game.setStatus(msg);
	alert(msg);
	document.body.disabled = true;
	window.stop();
}

	

/**
* Attempts to connect to the server.
*/
game.connect = function(address, username, password) 
{
	game.setStatus('Connecting to server...');
	
	if ('WebSocket' in window) {
		game.ws = new WebSocket(address);
	}
	else if ('MozWebSocket' in window) {
		game.ws = new MozWebSocket(address);
	}
	else {
		game.die('Your browser does not support websockets. Please use firefox or chrome.');
	}

	var logged_in = false;
	
	game.ws.onmessage = function (evt) { 
		var msg = evt.data;
		console.log('RECEIVED: ' + msg);
		if (logged_in) {
			game.onMessage(msg);
		}
		else
		{
			if (msg === 'login ok ' + username) {
				logged_in = true;
				game.setStatus('Connected');
				game.onReady();
			}
			else {
				game.onError(msg);
			}
		}
	}
	
	game.ws.onopen = function() {
		game.setStatus('Authentifying user...');
		
		var msg = 'login ' + username + ' ' + password;
		game.ws.send(msg);
	}

	game.ws.onclose = function() {
		game.die('Disconnected / Server unavailable');
	}
	
	game.send = function(msg) {
		game.ws.send(msg);
		console.log('SENT: ' + msg);
	}
}

console.log('websocket.js loaded');

