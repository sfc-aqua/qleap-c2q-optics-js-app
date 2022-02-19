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

function MachZehnderCanvas({ size: { width, height } }) {
  const cvs = useRef(null);

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const source = new SingleRect(0.1 * width, 0.75 * height, 50, 50, 45, "Photon Source");

    const bs1 = new DoubleRect(0.3 * width, 0.5 * height, 100, 5, 180, 2, 1, "BS1");
    const bs2 = new DoubleRect(0.7 * width, 0.5 * height, 100, 5, 0, 2, 1, "BS2");

    const mirror1 = new DoubleRect(0.5 * width, 0.25 * height, 100, 5, 180, 1, 2, "mirror");
    const mirror2 = new DoubleRect(0.5 * width, 0.75 * height, 100, 5, 0, 1, 2, "mirror");

    const detector0 = new SingleRect(0.9 * width, 0.25 * height, 50, 50, -135, "D0");
    const detector1 = new SingleRect(0.9 * width, 0.75 * height, 50, 50, -45, "D1");

    // const sample = new DoubleRect(50, 250, 50, -30, 0, 1, 0);

    // show objects
    source.draw(ctx);
    bs1.draw(ctx);
    bs2.draw(ctx);
    mirror1.draw(ctx);
    mirror2.draw(ctx);
    detector0.draw(ctx);
    detector1.draw(ctx);

    drawThePhotonPath(ctx, source, bs1);
    drawThePhotonPath(ctx, bs1, mirror1);
    drawThePhotonPath(ctx, bs1, mirror2);
    drawThePhotonPath(ctx, mirror1, bs2);
    drawThePhotonPath(ctx, mirror2, bs2);
    drawThePhotonPath(ctx, bs2, detector0);
    drawThePhotonPath(ctx, bs2, detector1);
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
