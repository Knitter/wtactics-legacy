
$('#login').click(login);

function login() 
{
	var username = $('#username').val();
	var password = $('#password').val();
	
	game.onReady = function() {
		console.log('login successful, going to lobby');
		sessionStorage.username = username;
		sessionStorage.password = password;
		window.location = 'lobby.html';
	}
	
	game.onError = function(msg) {
		game.setStatus(msg);
	}

	game.connect("ws://50.57.161.126:8001/", username, password);
}


console.log('login.js loaded');

