import React, { useRef, useState } from "react";
import useAnimationFrame from "./../../useAnimation";

const getElementPosition = (e) => {
  const target = e.target;
  const x = window.scrollX+e.clientX-target.offsetLeft;
  const y = window.scrollY+e.clientY-target.offsetTop;
  return [x,y];
};

/*
const normalizePoints = (points,width,height)=>{
  for(){

  }
};*/

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


  //local temporary parameters
  const drawingCache = {
    down:false,
    coords:[],
    reset:function(){
      this.down = false;
      this.coords = [];
    }
  }
  


  return <canvas width="640" height="480" ref={cvs} 
  onMouseDown={
    (e)=>{
      //if()
      const [x,y] = getElementPosition(e);
      drawingCache.reset();
      drawingCache.coords.push([x,y]);
    }
  }

  onMouseMove={
    (e)=>{
      const [x,y] = getElementPosition(e);
      drawingCache.coords.push([x,y]);
      drawingCache.coords.push([x,y]);
    }
  }

  onMouseUp={
    (e)=>{
      const [x,y] = getElementPosition(e);
      drawingCache.coords.push([x,y]);
      console.log(drawingCache.coords);
      //get the result
      //interpolate missing points
      //and normalize the result in the range of 0-1
      //const points = normalizePoints(drawingCache[coords],widht,height);
    }
  }
  
  ></canvas>;
};

const [pos, setPos] = useState({ x: 0, y: 0 });



const FourierAnalysis = () => {
  return <div>
    <h1>Fourier Analysis</h1>
    <WaveCanvas />
    <style>{`
      .title {
        color: red;
      }
      .hide {
        display: none;
      }
      `}</style>
  </div>;
};

export default FourierAnalysis;
