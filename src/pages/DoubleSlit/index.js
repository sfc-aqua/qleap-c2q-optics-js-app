import React, { useState } from "react";

function DoubleSlit() {
  const [Lambda, setLambda] = useState(1);

  function handleSliderChangeL(e) {
    setLambda(e.target.value);
  }
  const [S, setS] = useState(2);

  function handleSliderChangeS(e) {
    setS(e.target.value);
  }
  const [A, setA] = useState(3);

  function handleSliderChangeA(e) {
    setA(e.target.value);
  }

  return (
    <div>
      <h1>Double-Slit Experiment (or Michelson interferometer)</h1>
      <div>
        <label htmlFor="lambda">Lambda:</label>
        <input type="range" id="lambda" name="lambda" min="0" max="10" step="1" value={Lambda} onChange={handleSliderChangeL} />
        {Lambda}

      </div>
      <div>
        <label htmlFor="s">s:</label>
        <input type="range" id="s" name="s" min="10" max="30" step="1" value={S} onChange={handleSliderChangeS} />
        {S}
      </div>
      <div>
        <label htmlFor="a">a:</label>
        <input type="range" id="a" name="a" min="1" max="5" step="1" value={A} onChange={handleSliderChangeA} />
        {A}
      </div>
    </div>
  );
}

export default DoubleSlit;
