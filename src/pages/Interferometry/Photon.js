class Photon {
  constructor(x, y, radius, speed, probabilityBS2) {
    this.posX = x;
    this.posY0 = y;
    this.posY1 = y;
    this.initialPosX = x;
    this.initialPosY = y;
    this.radius = radius;
    this.speed = speed;
    this.speedX = this.speed;
    this.speedY = -1 * this.speed;
    this.speedY0 = this.speedY;
    this.speedY1 = this.speedY;
    this.probabilityBS2 = probabilityBS2;
  }

  initialize() {
    this.posX = this.initialPosX;
    this.posY0 = this.initialPosY;
    this.posY1 = this.initialPosY;
    this.speedX = this.speed;
    this.speedY = -1 * this.speed;
    this.speedY0 = this.speedY;
    this.speedY1 = this.speedY;
  }

  reset() {
    this.posX = NaN;
    this.posY0 = NaN;
    this.posY1 = NaN;
  }

  drawParticle(context) {
    context.beginPath();
    context.arc(this.posX, this.posY0, this.radius, 0, 2 * Math.PI);
    context.arc(this.posX, this.posY1, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  move(detector, mirror, bs1, bs2, probability) {
    if (this.posX >= detector.posX + this.radius) {
      return;
    }
    this.posX += this.speedX;
    this.posY0 += this.speedY0;
    this.posY1 += this.speedY1;

    // probabilistic behavior of beam splitter 1 (always 5:5)
    if (this.posX === bs1.posX) {
      this.speedY1 *= -1;
    }

    // reflection behavior of mirrors
    if (this.posX === mirror.posX) {
      this.speedY0 *= -1;
      this.speedY1 *= -1;
    }

    // probabilistic behavior of beam splitter 2
    if (this.posX === bs2.posX) {
      // this come from upper side
      this.speedY0 *= -1;
      // this come from lower side
      this.speedY1 *= -1;
    }
  }
}

export default Photon;
