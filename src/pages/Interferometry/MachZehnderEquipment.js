import SingleRect from "./singleRect";
import DoubleRect from "./doubleRect";
import Sample from "./Sample";

// show path of photon
const drawThePhotonPath = (context, originObj, destinationObj, lineWidth = 1) => {
  context.beginPath();
  context.lineWidth = 5;
  context.setLineDash([10, 5]);
  context.moveTo(originObj.posX, originObj.posY);
  context.lineTo(destinationObj.posX, destinationObj.posY);
  context.stroke();
  context.lineWidth = lineWidth;
  context.setLineDash([]);
};

class MachZehnderEquipment {
  constructor(posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.countsD0 = 0;
    this.countsD1 = 0;
    this.counts = 0;

    this.source = new SingleRect(
      "Photon Source",
      this.posX,
      this.posY + this.height,
      50,
      150,
      45,
    );
    this.bs1 = new DoubleRect(
      "BS1",
      this.posX + 0.25 * this.width,
      this.posY + 0.5 * this.height,
      100,
      5,
      180,
      2,
      1,
    );
    this.bs2 = new DoubleRect(
      "BS2",
      this.posX + 0.75 * this.width,
      this.posY + 0.5 * this.height,
      100,
      5,
      0,
      2,
      1,
    );
    this.mirror0 = new DoubleRect(
      "mirror",
      this.posX + 0.5 * this.width,
      this.posY,
      100,
      5,
      180,
      1,
      2,
    );
    this.mirror1 = new DoubleRect(
      "mirror",
      this.posX + 0.5 * this.width,
      this.posY + this.height,
      100,
      5,
      0,
      1,
      2,
    );
    this.detector0 = new SingleRect(
      "D0",
      this.posX + this.width,
      this.posY,
      50,
      50,
      -135,
    );
    this.detector1 = new SingleRect(
      "D1",
      this.posX + this.width,
      this.posY + this.height,
      50,
      50,
      -45,
    );

    this.sample = new Sample(60, 40);
  }

  draw(context, angle) {
    // show objects
    this.source.draw(context);
    this.bs1.draw(context);
    this.bs2.draw(context);
    this.mirror0.draw(context);
    this.mirror1.draw(context);
    this.detector0.draw(context);
    this.detector1.draw(context);
    this.sample.draw(context, angle, this.bs1, this.mirror1);

    drawThePhotonPath(context, this.source, this.bs1);
    drawThePhotonPath(context, this.bs1, this.mirror0);
    drawThePhotonPath(context, this.bs1, this.mirror1);
    drawThePhotonPath(context, this.mirror0, this.bs2);
    drawThePhotonPath(context, this.mirror1, this.bs2);
    drawThePhotonPath(context, this.bs2, this.detector0);
    drawThePhotonPath(context, this.bs2, this.detector1);
  }

  fire(context, photon, photonFire, probability) {
    if (photonFire) {
      // decide position of photon
      photon.move(this.detector0, this.mirror0, this.bs1, this.bs2, probability);
      photon.drawParticle(context);

      if (photon.posX > this.detector0.posX) {
        if (probability > photon.probabilityBS2) { // click on D0
          // click effect on D0
          context.fillRect(this.detector0.posX - 60, this.detector0.posY, 30, 5);
          context.fillRect(this.detector0.posX, this.detector0.posY + 30, 5, 30);

          // count up D0 counts
          this.countsD0 += 1;
        } else { // click on D1
          // click effect on D1
          context.fillRect(this.detector1.posX - 60, this.detector1.posY, 30, 5);
          context.fillRect(this.detector1.posX, this.detector1.posY - 60, 5, 30);

          // count up D1 counts
          this.countsD1 += 1;
        }
        this.counts += 1;
        photon.reset();
      }
    } else {
      photon.initialize();
    }
  }
}

export default MachZehnderEquipment;
