import React, { useState } from "react";
import WaveCanvas from "../../WaveCanvas";

const FourierAnalysis = () => {
  return <div>
    <h1>Fourier Analysis</h1>
    <WaveCanvas />
    <style>{`
      .title {
        color: red;
      }
      .hide {
        display: none;
      }
      `}</style>
  </div>;
};

export default FourierAnalysis;
