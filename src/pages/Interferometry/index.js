import React, { useRef, useState } from "react";
import useAnimationFrame from "../../useAnimation";

class DoubleRect {
  constructor(x, y, w = 50, h = 50, angle = 0, strokeRatio = 0, fillRatio = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.radian = this.angle * (Math.PI / 180);
    this.strokeRatio = strokeRatio;
    this.fillRatio = fillRatio;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.radian);
    // adjust position as a center top of filled rectangle
    ctx.strokeRect(
      -0.5 * this.w,
      this.h - this.fillRatio * this.h,
      this.w,
      -this.strokeRatio * this.h,
    );
    ctx.fillRect(-0.5 * this.w, 0, this.w, this.fillRatio * this.h);
    ctx.restore();
  }
}

const source = new DoubleRect(50, 450, 50, 50, 0, 0, 1);

const splitter1 = new DoubleRect(50, 350, 50, 10, 135, 2, 1);
const splitter2 = new DoubleRect(250, 150, 50, 10, 135, 2, 1);

const mirror1 = new DoubleRect(50, 150, 50, 10, 135, 1, 1);
const mirror2 = new DoubleRect(250, 350, 50, 10, -45, 1, 1);

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
    for (let posY = splitter1.y; posY < source.y; posY++) {
      ctx.fillRect(amp * Math.sin(k * posY * refractionIndex) + source.x, posY, lbw, lbw);
    }
    // x-axis waves
    for (let posX = mirror1.x; posX < mirror2.x; posX++) {
      ctx.fillRect(posX, amp * Math.sin(k * posX * refractionIndex) + splitter1.y, lbw, lbw);
      ctx.fillRect(posX, amp * Math.sin(k * posX * refractionIndex) + splitter2.y, lbw, lbw);
    }
    // x-axis: splitter to detector
    for (let posX = splitter2.x; posX < 350; posX++) {
      ctx.fillRect(posX, amp * Math.sin(k * posX * refractionIndex) + splitter2.y, lbw, lbw);
    }
    // y-axis waves
    for (let posY = splitter2.y; posY < splitter1.y; posY++) {
      ctx.fillRect(amp * Math.sin(k * posY * refractionIndex) + splitter1.x, posY, lbw, lbw);
      ctx.fillRect(amp * Math.sin(k * posY * refractionIndex) + splitter2.x, posY, lbw, lbw);
    }
    // y-axis waves: splitter to detector
    for (let posY = 50; posY < splitter2.y; posY++) {
      ctx.fillRect(amp * Math.sin(k * posY * refractionIndex) + splitter2.x, posY, lbw, lbw);
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
