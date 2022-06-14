let leftShip;
let rightShip;
let allDebris = [];

let leftScore;
let rightScore;

let spaceshipImage;

const NUM_DEBRIS = 30;

//let timer;
let speed = 1;
let pressed = 0;
let button1 = document.getElementById("Difficulty1");
let button2 = document.getElementById("Difficulty2");
let button3 = document.getElementById("Difficulty3");

button1.addEventListener("click", () => (pressed = 1));
button2.addEventListener("click", () => (pressed = 1.5));
button3.addEventListener("click", () => (pressed = 2));

function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2);

  // get the spaceship image from your project-folder
  spaceshipImage = loadImage("spaceship.png");

  leftShip = new Ship(width * 0.33, spaceshipImage);
  rightShip = new Ship(width * 0.66, spaceshipImage);

  //create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    allDebris.push(new Debris(pressed));
  }

  // creating the score objects
  leftScore = new Score(width * 0.33 - 40);
  rightScore = new Score(width * 0.66 + 40);

  timer = new Timer();
}

function draw() {
  background(0, 51, 102);

  // leftShip.update();
  // rightShip.update();

  // leftShip.display();
  // rightShip.display();

  if (pressed != 0) {
    leftShip.update();
    rightShip.update();

    leftShip.display();
    rightShip.display();

    for (let i = 0; i < NUM_DEBRIS; i++) {
      allDebris[i].set(pressed);
    }

    updateDebrisAndCheckCollisions();
    //alert(pressed);

    // pass in the players current score
    leftScore.display(leftShip.score);
    rightScore.display(rightShip.score);

    // timer.display();
    // if (timer.y >= height) {
    //   noLoop();
    // }
  }
}

function updateDebrisAndCheckCollisions() {
  for (let i = 0; i < allDebris.length; i++) {
    allDebris[i].update();
    allDebris[i].display();

    if (allDebris[i].hasHitShip(leftShip)) {
      leftShip.respawn();
    } else if (allDebris[i].hasHitShip(rightShip)) {
      rightShip.respawn();
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    rightShip.isUp = true;
    rightShip.isDown = false;
  } else if (keyCode == DOWN_ARROW) {
    rightShip.isDown = true;
    rightShip.isUp = false;
  }

  if (keyCode == 87) {
    // keycode is 'w'
    leftShip.isUp = true;
    leftShip.isDown = false;
  } else if (keyCode == 83) {
    // keycode is 's'
    leftShip.isDown = true;
    leftShip.isUp = false;
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    rightShip.isUp = false;
  } else if (keyCode == DOWN_ARROW) {
    rightShip.isDown = false;
  }

  if (keyCode == 87) {
    leftShip.isUp = false;
  } else if (keyCode == 83) {
    leftShip.isDown = false;
  }
}
