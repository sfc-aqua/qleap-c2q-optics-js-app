class Photon {
  constructor(x, y, radius, speed, probabilityBS1, probabilityBS2) {
    this.posX = x;
    this.posY = y;
    this.initialPosX = x;
    this.initialPosY = y;
    this.radius = radius;
    this.speed = speed;
    this.speedX = this.speed;
    this.speedY = -1 * this.speed;
    this.probabilityBS1 = probabilityBS1;
    this.probabilityBS2 = probabilityBS2;
  }

  initialize() {
    this.posX = this.initialPosX;
    this.posY = this.initialPosY;
    this.speedX = this.speed;
    this.speedY = -1 * this.speed;
  }

  reset() {
    this.posX = NaN;
    this.posY = NaN;
  }

  drawParticle(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  move(detector, mirror, bs1, bs2, probability) {
    if (this.posX < detector.posX + this.radius) {
      this.posX += this.speedX;
      this.posY += this.speedY;

      // probabilistic behavior of beam splitter 1 (always 5:5)
      if (this.posX === bs1.posX) {
        if (this.probabilityBS1 < 0.5) {
          this.speedY *= -1;
        }
      }

      // reflection behavior of mirrors
      if (this.posX === mirror.posX) {
        this.speedY *= -1;
      }

      // probabilistic behavior of beam splitter 2
      if (this.posX === bs2.posX) {
        if (this.speedY > 0) { // this come from upper side
          if (this.probabilityBS2 < probability) {
            this.speedY *= -1;
          }
        } else if (this.speedY < 0) { // this come from lower side
          if (this.probabilityBS2 < 1 - probability) {
            this.speedY *= -1;
          }
        }
      }
    }
  }
}

export default Photon;
