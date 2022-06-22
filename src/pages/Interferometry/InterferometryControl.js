import React from "react";

function InterferometryControl({
  countStatus,
  fire, setFirePhoton,
  handleResetCounts,
  handleShowOperators, showOperators,
  handleShowStateVectors, showStateVectors,
  angle, handleSliderChange,
  shots, handleNumberOfShots,
}) {
  const buttonStyle = {
    background: "#dfe3ee",
    color: "black",
    fontSize: "20",
    padding: "10px 10px",
    borderRadius: "5px",
    margin: "10px 2px",
    cursor: "pointer",
    width: "200px",
    height: "60px",
  };
  return (
    <div className="control-plane">
      <h2>Control Experiments</h2>
      <div>
        <button
          type="button"
          onClick={countStatus === "empty" ? setFirePhoton : handleResetCounts}
          style={buttonStyle}
        >
          {countStatus === "empty" ? "Fire " : "Reset "}
          Photon
        </button>
        <button
          type="button"
          onClick={handleShowOperators}
          style={buttonStyle}
        >
          {showOperators ? "Hide" : "Show"}
          {" "}
          Operators
        </button>
        <button
          type="button"
          onClick={handleShowStateVectors}
          style={buttonStyle}
        >
          {showStateVectors ? "Hide" : "Show"}
          {" "}
          State vectors
        </button>
      </div>
      <div>
        <label htmlFor="Sample angle">
          Phase Shift :
          {(angle * 0.1).toFixed(1)}
          π
        </label>
        <input
          type="range"
          name="reflective index"
          min="0"
          max="20"
          step="1"
          value={angle}
          onChange={handleSliderChange}
          disabled={fire}
        />
      </div>
      <div>
        <label htmlFor="Sample angle">
          Set Number of Photon :
          {(shots)}
        </label>
        <input
          type="range"
          name="reflective index"
          min="1"
          max="100"
          step="1"
          value={shots}
          onChange={handleNumberOfShots}
          disabled={fire}
        />
      </div>
    </div>
  );
}

export default InterferometryControl;
