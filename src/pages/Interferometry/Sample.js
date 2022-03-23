class Sample {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  draw(context, angle, bs1, mirror1) {
    const diff = this.width * 0.025 * angle;
    context.beginPath();
    context.moveTo(
      (bs1.posX + mirror1.posX) / 2 - this.width + diff - 10,
      (bs1.posY + mirror1.posY) / 2 + this.width - diff + 10,
    );
    context.lineTo(
      (bs1.posX + mirror1.posX) / 2 + diff,
      (bs1.posY + mirror1.posY) / 2 - diff,
    );
    context.lineTo(
      (bs1.posX + mirror1.posX) / 2 - this.width + this.height / 2 + diff - 10,
      (bs1.posY + mirror1.posY) / 2 + this.width + this.height / 2 - diff + 10,
    );
    context.lineTo(
      (bs1.posX + mirror1.posX) / 2 - this.width + diff - 10,
      (bs1.posY + mirror1.posY) / 2 + this.width - diff + 10,
    );
    context.stroke();
  }
}

export default Sample;
