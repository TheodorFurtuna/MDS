let playerPaddle;
let aiPaddle;
let ball;
let pressed = false;
let button = document.getElementById("start");
let mesaj = document.getElementById("mesaj");
button.addEventListener("click", () => pressed = true);

function setup() {
    createCanvas(windowWidth / 2, windowHeight / 2);
    frameRate(60);
    playerPaddle = new Paddle(26);
    aiPaddle = new Paddle(width - 48);
    ball = new Ball();
}

function draw() {

    background(67, 217, 206 );

    playerPaddle.display();
    aiPaddle.display();

    if (pressed) {
        mesaj.innerHTML = "Play!";

        playerPaddle.update();
        aiPaddle.update_ai();

        processAI();

        if (!ball.verify_end_round()) {    
            ball.update();
            ball.display();
        }
        else {
            mesaj.innerHTML = "Goal! The game will restart in 3s";
            noLoop();
            setTimeout(loop, 3000);
            ball.update();
            ball.display();
        }
    }

    ball.hasHitPlayer(playerPaddle); 
    ball.hasHitAi(aiPaddle); 

    stroke(255);
    line(width/2, 0, width/2, height);
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		playerPaddle.isUp = true;
	} else if (keyCode == DOWN_ARROW) {
		playerPaddle.isDown = true;
	}
}

function keyReleased() {
	if (keyCode == UP_ARROW) {
		playerPaddle.isUp = false;
	} else if (keyCode == DOWN_ARROW) {
		playerPaddle.isDown = false;
	}
}

function processAI() {
    let middleOfPaddle = aiPaddle.y + aiPaddle.height / 2;
      
    if (middleOfPaddle > ball.y) {
      aiPaddle.isUp = true;
      aiPaddle.isDown = false;
    } else {
      aiPaddle.isDown = true;
      aiPaddle.isUp = false;
  
    }
}
