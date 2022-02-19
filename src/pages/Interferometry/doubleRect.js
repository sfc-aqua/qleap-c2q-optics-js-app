class DoubleRect {
  constructor(name) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.angle = 0;
    this.radian = 0;
    this.strokeRatio = 0;
    this.fillRatio = 0;
    this.name = name;
  }

  draw(context, x, y, w = 50, h = 50, angle = 0, strokeRatio = 0, fillRatio = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    this.strokeRatio = strokeRatio;
    this.fillRatio = fillRatio;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.radian);
    // adjust position as a center top of filled rectangle
    context.strokeRect(-0.5 * this.w, 0, this.w, -this.strokeRatio * this.h);
    context.fillRect(-0.5 * this.w, 0, this.w, this.fillRatio * this.h);
    context.restore();
  }
}

export default DoubleRect;
