import React, { useState, useEffect } from "react";
import Decimal from "decimal.js";
import update from "immutability-helper";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import EquipmentCanvas from "./EquipmentCanvas";
import Parameter from "./Parameter";

// frequecy nu_0 [Hz]
const METALS = {
  nickel: { frequency: 1.24e15 },
  sodium: { frequency: 5.7e14 },
};

const VOLTAGE_STEP = 0.1;
const VOLTAGE_MAX = 3;
// x10^14 Hz
const FREQ_STEP = 0.1;
const FREQ_MAX = 20;
// planck constant
const H = 6.62607004e-34;
// unit of electron volt
const E = 1.6021766208e-19;

const toFixed = (value) => +new Decimal(value).toPrecision(3);
const DEFAULT_DATA = [];
for (let i = 0; i < FREQ_MAX; i += FREQ_STEP) {
  DEFAULT_DATA.push({
    freq: toFixed(i),
    energyKinetic: null,
  });
}

function Photoelectric() {
  const [params, setParams] = useState({
    voltage: 0,
    intensity: 0,
    frequency: 0, // nu
  });
  const [data, setData] = useState(DEFAULT_DATA);

  const mysteryMetal = METALS[Object.keys(METALS)[0]];
  const energyKinetic = H * (params.frequency * 1e14 - mysteryMetal.frequency);
  const energyStopping = E * params.voltage;
  const ejected = energyKinetic > 0 && energyKinetic - energyStopping > 0;

  useEffect(() => {
    let ek = energyKinetic;
    if (!ejected) {
      ek = 0;
    }
    const index = data.findIndex((e) => e.freq === params.frequency);
    if (index === -1) {
      return;
    }
    const prevEk = data[index].energyKinetic;
    if (prevEk === null || prevEk > ek || ek !== 0) {
      const newData = update(data, {
        [index]: { energyKinetic: { $set: toFixed(ek) } },
      });
      setData(newData);
    }
  }, [data, energyKinetic, ejected, setData, params]);
  return (
    <div>
      <h1>Photoelectric Effect</h1>
      <EquipmentCanvas drawFunc={() => {}} ejected={ejected} />
      {ejected ? "ejected" : "not ejected"}
      <div className="controls-and-chart">
        <div className="controls-container">
          <Parameter
            name="frequency"
            min={1}
            max={FREQ_MAX}
            step={FREQ_STEP}
            value={params.frequency}
            unit="x10^14 Hz"
            onChange={(value) => setParams((p) => update(p, { frequency: { $set: toFixed(value) } }))}
          />
          <Parameter
            name="voltage"
            min={-VOLTAGE_MAX}
            max={VOLTAGE_MAX}
            step={VOLTAGE_STEP}
            value={params.voltage}
            unit=" V"
            onChange={(value) => setParams((p) => update(p, { voltage: { $set: toFixed(value) } }))}
          />
        </div>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ bottom: 20, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="freq"
            label={{ position: "bottom", value: "Frequency 10^14 [Hz]" }}
          />
          <YAxis
            label={{
              value: "　　　　Kinetic Energy [eV]",
              angle: -90,
              position: "insideBottomLeft",
              offset: -20,
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="energyKinetic"
            stroke="#82ca9d"
            connectNulls={false}
          />
        </LineChart>
      </div>
      <style jsx>
        {`
          .controls-and-chart {
            display: flex;
          }
          .chart-container {
          }
        `}
      </style>
    </div>
  );
}

export default Photoelectric;
