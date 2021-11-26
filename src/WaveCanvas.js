import React, { useRef, useState } from "react";
import useAnimationFrame from "./useAnimation";

const WaveCanvas = () => {
  const cvs = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, cvs.current.width, cvs.current.height);
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, 40, 40);
    ctx.closePath();
    ctx.fill();
    setPos(prev => ({ x: prev.x + 1, y: prev.y + 1 }));
  });

  return <canvas width="640" height="480" ref={cvs}></canvas>;
};

export default WaveCanvas;
