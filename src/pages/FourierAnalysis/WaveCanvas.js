import React, { useRef, useState } from "react";
import useAnimationFrame from "./../../useAnimation";

const WaveCanvas = ({ mode, waveForm, size: [width, height] }) => {
	const cvs = useRef(null);
  
	useAnimationFrame(() => {
	  if (!cvs.current) return;
	  const ctx = cvs.current.getContext("2d");
	  ctx.clearRect(0, 0, cvs.current.width, cvs.current.height);
	  ctx.beginPath();
	  const heights = waveForm.getHeights(width);
	  const waveHeight = 50;
	  const offset = 80;
	  for (let i = 0; i < width; i++) {
		ctx.lineTo(i, heights[i] * waveHeight + offset);
	  }
	  ctx.stroke();
	});
  
	return <canvas width={width} height={height} ref={cvs} ></canvas>;
  };
  
  export default WaveCanvas;