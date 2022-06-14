class Ship {
  constructor(x, spaceshipImage) {
    this.x = x;
    this.score = 0;
    this.r = 20;
    this.respawn();
    // store the image in the ship object
    this.spaceshipImage = spaceshipImage;
  }

  respawn() {
    this.y = height - 20;
    this.isUp = false;
    this.isDown = false;
  }

  update() {
    if (this.isUp && this.y > 0) {
      this.up();
    } else if (this.isDown && this.y < height - 20) {
      this.down();
    }

    if (this.hasPlayerScoredAPoint()) {
      this.score++;
      this.respawn();
    }
  }

  display() {
    // display our beautiful ship to the world!
    imageMode(CENTER);
    image(this.spaceshipImage, this.x, this.y, this.r * 2, this.r * 2);
  }

  up() {
    this.y -= 2;
  }

  down() {
    this.y += 2;
  }

  hasPlayerScoredAPoint() {
    if (this.y <= 0) {
      return true;
    }
    return false;
  }
}