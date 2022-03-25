import React, { useState } from "react";
import WaveCanvas from "./WaveCanvas";
import WaveControl from "./WaveControl";

const NUM_WAVES = 5;

const useWave = (i) => {
  const [info, setInfo] = useState({
    name: `wave ${i}`,
    k: 0.01,
    omega: 1,
    amplitude: i * 0.2 + 0.5,
    phase: 0.1,
    visible: [1, 2].includes(i),
    color: `hsl(${(i * 360) / NUM_WAVES}, 100%, 50%)`,
    selected: false,
  });
  const setter = (key, value) => {
    setInfo({ ...info, [key]: value });
  };
  return [info, setter];
};

function Superposition() {
  const waves = [useWave(1), useWave(2), useWave(3), useWave(4), useWave(5)];

  const drawWave = (ctx, t) => {
    const { width } = ctx.canvas;
    const composites = Array(width).fill(0);
    for (let i = 0; i < waves.length; i++) {
      const {
        k, amplitude, phase, omega, visible, color, selected,
      } = waves[i][0];

      ctx.beginPath();
      ctx.lineWidth = selected ? 4 : 1;
      for (let x = 0; x < width; x++) {
        if (visible) {
          ctx.strokeStyle = color;
          const y = Math.cos(k * x - omega * t * 0.005 + phase) * amplitude * 90;

          ctx.lineTo(x, y);
          composites[x] += y;
        }
      }

      ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      ctx.lineTo(x, composites[x]);
    }
    ctx.stroke();
  };

  return (
    <div>
      <h1>Superposition of Traveling Waves</h1>
      <WaveCanvas drawFunc={drawWave} />
      <div className="waves-wrapper">
        {waves.map(([info, setWaveInfo]) => (
          <WaveControl key={info.name} waveInfo={info} setWaveInfo={setWaveInfo} />
        ))}
      </div>
      <style>
        {`
      .waves-wrapper {
        display: flex;
      }
      `}
      </style>
    </div>
  );
}

export default Superposition;
