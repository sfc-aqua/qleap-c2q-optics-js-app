class Sample {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  draw(context, angle, bs1, mirror1) {
    const diff = this.width * 0.05 * angle;
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
    context.save()
    context.fillStyle="rgba(223,227,238, 0.7)"
    context.stroke();
    context.fill();
    context.restore()
  }
}

export default Sample;
