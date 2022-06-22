class DoubleRect {
  constructor(name, x, y, w = 50, h = 50, angle = 0, strokeRatio = 0, fillRatio = 1) {
    this.posX = x;
    this.posY = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    this.strokeRatio = strokeRatio;
    this.fillRatio = fillRatio;
    this.name = name;
  }

  draw(context) {
    context.save();
    context.fillStyle="#f7f7f7";
    context.strokeStyle="#f7f7f7";
    context.translate(this.posX, this.posY);
    context.rotate(this.radian);
    // adjust position as a center top of filled rectangle
    context.fillRect(-0.5 * this.w, 0, this.w, this.fillRatio * this.h);
    context.strokeRect(-0.5 * this.w, 0, this.w, this.fillRatio * this.h);
    context.fillStyle="rgba(223,227,238, 0.4)"
    context.fillRect(-0.5 * this.w, 0, this.w, -this.strokeRatio * this.h);
    context.restore();
  }
}

export default DoubleRect;
