import React, { useRef, useState } from "react";
import useAnimationFrame from "../../useAnimation";

class Rect {
  constructor(x, y, w = 50, h = 50) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx) {
    // adjust position as a center top of rectangle
    ctx.strokeRect(this.x - 0.5 * this.w, this.y, this.w, this.h);
  }
}

class Splitter extends Rect {
  constructor(x, y, angle = 0) {
    super(x, y);
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    this.w = 50;
    this.h = 5;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.radian);
    // adjust position as a center top of rectangle
    ctx.strokeRect(-0.5 * this.w, -3 * this.h, this.w, 3 * this.h);
    ctx.fillRect(-0.5 * this.w, 0, this.w, this.h);
    ctx.restore();
  }
}
class Mirror extends Rect {
  constructor(x, y, angle = 0) {
    super(x, y);
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    this.w = 50;
    this.h = 5;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.radian);
    // adjust position as a center top of rectangle
    ctx.strokeRect(-0.5 * this.w, -this.h, this.w, this.h);
    ctx.fillRect(-0.5 * this.w, 0, this.w, 2 * this.h);
    ctx.restore();
  }
}

const source = new Rect(50, 450);

const splitter1 = new Splitter(50, 350, 135);
const splitter2 = new Splitter(250, 150, 135);

const mirror1 = new Mirror(50, 150, 135);
const mirror2 = new Mirror(250, 350, -45);

function MachZehnderCanvas({ size: [width, height], refractionIndex }) {
  const cvs = useRef(null);

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // show objects
    source.draw(ctx);
    splitter1.draw(ctx);
    splitter2.draw(ctx);

    mirror1.draw(ctx);
    mirror2.draw(ctx);

    // show wave propagation
    // wave properties
    const amp = 2; // amplitude
    const k = 0.2; // wave number
    const lbw = 2; // light beam width

    // from light source to splitter 1
    for (let _y = splitter1.y; _y < source.y; _y++) {
      ctx.fillRect(amp * Math.sin(k * _y * refractionIndex) + source.x, _y, lbw, lbw);
    }
    // x-axis waves
    for (let _x = mirror1.x; _x < mirror2.x; _x++) {
      ctx.fillRect(_x, amp * Math.sin(k * _x * refractionIndex) + splitter1.y, lbw, lbw);
      ctx.fillRect(_x, amp * Math.sin(k * _x * refractionIndex) + splitter2.y, lbw, lbw);
    }
    // x-axis: splitter to detector
    for (let _x = splitter2.x; _x < 350; _x++) {
      ctx.fillRect(_x, amp * Math.sin(k * _x * refractionIndex) + splitter2.y, lbw, lbw);
    }
    // y-axis waves
    for (let _y = splitter2.y; _y < splitter1.y; _y++) {
      ctx.fillRect(amp * Math.sin(k * _y * refractionIndex) + splitter1.x, _y, lbw, lbw);
      ctx.fillRect(amp * Math.sin(k * _y * refractionIndex) + splitter2.x, _y, lbw, lbw);
    }
    // y-axis waves: splitter to detector
    for (let _y = 50; _y < splitter2.y; _y++) {
      ctx.fillRect(amp * Math.sin(k * _y * refractionIndex) + splitter2.x, _y, lbw, lbw);
    }
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
