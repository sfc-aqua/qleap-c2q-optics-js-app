import React,{useRef, useEffect} from "react";

const WaveCanvas = () => {
  const cvs = useRef(null);
  useEffect(() => {
    const ctx = cvs.current.getContext("2d");
    ctx.rect(0,0,40,40);
    ctx.fill();
  }, [cvs]);

  return <canvas width="640" height="480" ref={cvs}></canvas>;
};

export default WaveCanvas;
