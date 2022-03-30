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
      if (mode === MODE.DECONSTRUCTION || mode === MODE.DRAWING) {
        drawOriginalWave(ctx, originalWave.points, width);
      }
    },
    [playing, waves, originalWave, mode],
  );

  const onOriginalWaveChanged = (points) => {
    const harmonics = fourierTransform(NUM_WAVES, points);
    setOriginalWave((prev) => update(prev, { points: { $set: points } }));
    harmonics.forEach(({ amplitude, phase, k }, i) => {
      setWaveByIndex(i)({
        phase,
        k,
        omega: k,
        amplitude: Math.abs(amplitude) < 0.0001 ? 0 : amplitude,
        visible: Math.abs(amplitude) > 0.0001,
      });
    });
  };

  const onWavePresetChange = ({ target: { value: presetName } }) => {
    const preset = WAVE_PRESETS[presetName];

    onOriginalWaveChanged(preset(GRID_SIZE * 4));
  };

  const onModeChange = ({ target: { value: nextMode } }) => {
    setMode(nextMode);
    if (nextMode === MODE.DECONSTRUCTION) {
      waves.forEach((_wave, i) => {
        setWaveByIndex(i)("visible", true);
      });
      const preset = WAVE_PRESETS[originalWave.name];
      onOriginalWaveChanged(preset(GRID_SIZE * 4));
    }
  };

  const onOriginalWaveDraw = (x, y, delta) => {
    setOriginalWave((prev) => {
      let specArg = [x, 1, y];
      if (delta > 0) {
        specArg = [x - 1, delta + 1].concat(Array(delta + 1).fill(y));
      } else if (delta < 0) {
        specArg = [x + delta - 1, -delta + 1].concat(Array(-delta + 1).fill(y));
      }
      return update(prev, {
        points: { $splice: [specArg] },
      });
    });
  };
  return (
    <div>
      <h1>Superposition of Traveling Waves</h1>
      <WaveCanvas
        drawFunc={drawSuperpositionWave}
        editable={mode === MODE.DRAWING}
        onDraw={onOriginalWaveDraw}
      />
      <div>
        <button type="button" onClick={() => setPlaying(!playing)}>
          {playing ? "pause" : "play"}
        </button>
        <select onChange={onModeChange} defaultValue={mode}>
          {Object.keys(MODE).map((key) => (
            <option key={key} value={MODE[key]}>
              {MODE[key]}
            </option>
          ))}
        </select>
        {mode === MODE.DECONSTRUCTION && (
          <WavePresetSelector onChange={onWavePresetChange} />
        )}
        {mode === MODE.DRAWING && <button type="button" onClick={() => onOriginalWaveChanged(originalWave.points)}>fourier transform</button>}
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
