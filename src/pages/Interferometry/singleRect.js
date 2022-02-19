class SingleRect {
  constructor(x, y, w = 50, h = 50, angle = 0, name = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    this.name = name;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.radian);
    // adjust position as a center top of filled rectangle
    context.fillRect(-0.5 * this.w, 0, this.w, this.h);
    context.restore();
  }
}

export default SingleRect;
