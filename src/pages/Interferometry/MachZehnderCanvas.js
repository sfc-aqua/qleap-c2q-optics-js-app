import React, { useRef } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";
import SingleRect from "./singleRect";
import DoubleRect from "./doubleRect";

// show path of photon
const drawThePhotonPath = (context, originObj, destinationObj) => {
  context.beginPath();
  context.lineWidth = 5;
  context.setLineDash([10, 5]);
  context.moveTo(originObj.x, originObj.y);
  context.lineTo(destinationObj.x, destinationObj.y);
  context.stroke();
  context.lineWidth = 1;
  context.setLineDash([]);
};

const drawMachZehnderEquipments = (
  context,
  x,
  y,
  width,
  height,
  source,
  bs1,
  bs2,
  mirror0,
  mirror1,
  detector0,
  detector1,
) => {
  context.save();
  context.translate(x, y);

  // const sample = new DoubleRect(50, 250, 50, -30, 0, 1, 0);

  // show objects
  source.draw(context, 0, 0.75 * height, 50, 50, 45);
  bs1.draw(context, 0.25 * width, 0.5 * height, 100, 5, 180, 2, 1);
  bs2.draw(context, 0.75 * width, 0.5 * height, 100, 5, 0, 2, 1);
  mirror0.draw(context, 0.5 * width, 0.25 * height, 100, 5, 180, 1, 2);
  mirror1.draw(context, 0.5 * width, 0.75 * height, 100, 5, 0, 1, 2);
  detector0.draw(context, width, 0.25 * height, 50, 50, -135);
  detector1.draw(context, width, 0.75 * height, 50, 50, -45);

  drawThePhotonPath(context, source, bs1);
  drawThePhotonPath(context, bs1, mirror0);
  drawThePhotonPath(context, bs1, mirror1);
  drawThePhotonPath(context, mirror0, bs2);
  drawThePhotonPath(context, mirror1, bs2);
  drawThePhotonPath(context, bs2, detector0);
  drawThePhotonPath(context, bs2, detector1);

  context.restore();
};

function MachZehnderCanvas({ size: { width, height } }) {
  const cvs = useRef(null);

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const source = new SingleRect("Photon Source");
    const bs1 = new DoubleRect("BS1");
    const bs2 = new DoubleRect("BS2");
    const mirror0 = new DoubleRect("mirror");
    const mirror1 = new DoubleRect("mirror");
    const detector0 = new SingleRect("D0");
    const detector1 = new SingleRect("D1");

    drawMachZehnderEquipments(
      ctx,
      100,
      100,
      400,
      400,
      source,
      bs1,
      bs2,
      mirror0,
      mirror1,
      detector0,
      detector1,
    );
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
};
export default MachZehnderCanvas;
