class SingleRect {
    constructor(x, y, w = 50, h = 50, angle = 0, name) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.angle = angle;
      this.radian = this.angle * (Math.PI / 180);
      this.name = name
    }
  
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.radian);
      // adjust position as a center top of filled rectangle
      ctx.fillRect(-0.5 * this.w, 0, this.w, this.h);
      ctx.restore();
    }
  }
  
  export default SingleRect;
  