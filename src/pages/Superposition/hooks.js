import update from "immutability-helper";
import { useState } from "react";
import WAVE_PRESETS from "./wavePresets";

// for the wave that will be deconstructed
export const useOriginalWave = () => {
  const [waveInfo, setWaveInfo] = useState({
    name: Object.keys(WAVE_PRESETS)[0],
    points: [],
    visible: true,
    color: "black",
  });
  return [waveInfo, setWaveInfo];
};

export const useWaves = (numWaves) => {
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
