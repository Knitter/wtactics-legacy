
$('#join').click(joinGame);

function joinGame() 
{
	var username = $('#username').val();
	var password = $('#password').val();
	var game_id  = $('#game_id').val();
	
	sessionStorage.username = username;
	sessionStorage.password = password;
	sessionStorage.game_id = game_id;
	
	window.location = 'game.html';
}


console.log('quick_join.js loaded');

