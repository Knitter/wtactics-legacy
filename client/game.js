/////////////////////////////////////////////////////////////////////
/*
game.card_height = 105;
game.card_width = 76;
game.card_height_2 = 140;
game.card_width_2 = 102;
*/
/*
game.setStatus = function(msg) {
	game.status.innerHTML = msg;
};
*/

/////////////////////////////////////////////////////////////////////
/*
game.setStatus('Checking browser compatibility...');

if (!Modernizr.draganddrop) {
  game.die('Browser does not support html5 drag & drop.');
}
*/
/////////////////////////////////////////////////////////////////////

game.setStatus('Loading cards...');

var cards = {};

//for card in cards.txt:
cards.list = [
'algae_armor',
'donations_for_recovery',
'doubt_the_violence',
'downside',
'dryads_flute',
'elvish_archer',
'elvish_captain',
'elvish_druid',
'elvish_fighter',
'elvish_marksman',
'elvish_ranger',
'elvish_scout',
'elvish_shaman',
'fairy_pot',
'green_shield',
'living_trees',
'merman_brawler',
'merman_hoplite',
'natures_presence',
'staff_of_enchantment',
'sudden_donations'
];

cards.all = {}

cards.getImage = function(type) {
	var img = document.createElement('img');
	img.draggable = true;
	img.src = 'img/' + type + '.jpg';
	//img.width = game.card_width;
	//img.height = game.card_height;
	img.setAttribute("class", "card");
	return img;
}


cards.create = function(id, type) {
	var card = {
		id: id,
		type: type,
		image: cards.getImage(type),
		flipped: false,
		update: function() {
			this.image.src = 'img/' + this.type + '.jpg';
			if (this.flipped) {
				this.image.setAttribute("class", "card flipped");
			}
			else {
				this.image.setAttribute("class", "card");
			}
			console.log(this.image.src);
		}
	};
	card.image.id = id;
	
	card.image.onmousedown = function(e) {
		if (e.button == 2) { //right clic
			game.big_card.src = card.image.src;
			game.big_card.hidden = false;
		}
	}
	
	card.image.oncontextmenu = function(e) {
		return false;
	}
	card.image.onclick = function(e) {
		console.log('>>> ' + e.button);
		msg = 'flip ' + card.id;
		game.send(msg);
	};
	card.image.ondragstart = function(e) {
		e.dataTransfer.setData("text", card.id);
		console.log('dragging ' + card.id);
		game.setStatus('dragging ' + card.id);
	};
	
	cards.all[card.id] = card;
	return card;
}
	
/////////////////////////////////////////////////////////////////////

game.setStatus('Loading game mechanics...');
	
var north = {
	deck: document.getElementById('north_deck'),
	hand: document.getElementById('north_hand'),
	resources: document.getElementById('north_resources'),
	graveyard: document.getElementById('north_graveyard'),
	west: document.getElementById('north_west'),
	east: document.getElementById('north_east')
	};

var south = {
	deck: document.getElementById('south_deck'),
	hand: document.getElementById('south_hand'),
	resources: document.getElementById('south_resources'),
	graveyard: document.getElementById('south_graveyard'),
	west: document.getElementById('south_west'),
	east: document.getElementById('south_east')
	};


/////////////////////////////////////////////////////////////////////


game.onError = function(msg) {
	alert(msg);
}

