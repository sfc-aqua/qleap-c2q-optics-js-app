import React, { useRef, useState } from "react";
import useAnimationFrame from "../../useAnimation";

class Rect {
  constructor(x,y,w=50,h=50) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(ctx) {
    // adjust position as a center point of rectangle
    ctx.strokeRect(this.x-this.w/2, this.y, this.w, this.h);
  }
}

class Splitter extends Rect {
  constructor(x,y, angle=0){
    super(x,y);
    this.angle = angle;
    this.w = 50; 
    this.h = 5;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x ,this.y);
    ctx.rotate(this.angle * Math.PI/180);
    // adjust position as a center top of rectangle
    ctx.strokeRect(-this.w/2, -3*this.h, this.w, 3*this.h);
    ctx.fillRect(-this.w/2, 0, this.w, this.h);
    ctx.restore();
  }
}
class Mirror extends Rect {
  constructor(x,y, angle=0){
    super(x,y);
    this.angle = angle;
    this.w = 50; 
    this.h = 5;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x ,this.y);
    ctx.rotate(this.angle * Math.PI/180);
    // adjust position as a center top of rectangle
    ctx.strokeRect(-this.w/2, -this.h, this.w, this.h);
    ctx.fillRect(-this.w/2, 0, this.w, 2*this.h);
    ctx.restore();
  }
}

source = new Rect(50,450);

splitter1 = new Splitter(50,350, 135);
splitter2 = new Splitter(250,150, 135);

mirror1 = new Mirror(50,150, 135);
mirror2 = new Mirror(250,350, -45);

// detector1 = new Detector(250, 100);
// detector2 = new Detector();

function MachZehnderCanvas({size: [width, height], refractionIndex}) {
  const cvs = useRef(null);

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const {height, width} = cvs.current;
    const ctx = cvs.current.getContext("2d");
    
    ctx.clearRect(0, 0, width, height);
    source.draw(ctx);
    splitter1.draw(ctx);
    splitter2.draw(ctx);

    mirror1.draw(ctx);
    mirror2.draw(ctx);

    // continuos wave from light source to splitter 1
    for (y = splitter1.y; y < source.y; y++) {
      ctx.fillRect(5*Math.sin(y * 0.2 * refractionIndex) + source.x, y, 2, 2);
    }
    // splitter 1 to mirror 1
    for (x = mirror1.x; x < mirror2.x; x++) {
      ctx.fillRect(x, 5*Math.sin(x * 0.2 * refractionIndex) + splitter1.y, 2, 2);
      ctx.fillRect(x, 5*Math.sin(x * 0.2 * refractionIndex) + splitter2.y, 2, 2);
    }
    for (y = splitter2.y; y < splitter1.y; y++) {
      ctx.fillRect(5*Math.sin(y * 0.2 * refractionIndex) + splitter1.x, y, 2, 2);
      ctx.fillRect(5*Math.sin(y * 0.2 * refractionIndex) + splitter2.x, y, 2, 2);
    }
  });
  return <canvas width={width} height={height} ref={cvs} style={{border: "solid 1px red"}} />
}

function Interferometry() {
  const [refractionIndex, setRefractionIndex] = useState(1);

  function handleSliderChange(e) {
    setRefractionIndex(e.target.value);
  }
  return (
    <div>
      <h1>Interferometry</h1>
      <div className="refractionInput">
        <h2>Refraction index</h2>
        <input
          type="range"
          name="reflective index"
          min="1"
          max="2.5"
          step="0.1"
          value={refractionIndex}
          onChange={handleSliderChange}
        />
        <h1>{refractionIndex}</h1>
      </div>
      <MachZehnderCanvas size={[500, 500]} refractionIndex={refractionIndex} />
    </div>
  );
}

export default Interferometry;
