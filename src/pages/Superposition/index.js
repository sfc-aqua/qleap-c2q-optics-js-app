import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import WaveCanvas from "./WaveCanvas";
import WaveControl from "./WaveControl";
import WAVE_PRESETS from "./wavePresets";
import { useWaves, useOriginalWave } from "./hooks";
import { drawWaves, drawOriginalWave } from "./render";
import fourierTransform from "./fourierTransform";
import WavePresetSelector from "./WavePresetSelector";
import { GRID_SIZE, NUM_WAVES, MODE } from "./constants";

function Superposition() {
  const [waves, setWaveByIndex] = useWaves(NUM_WAVES);
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
      setWaveByIndex(i)(
        "amplitude",
        Math.abs(amplitude) < 0.0001 ? 0 : amplitude,
      );
      setWaveByIndex(i)("phase", phase);
      setWaveByIndex(i)("k", k);
      setWaveByIndex(i)("omega", k);
      setWaveByIndex(i)("visible", Math.abs(amplitude) > 0.0001);
    });
  };

  const onWavePresetChange = ({ target: { value: presetName } }) => {
    onOriginalWaveChanged(presetName);
  };

  const onModeChange = ({ target: { value: nextMode } }) => {
    setMode(nextMode);
    if (nextMode === MODE.DECONSTRUCTION) {
      waves.forEach((_wave, i) => {
        setWaveByIndex(i)("visible", true);
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
          <WavePresetSelector onChange={onWavePresetChange} />
        )}
      </div>
      <div className="waves-wrapper">
        {Object.keys(waves).map((i) => (
          <WaveControl
            key={waves[i].name}
            waveInfo={waves[i]}
            setWaveInfo={setWaveByIndex(i)}
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
