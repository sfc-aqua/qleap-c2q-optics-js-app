import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";
import { GRID_SIZE } from "./constants";

const drawGrid = (ctx, width, height) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  for (let i = 0; i < width; i += GRID_SIZE) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
  }
  for (let i = 0; i < height; i += GRID_SIZE) {
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
  ctx.moveTo(GRID_SIZE * 2, 0);
  ctx.lineTo(GRID_SIZE * 2, height);
  ctx.stroke();

  // x axis
  ctx.beginPath();
  ctx.moveTo(0, GRID_SIZE * 3);
  ctx.lineTo(width, GRID_SIZE * 3);
  ctx.stroke();

  ctx.font = "24px serif";
  ctx.fillText("O", GRID_SIZE * 2 + 6, GRID_SIZE * 3 + 24);
};

function WaveCanvas({ drawFunc, editable, onDraw }) {
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
    ctx.translate(GRID_SIZE * 2, GRID_SIZE * 3);
    drawFunc(ctx, timestamp / 3);
    ctx.restore();
  });

  useEffect(() => {
    if (!wrapper.current) return;
    const elem = wrapper.current;
    setSize({ width: elem.clientWidth, height: elem.clientHeight });
  }, [wrapper]);

  const onCanvasDraw = ({ buttons, movementX, nativeEvent: { offsetX, offsetY } }) => {
    if (
      !editable
      || !wrapper.current
      || buttons !== 1
      || offsetX <= GRID_SIZE * 2
      || offsetX > GRID_SIZE * 6
    ) {
      return;
    }
    const x = offsetX - GRID_SIZE * 2;
    const y = offsetY - GRID_SIZE * 3;
    onDraw(x, y / GRID_SIZE, movementX);
  };

  return (
    <div ref={wrapper}>
      <canvas
        width={size.width}
        height={size.height}
        ref={cvs}
        onMouseMove={onCanvasDraw}
      />
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

WaveCanvas.propTypes = {
  drawFunc: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  onDraw: PropTypes.func.isRequired,
};

export default WaveCanvas;
