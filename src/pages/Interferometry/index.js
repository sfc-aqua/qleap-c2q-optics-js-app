import React, { useState } from "react";
import MachZehnderCanvas from "./MachZehnderCanvas";
import InterferometryControl from "./InterferometryControl";
import ImageDisplay from "./ImageDisplay";
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
  };

  // user input for number of photon shots
  const [shots, setShots] = useState(1);
  const handleNumberOfShots = (e) => {
    setShots(Number(e.target.value));
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
      <div
        className="canvas-wrapper"
        style={{
          backgroundColor: "#3b5998",
        }}
      >
        <MachZehnderCanvas
          size={{ width: 1400, height: 600 }}
          photonFire={fire}
          setFirePhoton={setFirePhoton}
          shots={shots}
          angle={angle}
          setCountStatus={setCountStatus}
          resetCounts={resetCounts}
          setResetCounts={setResetCounts}
        />
        <div className="display-png">
          <ImageDisplay source={bs1Img} x={210} y={140} show={showOperators} />
          <ImageDisplay source={bs2Img} x={610} y={140} show={showOperators} />
          <ImageDisplay source={sampleImg} x={200} y={500} show={showOperators} />
          <div style={{
            position: "absolute", top: 537, left: 340, display: showOperators ? "" : "none",
          }}
          >
            {(radian).toFixed(1)}
          </div>
          <ImageDisplay source={statevectorLeft} x={100} y={260} height={80} show={showStateVectors} />
          <ImageDisplay source={statevectorMiddle} x={400} y={260} height={80} show={showStateVectors} />
          <div style={{
            position: "absolute", top: 310, left: 535, display: showStateVectors ? "" : "none",
          }}
          >
            {(radian + 1).toFixed(1)}
          </div>
          <ImageDisplay source={statevectorRight} x={800} y={260} height={80} show={showStateVectors} />
          <div style={{
            position: "absolute", top: 275, left: 990, display: showStateVectors ? "" : "none",
          }}
          >
            {(radian + 1).toFixed(1)}
          </div>
          <div style={{
            position: "absolute", top: 310, left: 990, display: showStateVectors ? "" : "none",
          }}
          >
            {(radian + 1).toFixed(1)}
          </div>
        </div>
      </div>

      <InterferometryControl
        countStatus={countStatus}
        fire={fire}
        setFirePhoton={setFirePhoton}
        handleResetCounts={handleResetCounts}
        handleShowOperators={handleShowOperators}
        showOperators={showOperators}
        handleShowStateVectors={handleShowStateVectors}
        showStateVectors={showStateVectors}
        angle={angle}
        handleSliderChange={handleSliderChange}
        shots={shots}
        handleNumberOfShots={handleNumberOfShots}
      />
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
