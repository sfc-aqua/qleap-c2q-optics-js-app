import SingleRect from "./singleRect";
import DoubleRect from "./doubleRect";

// show path of photon
const drawThePhotonPath = (context, originObj, destinationObj, lineWidth = 1) => {
  context.beginPath();
  context.lineWidth = 5;
  context.setLineDash([10, 5]);
  context.moveTo(originObj.x, originObj.y);
  context.lineTo(destinationObj.x, destinationObj.y);
  context.stroke();
  context.lineWidth = lineWidth;
  context.setLineDash([]);
};

class MachZehnderEquipment {
  constructor(posX, posY, width, height) {
    this.context;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;

    this.source = new SingleRect("Photon Source");
    this.bs1 = new DoubleRect("BS1");
    this.bs2 = new DoubleRect("BS2");
    this.mirror0 = new DoubleRect("mirror");
    this.mirror1 = new DoubleRect("mirror");
    this.detector0 = new SingleRect("D0");
    this.detector1 = new SingleRect("D1");
  }

  draw(context) {
    this.context = context;
    this.context.save();
    this.context.translate(this.posX, this.posY);
    // const sample = new DoubleRect(50, 250, 50, -30, 0, 1, 0);

    // show objects
    this.source.draw(this.context, 0, 0.75 * this.height, 50, 50, 45);
    this.bs1.draw(this.context, 0.25 * this.width, 0.5 * this.height, 100, 5, 180, 2, 1);
    this.bs2.draw(this.context, 0.75 * this.width, 0.5 * this.height, 100, 5, 0, 2, 1);
    this.mirror0.draw(this.context, 0.5 * this.width, 0.25 * this.height, 100, 5, 180, 1, 2);
    this.mirror1.draw(this.context, 0.5 * this.width, 0.75 * this.height, 100, 5, 0, 1, 2);
    this.detector0.draw(this.context, this.width, 0.25 * this.height, 50, 50, -135);
    this.detector1.draw(this.context, this.width, 0.75 * this.height, 50, 50, -45);

    drawThePhotonPath(this.context, this.source, this.bs1);
    drawThePhotonPath(this.context, this.bs1, this.mirror0);
    drawThePhotonPath(this.context, this.bs1, this.mirror1);
    drawThePhotonPath(this.context, this.mirror0, this.bs2);
    drawThePhotonPath(this.context, this.mirror1, this.bs2);
    drawThePhotonPath(this.context, this.bs2, this.detector0);
    drawThePhotonPath(this.context, this.bs2, this.detector1);

    this.context.restore();
  }
}

export default MachZehnderEquipment;
