class SingleRect {
  constructor(name = null) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.angle = 0;
    this.radian = 0;
    this.name = name;
  }

  draw(context, x, y, w = 50, h = 50, angle = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.radian);
    // adjust position as a center top of filled rectangle
    context.fillRect(-0.5 * this.w, 0, this.w, this.h);
    context.restore();
  }
}

export default SingleRect;
