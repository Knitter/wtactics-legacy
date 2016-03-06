var username = sessionStorage.username;
var password = sessionStorage.password;
var game_id = null;

if (username == null) {
	window.location = 'login.html';
}

game.onReady = function() {
	$('#chat_list').text = '';
	game.send('get_player_list');
	game.send('get_game_list');
	$('#body').disabled = false;
}

game.onError = function(msg) {
	alert(msg);
}

game.onMessage = function (fullmsg) { 
	var msg = fullmsg.split(/ (.*)/);
	
	if (msg[0] === 'chat') {
		$('#chat_list').append(msg[1] + '\n');
	}
	else if (msg[0] === 'player_list') {
		$('#player_list').empty();
		player_list = msg[1].split(' ');
		for (i in player_list) {
			player = player_list[i];
			$('#player_list').append('<option value="' + player + '">' + player + "</option>");
		}
	}
	else if (msg[0] === 'login') {
		$('#chat_list').append(msg[1] + ' logged in\n');
	}
	else if (msg[0] === 'logout') {
		$('#chat_list').append(msg[1] + ' logged out\n');
	}
	else if (msg[0] === 'create_game') {
		if (msg[1] === 'ok ' + game_id) {
			game.setStatus('Game ' + game_id + ' created');
			sessionStorage.game_id = game_id;
			window.location = 'game.html';
		}
		else {
			game.setSatus(msg[1]);
		}
	}
	else if (msg[0] === 'join_game') {
		if (msg[1] === 'ok ' + game_id) {
			game.setStatus('Game ' + game_id + ' joined');
			sessionStorage.game_id = game_id;
			window.location = 'game.html';
		}
		else {
			game.setSatus(msg[1]);
		}
	}
	else if (msg[0] === 'game_list') {
		$('#game_list').empty();
		if (msg.length > 1) {
			game_list = msg[1].split(' ');
			len = game_list.length / 2;
			for (i=0; i<len; i++){
				game_id = game_list[2*i];
				if (game_list[2*i+1] === 'free') {
					$('#game_list').append('<option value="' + game_id + '">' + game_id + "</option>");
				}
				else if (game_list[2*i+1] === 'full') {
					$('#game_list').append('<option value="' + game_id + '" disabled="true">' + game_id + "</option>");
				}
				else {
					game.die("Error: " + msg);
				}
			}
		}
	}
	else {
		console.log('Unknown message function: ' + msg);
	}
}

var chat_msg = document.getElementById('chat_msg');

$('#chat_send').click(chat_send);

chat_msg.onkeypress = function(e) {
	if (e.keyCode == 13) {
		chat_send();
		return false;
	}
}

function chat_send() {
	var msg = 'chat ' + chat_msg.value;
	game.send(msg);
	chat_msg.value = '';
}

$('#create_game').click(create_game);

function create_game() {
	game_id = username + "_game";
	var msg = 'create_game ' + game_id;
	game.send(msg);
}


$('#join_game').click(join_game);

function join_game() {
	game_id = $('#game_list').val();
	var msg = 'join_game ' + game_id;
	game.send(msg);
}


$('#cancel_game').click(cancel_game);

function cancel_game() {
	var msg = 'cancel_game ' + game_id;
	game.send(msg);
}


function updateGameList() {
	game.send('get_game_list');
}




game.connect("ws://50.57.161.126:8002/", username, password);

console.log('lobby.js loaded');

