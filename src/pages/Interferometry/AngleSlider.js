import React from "react";

function AngleSlider({ angle, onChange }) {
  return (
    <div>
      0
      <input
        type="range"
        name="reflective index"
        min="0"
        max="2"
        step="0.1"
        value={angle}
        onChange={onChange}
        list="tickmarks"
      />
      2π
      <datalist id="tickmarks">
        <option value="0" label="0" />
        <option value="0.5" label="π/2" />
        <option value="1" label="π" />
        <option value="1.5" label="3π/2" />
        <option value="2" label="2π" />
      </datalist>
    </div>
  );
}

export default AngleSlider;
