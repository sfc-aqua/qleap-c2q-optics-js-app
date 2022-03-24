import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";

function Interferometry() {
  // user input for phase angle
  const [angle, setAngle] = useState(0);
  const handleSliderChange = (e) => {
    setAngle(Number(e.target.value));
    setResetCounts(true);
    setFire(false);
  };

  // show sample
  const [showSample, setShowSample] = useState(false);
  const handleShowSample = () => {
    setShowSample(!showSample);
    setResetCounts(true);
    setFire(false);
  };

  // handler for fire photon
  const [fire, setFire] = useState(false);
  const [countStatus, setCountStatus] = useState("empty");
  const setFirePhoton = () => {
    setFire(!fire);
    setCountStatus("counted");
  };

  // user input for number of photon shots
  const [shots, setShots] = useState(1);
  const handleNumberOfShots = (e) => {
    setShots(Number(e.target.value));
    setFire(false);
  };

  //
  const [resetCounts, setResetCounts] = useState(false);
  const handleResetCounts = () => {
    setResetCounts(true);
    setFire(false);
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
        setCountStatus={setCountStatus}
        resetCounts={resetCounts}
        setResetCounts={setResetCounts}
      />
      <div>
        <button type="button" disabled={countStatus !== "empty"} onClick={setFirePhoton}>Fire</button>
        <button type="button" disabled={countStatus === "empty"} onClick={handleResetCounts}>Reset counts</button>
        <div>
          <button type="button" onClick={handleShowSample}>Show Sample</button>
          <AngleSlider angle={angle} onChange={handleSliderChange} />
          {radian.toFixed(1)}
          π
        </div>
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
    </div>
  );
}

export default Interferometry;
