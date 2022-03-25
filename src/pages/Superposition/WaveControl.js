import React from "react";
import PropTypes from "prop-types";

function WaveControl({
  waveInfo: {
    name, k, omega, amplitude, visible,
  },
  setWaveInfo,
}) {
  const handleChange = (key) => (e) => setWaveInfo(key, +e.target.value);
  return (
    <div
      className="wrapper"
      onFocus={() => setWaveInfo("selected", true)}
      onMouseOver={() => setWaveInfo("selected", true)}
      onMouseMove={() => setWaveInfo("selected", true)}
      onMouseLeave={() => setWaveInfo("selected", false)}
    >
      <div>
        <input
          type="checkbox"
          defaultChecked={visible}
          onChange={(e) => setWaveInfo("visible", e.target.checked)}
        />
        {name}
      </div>
      <div>
        <label htmlFor="wave number k">
          k:
          {k}
        </label>
        <input
          disabled={!visible}
          type="range"
          onChange={handleChange("k")}
          min={0}
          max={Math.PI * 0.1}
          step={0.01}
          defaultValue={k}
        />
      </div>
      <div>
        <label htmlFor="omega">
          omega:
          {omega}
        </label>
        <input
          type="range"
          disabled={!visible}
          onChange={handleChange("omega")}
          min={-10}
          max={10}
          step={1}
          defaultValue={omega}
        />
      </div>
      <div>
        <label htmlFor="amplitude">
          amplitude:
          {amplitude}
        </label>
        <input
          type="range"
          disabled={!visible}
          onChange={handleChange("amplitude")}
          min={0}
          max={2}
          step={0.01}
          defaultValue={amplitude}
        />
      </div>
      <style jsx>
        {`
          label {
            width: 10rem;
            display: inline-block;
          }
          .wrapper {
            padding: 1rem;
          }
        `}
      </style>
    </div>
  );
}

WaveControl.propTypes = {
  waveInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    k: PropTypes.number.isRequired,
    omega: PropTypes.number.isRequired,
    amplitude: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  setWaveInfo: PropTypes.func.isRequired,
};

export default WaveControl;