game.onMessage = function (fullmsg) { 
	game.setStatus(fullmsg);
	var msg = fullmsg.split(' ');
	if (msg[0] === 'join' && msg[1] === 'ok') {
		game.sides = {};
		if (msg[2] == 'sideA') {
			game.sides['sideA'] = 'south';
			game.sides['south'] = 'sideA';
			game.sides['sideB'] = 'north';
			game.sides['north'] = 'sideB';
			game.setStatus("Waiting for opponent...");
		}
		else if (msg[2] == 'sideB') {
			game.sides['sideB'] = 'south';
			game.sides['south'] = 'sideB';
			game.sides['sideA'] = 'north';
			game.sides['north'] = 'sideA';
			game.setStatus("Waiting for opponent...");
		}
		else {
			throw "Incorrect side received: " + msg[2];
		}
	}
	else if (msg[0] === 'game_started') {
		
		console.log('Removing area labels');
		
		north.deck.innerHTML = '';
		north.deck.innerHTML = '';
		north.hand.innerHTML = '';
		north.resources.innerHTML = '';
		north.graveyard.innerHTML = '';
		north.west.innerHTML = '';
		north.east.innerHTML = '';

		south.deck.innerHTML = '';
		south.hand.innerHTML = '';
		south.resources.innerHTML = '';
		south.graveyard.innerHTML = '';
		south.west.innerHTML = '';
		south.east.innerHTML = '';
		
		console.log('Creating decks');
		
		var img = cards.getImage('downside');
		img.id = 'opponent_deck'
		img.setAttribute("class", "deck");
		img.draggable = false;
		
		north.deck.appendChild(img);

		img = cards.getImage('downside');
		img.id = 'player_deck'
		img.setAttribute("class", "deck");
		img.draggable = false;
		img.onclick = function(e) {
			game.send('draw_card');
		}

		south.deck.appendChild(img);
		
		game.onMessage = game.handleMessage;
	}
	else {
		game.setStatus(fullmsg);
	}
}

/////////////////////////////////////////////////////////////////////

game.handleMessage = function (fullmsg) { 
	game.setStatus(fullmsg);
	var msg = fullmsg.split(' ');
	if (msg[0] == 'move') {
		moveCard(msg[1], msg[2], game.sides[msg[4]], msg[5], (msg[6] === 'true'));
	}
	if (msg[0] == 'flip') {
		flipCard(msg[1], msg[2]);
	}
}
	
/////////////////////////////////////////////////////////////////////

makeDropTarget = function(target) {

	target.ondragenter = function(e) {
		target.style.border = "1px solid";
	}
	
	target.ondragleave = function(e) {
		target.style.border = "0px";
	}
	
	target.ondragend = function(e) {
		this.style.border = "0px";
	}
	
	target.ondragover = function(e) {
		e.preventDefault();
	}
	
	target.ondrop = function (e) {
		e.preventDefault();
		this.style.border = "0px";
		var target = e.target.id.split('_');
		var side = game.sides[target[0]];
		var location = target[1];
		var msg = "move " + e.dataTransfer.getData("text") + " to " + side + " " + location
		//console.log(msg);
		game.send(msg);
	}
}

game.big_card = document.getElementById('big_card');
game.big_card.draggable = false;
document.onclick = function(e) {
	game.big_card.hidden = true;
}
	

makeDropTarget(north.deck);
makeDropTarget(north.hand);
makeDropTarget(north.resources);
makeDropTarget(north.graveyard);
makeDropTarget(north.west);
makeDropTarget(north.east);

makeDropTarget(south.deck);
makeDropTarget(south.hand);
makeDropTarget(south.resources);
makeDropTarget(south.graveyard);
makeDropTarget(south.west);
makeDropTarget(south.east);



moveCard = function(card_id, card_name, side, location, flipped) {
	var card = cards.all[card_id];
	if (card == null) {
		card = cards.create(card_id, card_name);
	}

	console.log(card.flipped);
	var target = document.getElementById(side + "_" + location);
	target.appendChild(card.image);
	if (card.type != card_name || card.flipped != flipped) {
		card.flipped = flipped;
		card.type = card_name;
		card.update();
	}
}

flipCard = function(card_id, flipped) {
	var card = cards.all[card_id];
	if (card == null) {
		game.die("No such card: " + card_id);
	}
	card.flipped = (flipped === 'true');
	card.update();
}

////////////////////////////////////////////////////////////////////

// Local test
/*
document.body.onclick = function(e) {
game.onMessage('join ok sideA');
game.onMessage('game_started');
};

game.handleMessage('move card_69 fairy_pot to sideB west');
game.handleMessage('move card_123 elvish_fighter to sideB west');
game.handleMessage('move card_69 fairy_pot to sideA east');
game.handleMessage('flip card_123 true');
*/


////////////////////////////////////////////////////////////////////


var username = sessionStorage.username;
var password = sessionStorage.password;
var game_id  = sessionStorage.game_id;

if (username == null) {
	window.location = 'login.html';
}

if (game_id == null) {
	window.location = 'lobby.html';
}

game.onReady = function() {
	var game_id  = sessionStorage.game_id;
	game.send('join ' + game_id);
}

game.connect("ws://50.57.161.126:8003/", username, password);

console.log('game.js loaded');

