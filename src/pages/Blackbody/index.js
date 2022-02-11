import React, { useState } from "react";

function Blackbody() {
  const [temperature, setTemperature] = useState(3000);

  function handleSliderChanged(e) {
    setTemperature(Number(e.target.value));
  }
  return (
    <div>
      <h1>Blackbody Radiation</h1>
      <div className="temperatureInput">
        <h2>Temperature</h2>
        <input
          type="range"
          name="temperature"
          min="0"
          max="10000"
          step="50"
          value={temperature}
          onChange={handleSliderChanged}
        />
        <h1>{temperature}</h1>
      </div>
    </div>
  );
}

export default Blackbody;
