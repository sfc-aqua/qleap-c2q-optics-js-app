import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import WaveCanvas from "./WaveCanvas";
import WaveControl from "./WaveControl";

const NUM_WAVES = 5;
const WAVE_PRESETS = {
  Triangle: (width) => {
    const points = [];
    const n = 1; // number of periods
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(Math.abs(((r * n) % 1) * 2 - 1) * 2 - 1);
    }
    return points;
  },
  Square: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(((r * 4) % 1) * 2 - 1);
    }
    return points;
  },
  Step: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(r < 0.5 ? 1 : -1);
    }
    return points;
  },
  Cosine: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(Math.cos(r * 2 * Math.PI));
    }
    return points;
  },
  Sine: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(Math.sin(r * 2 * Math.PI));
    }
    return points;
  },
};

// for the wave that will be deconstructed
const useOriginalWave = () => {
  const [waveInfo, setWaveInfo] = useState({
    name: Object.keys(WAVE_PRESETS)[0],
    points: [],
    visible: true,
    color: "black",
  });
  return [waveInfo, setWaveInfo];
};

const useWaves = (numWaves) => {
  const [waves, setWaves] = useState(
    Array(numWaves)
      .fill()
      .map((_, i) => ({
        name: `wave ${i}`,
        k: 1,
        omega: 1,
        amplitude: i * 0.25 + 0.375,
        phase: 0,
        visible: [0, 1].includes(i),
        color: `hsl(${(i * 270) / numWaves}, 100%, 50%)`,
        selected: false,
      })),
  );
  const setter = (i) => (key, value) => {
    setWaves((prevWaves) => update(prevWaves, { [i]: { [key]: { $set: value } } }));
  };
  return [waves, setter];
};

const MODE = {
  SUPERPOSITION: "SUPERPOSITION",
  DECONSTRUCTION: "DECONSTRUCTION",
};

const drawWaves = (ctx, waves, width, t, showEachWave) => {
  const composites = Array(width).fill(0);

  for (let i = 0; i < NUM_WAVES; i++) {
    const {
      k, amplitude, phase, omega, visible, color, selected,
    } = waves[i];

    ctx.beginPath();
    ctx.lineWidth = selected ? 4 : 1;
    for (let x = 0; x < width; x++) {
      if (visible) {
        const y = Math.cos(k * x * 0.005 * Math.PI - omega * t * 0.01 + phase * 1)
          * amplitude
          * 100;
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        composites[x] += y;
      }
    }
    if (showEachWave) {
      ctx.stroke();
    }
  }

  ctx.strokeStyle = "black";
  ctx.beginPath();

  for (let x = 0; x < width; x++) {
    ctx.lineTo(x, composites[x]);
  }
  ctx.stroke();
};

const drawOriginalWave = (ctx, points, width) => {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < width; i++) {
    ctx.lineTo(i, points[i % points.length] * 100);
  }
  ctx.stroke();
};

const fourierTransform = (numWaves, points) => {
  function toPolar([x, y]) {
    const angle = Math.atan2(y, x);
    const r = Math.sqrt(x * x + y * y);
    return [r, angle]; // amplitude, phase
  }

  function complexMultiply([r1, i1], [r2, i2]) {
    return [r1 * r2 - i1 * i2, r1 * i2 + r2 * i1];
  }

  // term: int
  const width = points.length;
  const harmonics = [];
  for (let term = 0; term < 30; term++) {
    const sum = [0, 0];
    for (let i = 0; i < width; i++) {
      const t = i / width; // 0 <= t < 1
      // coef is a complex number e^(-term2πit)
      const coef = [
        Math.cos(-term * t * 2 * Math.PI),
        Math.sin(-term * t * 2 * Math.PI),
      ];
      const [r1, i1] = complexMultiply([points[i] * 2, 0], coef);
      sum[0] += r1;
      sum[1] += i1;
    }
    const avg = [sum[0] / width, sum[1] / width];
    const [amplitude, phase] = toPolar(avg); // polar coordinates for easy processing with sin cos
    harmonics.push({ amplitude, phase, k: term + 0 });
  }
  harmonics.sort((a, b) => Math.abs(b.amplitude) - Math.abs(a.amplitude));
  return harmonics.slice(0, numWaves);
};

function Superposition() {
  const [waves, setWave] = useWaves(NUM_WAVES);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState(MODE.SUPERPOSITION);
  const [originalWave, setOriginalWave] = useOriginalWave();

  const drawSuperpositionWave = useCallback(
    (ctx, timestamp) => {
      const t = playing ? timestamp : 0;
      const { width } = ctx.canvas;
      drawWaves(ctx, waves, width, t, mode === MODE.SUPERPOSITION);
      if (mode === MODE.DECONSTRUCTION) {
        drawOriginalWave(ctx, originalWave.points, width);
      }
    },
    [playing, waves, originalWave, mode],
  );

  const onOriginalWaveChanged = (presetName) => {
    const preset = WAVE_PRESETS[presetName];
    const points = preset(400);
    const harmonics = fourierTransform(NUM_WAVES, points);
    setOriginalWave((prev) => update(prev, { points: { $set: points } }));
    harmonics.forEach(({ amplitude, phase, k }, i) => {
      setWave(i)("amplitude", Math.abs(amplitude) < 0.0001 ? 0 : amplitude);
      setWave(i)("phase", phase);
      setWave(i)("k", k);
      setWave(i)("omega", k);
      setWave(i)("visible", Math.abs(amplitude) > 0.0001);
    });
  };

  const onWavePresetChange = ({ target: { value: presetName } }) => {
    onOriginalWaveChanged(presetName);
  };

  const onModeChange = ({ target: { value: nextMode } }) => {
    setMode(nextMode);
    if (nextMode === MODE.DECONSTRUCTION) {
      waves.forEach((_wave, i) => {
        setWave(i)("visible", true);
      });
      onOriginalWaveChanged(originalWave.name);
    }
  };

  return (
    <div>
      <h1>Superposition of Traveling Waves</h1>
      <WaveCanvas drawFunc={drawSuperpositionWave} />
      <div>
        <button type="button" onClick={() => setPlaying(!playing)}>
          {playing ? "pause" : "play"}
        </button>
        <select onChange={onModeChange} defaultValue={mode}>
          <option value={MODE.SUPERPOSITION}>Superposition</option>
          <option value={MODE.DECONSTRUCTION}>Deconstruction</option>
        </select>
        {mode === MODE.DECONSTRUCTION && (
          <select onChange={onWavePresetChange} defaultValue="Triangle">
            {Object.keys(WAVE_PRESETS).map((presetName) => (
              <option key={presetName} value={presetName}>
                {presetName}
              </option>
            ))}
          </select>
        )}
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
