import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";

function Interferometry() {
  const [angle, setAngle] = useState(0);
  const handleSliderChange = (e) => {
    setAngle(Number(e.target.value));
  };
  const [fire, setFire] = useState(false);
  const setFirePhoton = () => {
    setFire(!fire);
  };
  const [shots, setShots] = useState(1);
  const handleNumberOfShots = (e) => {
    setShots(Number(e.target.value));
  };

  return (
    <div>
      <h1>Interferometry</h1>
      <div className="refractionInput">
        <h2>Refraction index</h2>
        <AngleSlider angle={angle} onChange={handleSliderChange} />
        <h1>{angle * Math.PI * 0.05}</h1>
      </div>
      <MachZehnderCanvas
        size={{ width: 1400, height: 600 }}
        photonFire={fire}
        setFirePhoton={setFirePhoton}
        shots={shots}
      />
      <button type="button" onClick={setFirePhoton}>Fire</button>
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
