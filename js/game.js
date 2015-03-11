// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";


// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
//var princessesCaught = 0;
princessesCaught = localStorage.getItem("score");
if (princessesCaught == null) {
   princessesCaught = 0;
}

var stone = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = 64 + (Math.random() * (canvas.width - 128));
	princess.y = 64 + (Math.random() * (canvas.height - 128));

 // Throw the princess somewhere on the screen randomly
	stone.x = 64 + (Math.random() * (canvas.width - 128));
	stone.y = 64 + (Math.random() * (canvas.height - 128));

};

// Update game objects
var update = function (modifier) {

  if (38 in keysDown) { // Player holding up
    if (hero.y > 32){
		    hero.y -= hero.speed * modifier;
    }
	 }
	 if (40 in keysDown) { // Player holding down
    if (hero.y < 418) {
		    hero.y += hero.speed * modifier;
    }
	 }
	 if (37 in keysDown) { // Player holding left
    if (hero.x > 32){
		    hero.x -= hero.speed * modifier;
    }
	 }
	 if (39 in keysDown) { // Player holding right
    if (hero.x < 450){
		    hero.x += hero.speed * modifier;
    }
	 }


	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
    localStorage.setItem("score", princessesCaught);
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

 //if (stoneReady) {
		//ctx.drawImage(stoneImage, stone.x, stone.y);
	//}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
  
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to  execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
