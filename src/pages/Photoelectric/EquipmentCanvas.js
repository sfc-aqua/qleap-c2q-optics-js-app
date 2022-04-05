import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";

function drawMysteryMetal(ctx, width, height) {
  const METAL_WIDTH = 300;
  const METAL_HEIGHT = 200;
  const LEFT_OFFSET = (width - METAL_WIDTH) * 0.5;

  ctx.beginPath();
  ctx.moveTo(LEFT_OFFSET, 0);

  ctx.lineTo(METAL_WIDTH + LEFT_OFFSET, 0);
  ctx.arc(
    METAL_WIDTH - 50 + LEFT_OFFSET,
    METAL_HEIGHT * 0.5,
    METAL_HEIGHT * 0.5 * 1.4142135623730951,
    -Math.PI * 0.25,
    Math.PI * 0.25,
  );
  ctx.lineTo(LEFT_OFFSET, METAL_HEIGHT);
  ctx.arc(
    LEFT_OFFSET,
    METAL_HEIGHT * 0.5,
    METAL_HEIGHT * 0.5 * 1.4142135623730951,
    Math.PI * 0.75,
    Math.PI * 1.25,
  );
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "gray";
  // anode
  ctx.fillRect(LEFT_OFFSET - 100, 10, 20, METAL_HEIGHT - 20);
  // cathode
  ctx.fillRect(LEFT_OFFSET + METAL_WIDTH + 30, 10, 20, METAL_HEIGHT - 20);
}

function drawCircuit(ctx, width, height) {
  ctx.beginPath();
}

function EquipmentCanvas({ drawFunc }) {
  const cvs = useRef(null);
  const wrapper = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useAnimationFrame((timestamp) => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    const { width, height } = cvs.current;
    ctx.clearRect(0, 0, cvs.current.width, cvs.current.height);
    drawMysteryMetal(ctx, width, height);
    drawCircuit(ctx, width, height);
    ctx.save();
    drawFunc(ctx, timestamp / 3);
    ctx.restore();
  });

  useEffect(() => {
    if (!wrapper.current) return;
    const elem = wrapper.current;
    setSize({ width: elem.clientWidth, height: elem.clientHeight });
  }, [wrapper]);
  return (
    <div ref={wrapper}>
      <canvas width={size.width} height={size.height} ref={cvs} />
      <style jsx>
        {`
          div {
            position: relative;
            width: 100%;
            height: 600px;
          }
        `}
      </style>
    </div>
  );
}

EquipmentCanvas.propTypes = {
  drawFunc: PropTypes.func.isRequired,
};
export default EquipmentCanvas;
