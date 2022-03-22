import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";

function Interferometry() {
  const [angle, setAngle] = useState(0);
  const handleSliderChange = (e) => {
    setAngle(Number(e.target.value));
  };
  const [fire, setFire] = useState(false);
  const firePhoton = () => {
    setFire(!fire);
  };

  return (
    <div>
      <h1>Interferometry</h1>
      <div className="refractionInput">
        <h2>Refraction index</h2>
        <AngleSlider angle={angle} onChange={handleSliderChange} />
        <h1>{angle * Math.PI * 0.05}</h1>
      </div>
      <MachZehnderCanvas size={{ width: 800, height: 600 }} photonFire={fire} />
      <button type="button" onClick={firePhoton}>Fire</button>
    </div>
  );
}

export default Interferometry;
