import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import WaveCanvas from "./WaveCanvas";
import WaveControl from "./WaveControl";

const NUM_WAVES = 5;

const useWaves = (numWaves) => {
  const [waves, setWaves] = useState(
    Array(numWaves)
      .fill()
      .map((_, i) => ({
        name: `wave ${i}`,
        k: 0.01,
        omega: 1,
        amplitude: i * 0.2 + 0.5,
        phase: 0,
        visible: [0, 1].includes(i),
        color: `hsl(${(i * 360) / numWaves}, 100%, 50%)`,
        selected: false,
      })),
  );
  const setter = (i) => (key, value) => {
    setWaves((prevWaves) => ({
      ...prevWaves,
      [i]: { ...prevWaves[i], [key]: value },
    }));
    setWaves((prevWaves) => update(prevWaves, { [i]: { [key]: { $set: value } } }));
  };
  return [waves, setter];
};

const MODE = {
  SUPERPOSITION: "SUPERPOSITION",
  DECONSTRUCTION: "DECONSTRUCTION",
};

function Superposition() {
  const [waves, setWave] = useWaves(NUM_WAVES);
  const [playing, setPlaying] = useState(true);
  const [mode, setMode] = useState(MODE.SUPERPOSITION);

  const drawSuperpositionWave = useCallback(
    (ctx, timestamp) => {
      const t = playing ? timestamp : 0;
      const { width } = ctx.canvas;
      const composites = Array(width).fill(0);
      for (let i = 0; i < NUM_WAVES; i++) {
        const {
          k, amplitude, phase, omega, visible, color, selected,
        } = waves[i];

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
    },
    [playing, waves],
  );

  return (
    <div>
      <h1>Superposition of Traveling Waves</h1>
      <WaveCanvas drawFunc={drawSuperpositionWave} />
      <div>
        <button type="button" onClick={() => setPlaying(!playing)}>
          {playing ? "pause" : "play"}
        </button>
        <select onChange={(e) => setMode(e.target.value)} defaultValue={mode}>
          <option value={MODE.SUPERPOSITION}>Superposition</option>
          <option value={MODE.DECONSTRUCTION}>Deconstruction</option>
        </select>
      </div>
      <div className="waves-wrapper">
        {Object.keys(waves).map((i) => (
          <WaveControl
            key={waves[i].name}
            waveInfo={waves[i]}
            setWaveInfo={setWave(i)}
          />
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
