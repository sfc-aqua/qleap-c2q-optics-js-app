import React, { useRef, useState } from "react";
import useAnimationFrame from "./../../useAnimation";


const MODE = {
  EDIT: "Edit",
  VIEW: "View"
};

const preset = {
  cos: () => {
    return {
      harmonics: [
        0, 1
      ]
    }
  },
  highfreq: () => {
    return {
      harmonics: [
        0, 0.2, 0.2, 0.2, 0.2
      ]
    }
  }


};


class WaveForm {
  //public
  harmonics;
  points;
  degree;
  constructor({ harmonics, points, degree }) {
    if (harmonics) {//construct points
      this.harmonics = [...harmonics];
      this.degree = harmonics.length;
    } else if (points && degree) {//construct harmonics
      this.degree = degree();
      this.points = points;
      this.fourierTransform();//generates harmonics
    } else {
      throw new Error("not enough information to construct a wave");
    }
    //if either points or harmonics are incomplete
  }

  waveHeightAt(r) {
    let result = 0;
    for (let i = 0; i < this.degree; i++) {
      result += Math.cos(r * i) * this.harmonics[i];
    }
    return result;
  }

  getHeights(width) {
    const result = [];
    for (let i = 0; i < width; i++) {
      result.push(this.waveHeightAt(i / width * 2 * Math.PI));
    }
    return result;
  }

  fourierTransform() {
    //does fourier transform based on this.points
    //for now it's just a mockup
    let harmonics = [];
    for (let i = 0; i < this.degree; i++) {
      harmonics.push(1);//mockup value
    }
    this.harmonics = harmonics;
    return harmonics;
  }
};

const getElementPosition = (e) => {
  const target = e.target;
  const x = window.scrollX + e.clientX - target.offsetLeft;
  const y = window.scrollY + e.clientY - target.offsetTop;
  return [x, y];
};

/*
const normalizePoints = (points,width,height)=>{
  for(){

  }
};*/

const WaveCanvas = ({ mode, waveForm, size: [width, height] }) => {
  const cvs = useRef(null);
  //const [pos, setPos] = useState({ x: 0, y: 0 });

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, cvs.current.width, cvs.current.height);
    ctx.beginPath();
    const heights = waveForm.getHeights(width);
    const waveHeight = 50;
    const offset = 80;
    for (let i = 0; i < width; i++) {
      ctx.lineTo(i, heights[i] * waveHeight + offset);
    }
    ctx.stroke();
    /*
    ctx.clearRect(0, 0, cvs.current.width, cvs.current.height);
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, 40, 40);
    ctx.closePath();
    ctx.fill();
    setPos(prev => ({ x: prev.x + 1, y: prev.y + 1 }));
    */
  });


  //local temporary parameters

  return <canvas width={width} height={height} ref={cvs} ></canvas>;
};


const Toggle = ({ onModeChanged }) => {
  const [isViewMode, setViewMode] = useState(true);
  const toggleMode = () => {
    setViewMode(prev => !isViewMode)
    onModeChanged(!isViewMode)
  }
  return <div><input type="checkbox" onClick={toggleMode} /></div>
};

const Radio = ({ options, setWaveForm }) => {
  const items = Object.entries(options).map(([opstr, op]) => {
    return (<div key={opstr}>
      <label>
        <input
          type="radio"
          name="waveforms"
          onInput={() => {
            console.log(op);
            setWaveForm(new WaveForm(op));
          }}
        />
        {opstr}
      </label>
    </div>);
  });
  return <div>{items}</div>;
};



const FourierAnalysis = () => {
  const [mode, setMode] = useState(MODE.VIEW);
  //class that manages an array of harmonics, as well as
  //the constructed main wave
  const [waveForm, setWaveForm] = useState(new WaveForm(preset.cos()));
  const [size, setSize] = useState([640, 400]);


  return <div>
    <h1>Fourier Analysis</h1>
    <div>mode: {mode}</div>
    <Toggle onModeChanged={(isViewMode) => setMode(isViewMode ? MODE.VIEW : MODE.EDIT)} />
    <Radio options={{ "Some wave": preset.highfreq(), "Cosine": preset.cos() }} setWaveForm={setWaveForm} />
    <WaveCanvas mode={mode} waveForm={waveForm} size={size} />
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
