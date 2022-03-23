import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";

function Interferometry() {
  const [angle, setAngle] = useState(0);
  const handleSliderChange = (e) => {
    setAngle(Number(e.target.value));
  };
  const [showSample, setShowSample] = useState(false);
  const handleShowSample = () => {
    setShowSample(!showSample);
  };
  const [fire, setFire] = useState(false);
  const setFirePhoton = () => {
    setFire(!fire);
  };
  const [shots, setShots] = useState(1);
  const handleNumberOfShots = (e) => {
    setShots(Number(e.target.value));
  };
  const radian = angle * 0.1;
  return (
    <div>
      <h1>Interferometry</h1>
      <div className="refractionInput" />
      <MachZehnderCanvas
        size={{ width: 1400, height: 600 }}
        photonFire={fire}
        setFirePhoton={setFirePhoton}
        shots={shots}
        angle={angle}
        showSample={showSample}
      />
      <button type="button" onClick={setFirePhoton}>Fire</button>
      <button type="button" onClick={handleShowSample}>Show Sample</button>
      <AngleSlider angle={angle} onChange={handleSliderChange} />
      {radian.toFixed(1)}
      π
      <div>
        <select onChange={handleNumberOfShots}>
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
        </select>
        {shots}
      </div>
    </div>
  );
}

export default Interferometry;
