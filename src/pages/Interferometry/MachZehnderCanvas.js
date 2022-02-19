import React, { useRef } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";
import SingleRect from "./singleRect";
import DoubleRect from "./doubleRect";


function MachZehnderCanvas({ size: { width, height }, refractionIndex }) {
  const cvs = useRef(null);

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const source = new SingleRect(0.1 * width, 0.75 * height, 50, 50, 45, 'Photon Source');

    const bs1 = new DoubleRect(0.3 * width, 0.5 * height, 100, 5, 180, 2, 1, 'BS1');
    const bs2 = new DoubleRect(0.7 * width, 0.5 * height, 100, 5, 0, 2, 1, 'BS2');

    const mirror1 = new DoubleRect(0.5 * width, 0.25 * height, 100, 5, 180, 1, 2, 'mirror');
    const mirror2 = new DoubleRect(0.5 * width, 0.75 * height, 100, 5, 0, 1, 2, 'mirror');

    const detector0 = new SingleRect(0.9 * width, 0.25 * height, 50, 50, -135, 'D0');
    const detector1 = new SingleRect(0.9 * width, 0.75 * height, 50, 50, -45, 'D1');

    const sample = new DoubleRect(50, 250, 50, -30, 0, 1, 0);

    // show objects
    source.draw(ctx);
    bs1.draw(ctx);
    bs2.draw(ctx);
    mirror1.draw(ctx);
    mirror2.draw(ctx);
    detector0.draw(ctx);
    detector1.draw(ctx);

    // show path of photon
    const drawThePhotonPath = (originObj, endObj) => {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.setLineDash([10, 5]);
      ctx.moveTo(originObj.x, originObj.y);
      ctx.lineTo(endObj.x, endObj.y);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
    };

    drawThePhotonPath(source, bs1);
    drawThePhotonPath(bs1, mirror1);
    drawThePhotonPath(bs1, mirror2);
    drawThePhotonPath(mirror1, bs2);
    drawThePhotonPath(mirror2, bs2);
    drawThePhotonPath(bs2, detector0);
    drawThePhotonPath(bs2, detector1);

    // show wave propagation
    // wave properties
    const amplitude = 2;
    const waveNumberK = 0.2;
    const lightBeamWidth = 2;

    // // from light source to splitter 1
    // for (let posY = splitter1.y; posY < source.y; posY++) {
    //   ctx.fillRect(
    //     amplitude * Math.sin(waveNumberK * posY) + source.x,
    //     posY,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    // }

    // // x-axis waves
    // for (let posX = mirror1.x; posX < mirror2.x; posX++) {
    //   ctx.fillRect(
    //     posX,
    //     amplitude * Math.sin(waveNumberK * posX) + splitter1.y,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    //   ctx.fillRect(
    //     posX,
    //     amplitude * Math.sin(waveNumberK * posX) + splitter2.y,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    // }
    // // x-axis: splitter to detector
    // for (let posX = splitter2.x; posX < 350; posX++) {
    //   ctx.fillRect(
    //     posX,
    //     amplitude * Math.sin(waveNumberK * posX) + splitter2.y,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    // }
    // // y-axis waves
    // for (let posY = splitter2.y; posY < splitter1.y; posY++) {
    //   ctx.fillRect(
    //     amplitude * Math.sin(waveNumberK * posY) + splitter1.x,
    //     posY,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    //   ctx.fillRect(
    //     amplitude * Math.sin(waveNumberK * posY) + splitter2.x,
    //     posY,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    // }
    // // y-axis waves: splitter to detector
    // for (let posY = 50; posY < splitter2.y; posY++) {
    //   ctx.fillRect(
    //     amplitude * Math.sin(waveNumberK * posY) + splitter2.x,
    //     posY,
    //     lightBeamWidth,
    //     lightBeamWidth,
    //   );
    // }

  //   // sample which changes speed of light inside corresponding to the refractive index
  //   ctx.clearRect(sample.x - sample.w / 2, sample.y, sample.w, -sample.h);
  //   sample.draw(ctx);
  //   // y-axis waves: inside sample
  //   for (let posY = sample.y; posY < sample.y - sample.h; posY++) {
  //     ctx.fillRect(
  //       amplitude * Math.sin(waveNumberK * posY * refractionIndex) + sample.x,
  //       posY,
  //       lightBeamWidth,
  //       lightBeamWidth,
  //     );
  //   }
  });
  return (
    <canvas
      width={width}
      height={height}
      ref={cvs}
      style={{ border: "solid 1px red" }}
    />
  );
}
MachZehnderCanvas.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  refractionIndex: PropTypes.number.isRequired,
};
export default MachZehnderCanvas;
