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
      0,
      this.w,
      -this.strokeRatio * this.h,
    );
    ctx.fillRect(
      -0.5 * this.w,
      0,
      this.w,
      this.fillRatio * this.h,
    );
    ctx.restore();
  }
}

const source = new DoubleRect(50, 450, 50, 50, 0, 0, 1);

const splitter1 = new DoubleRect(50, 350, 50, 5, 135, 2, 1);
const splitter2 = new DoubleRect(250, 150, 50, 5, 135, 2, 1);

const mirror1 = new DoubleRect(50, 150, 50, 5, 135, 1, 2);
const mirror2 = new DoubleRect(250, 350, 50, 5, -45, 1, 2);

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
    const amplitude = 2;
    const waveNumberK = 0.2;
    const lightBeamWidht = 2;

    // from light source to splitter 1
    for (let posY = splitter1.y; posY < source.y; posY++) {
      ctx.fillRect(
        amplitude * Math.sin(waveNumberK * posY * refractionIndex) + source.x,
        posY,
        lightBeamWidht,
        lightBeamWidht,
      );
    }
    // x-axis waves
    for (let posX = mirror1.x; posX < mirror2.x; posX++) {
      ctx.fillRect(
        posX,
        amplitude * Math.sin(waveNumberK * posX * refractionIndex) + splitter1.y,
        lightBeamWidht,
        lightBeamWidht,
      );
      ctx.fillRect(
        posX,
        amplitude * Math.sin(waveNumberK * posX * refractionIndex) + splitter2.y,
        lightBeamWidht,
        lightBeamWidht,
      );
    }
    // x-axis: splitter to detector
    for (let posX = splitter2.x; posX < 350; posX++) {
      ctx.fillRect(
        posX,
        amplitude * Math.sin(waveNumberK * posX * refractionIndex) + splitter2.y,
        lightBeamWidht,
        lightBeamWidht,
      );
    }
    // y-axis waves
    for (let posY = splitter2.y; posY < splitter1.y; posY++) {
      ctx.fillRect(
        amplitude * Math.sin(waveNumberK * posY * refractionIndex) + splitter1.x,
        posY,
        lightBeamWidht,
        lightBeamWidht,
      );
      ctx.fillRect(
        amplitude * Math.sin(waveNumberK * posY * refractionIndex) + splitter2.x,
        posY,
        lightBeamWidht,
        lightBeamWidht,
      );
    }
    // y-axis waves: splitter to detector
    for (let posY = 50; posY < splitter2.y; posY++) {
      ctx.fillRect(
        amplitude * Math.sin(waveNumberK * posY * refractionIndex) + splitter2.x,
        posY,
        lightBeamWidht,
        lightBeamWidht,
      );
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
