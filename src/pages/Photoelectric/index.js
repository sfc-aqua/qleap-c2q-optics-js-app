import React, { useState } from "react";
import update from "immutability-helper";
import EquipmentCanvas from "./EquipmentCanvas";
import Parameter from "./Parameter";

function Photoelectric() {
  const [params, setParams] = useState({
    voltage: 0,
    intensity: 0,
    frequency: 0,
  });
  return (
    <div>
      <h1>Photoelectric Effect</h1>
      <EquipmentCanvas drawFunc={() => {}} />
      <div className="controls-container">
        {Object.keys(params).map((key) => (
          <Parameter
            name={key}
            key={key}
            min={0}
            max={100}
            step={1}
            value={params[key]}
            onChange={(value) => setParams((p) => update(p, { [key]: { $set: value } }))}
          />
        ))}
      </div>
    </div>
  );
}

export default Photoelectric;
