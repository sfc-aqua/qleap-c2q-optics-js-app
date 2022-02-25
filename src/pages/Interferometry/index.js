import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";

function Interferometry() {
  const [angle, setAngle] = useState(0);
  function handleSliderChange(e) {
    setAngle(Number(e.target.value));
  }

  return (
    <div>
      <h1>Interferometry</h1>
      <div className="refractionInput">
        <h2>Refraction index</h2>
        <AngleSlider inputValue={angle} onChange={handleSliderChange} />
        <h1>{angle * Math.PI * 0.05}</h1>
      </div>
      <MachZehnderCanvas size={{ width: 800, height: 600 }} />
    </div>
  );
}

export default Interferometry;
