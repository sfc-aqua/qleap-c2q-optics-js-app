import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";

const gridSize = 100;

const drawGrid = (ctx, width, height) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  for (let i = 0; i < width; i += gridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
  }
  for (let i = 0; i < height; i += gridSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
  }
  ctx.stroke();
};

const drawAxis = (ctx) => {
  const { width, height } = ctx.canvas;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  // y axis
  ctx.beginPath();
  ctx.moveTo(gridSize * 2, 0);
  ctx.lineTo(gridSize * 2, height);
  ctx.stroke();

  // x axis
  ctx.beginPath();
  ctx.moveTo(0, gridSize * 3);
  ctx.lineTo(width, gridSize * 3);
  ctx.stroke();
};

function WaveCanvas({ drawFunc }) {
  const cvs = useRef(null);
  const wrapper = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useAnimationFrame((timestamp) => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    const { width, height } = cvs.current;
    ctx.clearRect(0, 0, cvs.current.width, cvs.current.height);
    drawGrid(ctx, width, height);
    drawAxis(ctx);
    ctx.save();
    ctx.translate(gridSize * 2, gridSize * 3);
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
            border: solid 1px red;
          }
        `}
      </style>
    </div>
  );
}

WaveCanvas.propTypes = {
  drawFunc: PropTypes.func.isRequired,
};
export default WaveCanvas;
