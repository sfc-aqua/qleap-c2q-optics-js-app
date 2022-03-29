import React from "react";
import PropTypes from "prop-types";
import WAVE_PRESETS from "./wavePresets";

function WavePresetSelector({ onChange }) {
  return (
    <select onChange={onChange} defaultValue="Triangle">
      {Object.keys(WAVE_PRESETS).map((presetName) => (
        <option key={presetName} value={presetName}>
          {presetName}
        </option>
      ))}
    </select>
  );
}

WavePresetSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default WavePresetSelector;
