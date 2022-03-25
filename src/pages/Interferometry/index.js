import React, { useState } from "react";
import AngleSlider from "./AngleSlider";
import MachZehnderCanvas from "./MachZehnderCanvas";
import MathJaxDisplay from "../../MathJaxDisplay";

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

  // show sample
  const [showSample, setShowSample] = useState(false);
  const handleShowSample = () => {
    setShowSample(!showSample);
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
          showSample={showSample}
          setCountStatus={setCountStatus}
          resetCounts={resetCounts}
          setResetCounts={setResetCounts}
        />
        <MathJaxDisplay source={"\\[\\LARGE\\frac{1}{\\sqrt{2}}\\left(\\begin{array}{cc} 1 & 1  \\\\ 1 & -1 \\end{array}\\right)\\]"} x={210} y={120} hidden={!showOperators} />
        <MathJaxDisplay source={"\\[\\LARGE\\frac{1}{\\sqrt{2}}\\left(\\begin{array}{cc} -1 & 1  \\\\ 1 & 1 \\end{array}\\right)\\]"} x={610} y={120} hidden={!showOperators} />
        <MathJaxDisplay source={`\\[\\LARGE\\left(\\begin{array}{cc} 1 & 0  \\\\ 0 & e^{i${radian.toFixed(1)}\\pi} \\end{array}\\right)\\]`} x={290} y={480} hidden={!showOperators || !showSample} />

        <MathJaxDisplay source={"\\[\\LARGE\\left(\\begin{array}{c} 1 \\\\ 0 \\end{array}\\right)\\]"} x={130} y={240} hidden={!showStateVectors} />
        <MathJaxDisplay source={"\\[\\LARGE\\frac{1}{\\sqrt{2}}\\left(\\begin{array}{c} 1 \\\\ -1 \\end{array}\\right)\\]"} x={420} y={250} hidden={!showStateVectors || showSample} />
        <MathJaxDisplay source={`\\[\\LARGE\\frac{1}{\\sqrt{2}}\\left(\\begin{array}{c} 1 \\\\ e^{i${radian.toFixed(1)}\\pi} \\end{array}\\right)\\]`} x={410} y={250} hidden={!showStateVectors || !showSample} />
        <MathJaxDisplay source={"\\[\\LARGE\\left(\\begin{array}{c} 1 \\\\ 0 \\end{array}\\right)\\]"} x={790} y={250} hidden={!showStateVectors || showSample} />
        <MathJaxDisplay source={`\\[\\LARGE\\frac{1}{2}\\left(\\begin{array}{c} 1 + e^{i${radian.toFixed(1)}\\pi}\\\\ 1 - e^{i${radian.toFixed(1)}\\pi} \\end{array}\\right)\\]`} x={790} y={250} hidden={!showStateVectors || !showSample} />
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
          Show Operators
        </button>
        <button
          type="button"
          onClick={handleShowStateVectors}
        >
          Show State vectors
        </button>
        <div>
          <button type="button" onClick={handleShowSample}>
            Show Sample
          </button>
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
