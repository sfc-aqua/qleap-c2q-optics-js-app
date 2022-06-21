import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";
import bs1Img from "./BS1.png";
import bs2Img from "./BS2.png";
import sampleImg from "./sampleImg.png";
import statevectorLeft from "./statevector_left.png";
import statevectorMiddle from "./statevector_middle.png";
import statevectorRight from "./statevector_right.png";

function Interferometry() {
  // handler for fire photon
  const [fire, setFire] = useState(false);
  const [countStatus, setCountStatus] = useState("empty");
  const setFirePhoton = () => {
    setFire(!fire);
    setCountStatus("counted");
  };

  // handler for reset counts distribution status
  const [resetCounts, setResetCounts] = useState(false);
  const handleResetCounts = () => {
    setResetCounts(true);
    setFire(false);
  };

  // user input for phase angle
  const [angle, setAngle] = useState(0);
  const handleSliderChange = (e) => {
    setAngle(Number(e.target.value));
    setResetCounts(true);
    setFire(false);
  };

  // user input for number of photon shots
  const [shots, setShots] = useState(1);
  const handleNumberOfShots = (e) => {
    setShots(Number(e.target.value));
    setFire(false);
  };

  const [showOperators, setShowOperators] = useState(false);
  const handleShowOperators = () => setShowOperators(!showOperators);
  const [showStateVectors, setShowStateVectors] = useState(false);
  const handleShowStateVectors = () => setShowStateVectors(!showStateVectors);

  const radian = angle * 0.1;
  return (
    <div>
      <h1>Interferometry</h1>
      <div className="refractionInput" />
      <div className="canvas-wrapper">
        <MachZehnderCanvas
          size={{ width: 1400, height: 600 }}
          photonFire={fire}
          setFirePhoton={setFirePhoton}
          shots={shots}
          angle={angle}
          setCountStatus={setCountStatus}
          resetCounts={resetCounts}
          setResetCounts={setResetCounts}
          showOperators={showOperators}
          showStateVectors={showStateVectors}
        />
        <div className="display-png">
          <img
            src={bs1Img}
            alt="Operator of BS1"
            style={{
              position: "absolute", top: 140, left: 210, display: showOperators ? "" : "none",
            }}
            height="60"
          />
          <img
            src={bs2Img}
            alt="Operator of BS2"
            style={{
              position: "absolute", top: 140, left: 610, display: showOperators ? "" : "none",
            }}
            height="60"
          />
          <img
            src={sampleImg}
            alt="Operator of Sample"
            style={{
              position: "absolute", top: 500, left: 200, display: showOperators ? "" : "none",
            }}
            height="60"
          />
          <img
            src={statevectorLeft}
            alt="Initial State vector"
            style={{
              position: "absolute", top: 260, left: 100, display: showStateVectors ? "" : "none",
            }}
            height="80"
          />
          <img
            src={statevectorMiddle}
            alt="state vector after BS0"
            style={{
              position: "absolute", top: 260, left: 400, display: showStateVectors ? "" : "none",
            }}
            height="80"
          />
          <img
            src={statevectorRight}
            alt="state vector after BS1"
            sizes="100px"
            style={{
              position: "absolute", top: 260, left: 800, display: showStateVectors ? "" : "none",
            }}
            height="80"
          />
        </div>
      </div>

      <div className="control-plane">
        <button
          type="button"
          disabled={countStatus !== "empty"}
          onClick={setFirePhoton}
        >
          Fire
        </button>
        <button
          type="button"
          disabled={countStatus === "empty"}
          onClick={handleResetCounts}
        >
          Reset counts
        </button>
        <button
          type="button"
          onClick={handleShowOperators}
        >
          {showOperators ? "Hide" : "Show"}
          {" "}
          Operators
        </button>
        <button
          type="button"
          onClick={handleShowStateVectors}
        >
          {showStateVectors ? "Hide" : "Show"}
          {" "}
          State vectors
        </button>
        <div>
          <AngleSlider angle={angle} onChange={handleSliderChange} />
          {radian.toFixed(1)}
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
      <style jsx>
        {`
          .canvas-wrapper {
            position: relative;
          }
        `}
      </style>
    </div>
  );
}

export default Interferometry;
