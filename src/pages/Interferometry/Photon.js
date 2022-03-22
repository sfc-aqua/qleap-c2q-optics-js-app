class Photon {
  constructor(x, y, radius, speed) {
    this.posX = x;
    this.posY = y;
    this.initialPosX = x;
    this.initialPosY = y;
    this.radius = radius;
    this.speed = speed;
    this.speedX = this.speed;
    this.speedY = -1 * this.speed;
  }

  initialize() {
    this.posX = this.initialPosX;
    this.posY = this.initialPosY;
    this.speedX = this.speed;
    this.speedY = -1 * this.speed;
  }

  moveTo(context, splitter1, mirror, splitter2, detector) {
    if (this.posX < detector.posX + this.radius) {
      this.posX += this.speedX;
      this.posY += this.speedY;

      if (this.posX === splitter1.posX) {
        this.speedY *= -1;
      }
      if (this.posX === mirror.posX) {
        this.speedY *= -1;
      }
      if (this.posX === splitter2.posX) {
        this.speedY *= -1;
      }
    }
    this.drawParticle(context);
  }

  drawParticle(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
}

export default Photon;
