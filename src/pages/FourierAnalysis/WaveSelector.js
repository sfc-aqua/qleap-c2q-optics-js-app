import React from "react";
import WaveForm from "./waveForm";

const WaveSelector = ({ options, setWaveForm }) => {
	return <div>{Object
	  .entries(options)
	  .map(([waveName, waveGen]) => (<div key={waveName}>
		<label>
		  <input
			type="radio"
			name="waveforms"
			onInput={() => setWaveForm(new WaveForm(waveGen()))}
		  />
		  {waveName}
		</label>
	  </div>))}</div>;
  };

  export default WaveSelector;