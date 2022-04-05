import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";

const METAL_WIDTH = 300;
const METAL_HEIGHT = 200;

function drawMysteryMetal(ctx, width) {
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

function drawRegistor(ctx, x, y, width) {
  const scale = width / 70;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 5 * scale, y);
  ctx.lineTo(x + 10 * scale, y - 10 * scale);
  ctx.lineTo(x + 20 * scale, y + 10 * scale);
  ctx.lineTo(x + 30 * scale, y - 10 * scale);
  ctx.lineTo(x + 40 * scale, y + 10 * scale);
  ctx.lineTo(x + 50 * scale, y - 10 * scale);
  ctx.lineTo(x + 60 * scale, y + 10 * scale);
  ctx.lineTo(x + 65 * scale, y);
  ctx.lineTo(x + 70 * scale, y);
  ctx.stroke();
}

function drawBattery(ctx, x, y, width) {
  const scale = width / 50;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 5 * scale, y);
  ctx.moveTo(x + 5 * scale, y - 50);
  ctx.lineTo(x + 5 * scale, y + 50);
  ctx.fillRect(x + 10 * scale, y - 25, 5 * scale, 50);

  ctx.moveTo(x + 10 * scale, y);
  ctx.lineTo(x + 20 * scale, y);
  ctx.moveTo(x + 20 * scale, y - 50);
  ctx.lineTo(x + 20 * scale, y + 50);
  ctx.fillRect(x + 25 * scale, y - 25, 5 * scale, 50);

  ctx.moveTo(x + 25 * scale, y);
  ctx.lineTo(x + 35 * scale, y);
  ctx.moveTo(x + 35 * scale, y - 50);
  ctx.lineTo(x + 35 * scale, y + 50);
  ctx.fillRect(x + 40 * scale, y - 25, 5 * scale, 50);
  ctx.moveTo(x + 40 * scale, y);
  ctx.lineTo(x + 50 * scale, y);
  ctx.stroke();
}

const RADIUS = 30;
function drawCircleWithChar(ctx, x, y, char) {
  ctx.clearRect(x - RADIUS, y - RADIUS, RADIUS * 2, RADIUS * 2);
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = `${RADIUS}px Arial`;
  ctx.fillText(char, x - RADIUS * 0.375, y + RADIUS * 0.375);
}

function drawAmmeter(ctx, x, y) {
  drawCircleWithChar(ctx, x, y, "A");
}

function drawVoltmeter(ctx, x, y) {
  drawCircleWithChar(ctx, x, y, "V");
}

function drawLine(ctx, sx, sy, dx, dy) {
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(dx, dy);
  ctx.stroke();
}
function drawCircuit(ctx, width) {
  const LEFT_OFFSET = (width - METAL_WIDTH) * 0.5;

  ctx.beginPath();
  ctx.moveTo(LEFT_OFFSET - 100, METAL_HEIGHT * 0.5);
  ctx.lineTo(100, METAL_HEIGHT * 0.5);
  ctx.lineTo(100, METAL_HEIGHT * 2);
  ctx.lineTo(width - 200, METAL_HEIGHT * 2);
  ctx.lineTo(width - 200, METAL_HEIGHT * 0.5);
  ctx.lineTo(LEFT_OFFSET + METAL_WIDTH + 50, METAL_HEIGHT * 0.5);
  ctx.stroke();

  drawAmmeter(ctx, width - 200, METAL_HEIGHT);
  drawVoltmeter(ctx, width - 300, 400);
  drawLine(ctx, 100, 500, 150, 500);
  drawRegistor(ctx, 150, 500, 150);

  drawLine(ctx, 300, 500, 350, 500);
  drawBattery(ctx, 350, 500, 100);
  drawLine(ctx, 450, 500, 450 + METAL_WIDTH, 500);
  drawLine(ctx, 450 + METAL_WIDTH, 500, 450 + METAL_WIDTH, 580);
  drawLine(ctx, 450 + METAL_WIDTH, 580, 100, 580);
  drawLine(ctx, 100, 580, 100, 500);
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
