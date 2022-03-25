import React, { useState } from "react";
import WaveCanvas from "./WaveCanvas";

function Superposition() {
  const [waveInfo, setWaveInfo] = useState({
    name: "",
    k: 0.01,
    omega: 0.01,
    amplitude: 100,
    phase: 0.1,
  });

  const drawWave = (ctx, t) => {
    const { width, height } = ctx.canvas;
    const {
      k, amplitude, phase, omega,
    } = waveInfo;

    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      ctx.lineTo(x, Math.cos(k * x - omega * t + phase) * amplitude);
    }
    ctx.stroke();
  };

  return (
    <div>
      <h1>Superposition of Traveling Waves</h1>
      <WaveCanvas drawFunc={drawWave} />
    </div>
  );
}

export default Superposition;
