import React, { useRef, useState } from "react";
import useAnimationFrame from "./../../useAnimation";
import WaveForm from "./waveForm";
import WaveSelector from "./WaveSelector";
import WaveCanvas from "./WaveCanvas";
import {PRESETS, MODE} from "./constants";
import Toggle from "./Toggle";

const INITIAL_WAVE_FORM_NAME = Object.keys(PRESETS)[0];

const FourierAnalysis = () => {
  const [mode, setMode] = useState(MODE.VIEW);
  // class that manages an array of harmonics, as well as
  // the constructed main wave
  const [waveForm, setWaveForm] = useState(new WaveForm(PRESETS[INITIAL_WAVE_FORM_NAME]()));
  const [size, setSize] = useState([640, 400]);
  return <div>
    <h1>Fourier Analysis</h1>
    <div>
      mode: {mode}
      <Toggle onModeChanged={(isViewMode) => setMode(isViewMode ? MODE.VIEW : MODE.EDIT)} />
    </div>
    <WaveSelector options={PRESETS} setWaveForm={setWaveForm} />
    <WaveCanvas mode={mode} waveForm={waveForm} size={size} />
  </div>;
};

export default FourierAnalysis;
