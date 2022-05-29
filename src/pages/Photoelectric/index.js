import React, { useState } from "react";
import update from "immutability-helper";
import EquipmentCanvas from "./EquipmentCanvas";
import Parameter from "./Parameter";

// frequecy nu_0 [Hz]
const METALS = {
  nickel: { frequency: 1.24e15 },
  sodium: { frequency: 5.7e14 },
};

// planck constant
const H = 6.62607004e-34;
// unit of electron volt
const E = 1.6021766208e-19;

function Photoelectric() {
  const [params, setParams] = useState({
    voltage: 0,
    intensity: 0,
    frequency: 0, // nu
  });

  const mysteryMetal = METALS[Object.keys(METALS)[0]];
  const energyKinetic = H * (params.frequency * 1e14 - mysteryMetal.frequency);
  const energyStopping = E * params.voltage;
  const ejected = energyKinetic > 0 && energyKinetic - energyStopping > 0;
  return (
    <div>
      <h1>Photoelectric Effect</h1>
      <EquipmentCanvas drawFunc={() => {}} />
      {ejected ? "ejected" : "not ejected"}
      <div className="controls-container">
        <Parameter
          name="frequency"
          min={1}
          max={16}
          step={0.01}
          value={params.frequency}
          unit="x10^14 Hz"
          onChange={(value) => setParams((p) => update(p, { frequency: { $set: value } }))}
        />
        <Parameter
          name="voltage"
          min={-16}
          max={16}
          step={0.01}
          value={params.voltage}
          unit=" V"
          onChange={(value) => setParams((p) => update(p, { voltage: { $set: value } }))}
        />
      </div>
    </div>
  );
}

export default Photoelectric;
