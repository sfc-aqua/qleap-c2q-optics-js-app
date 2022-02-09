import React, {useState} from "react";

function Hello(props) {
  console.log(props);
  return <h2>Hello {props.name} : {props.age}</h2>
}

function handleClick() {
  console.log("clicked")
}

function Counter() {
  const [count, setCount] = useState(0);
  console.log("render", count)

  return <div>
    <div>count: {count}</div>
    <button onClick={() => setCount(count + 1)}>increment</button>
  </div>
}


function DoubleSlit() {
  const [Lambda, setLambda] = useState(1);

    function handleSliderChangeL(Lambda) {
      setLambda(Lambda.target.value);
      console.log(Lambda.target.value);
    }
  const [S, setS] = useState(2);

    function handleSliderChangeS(S) {
      setS(S.target.value);
      console.log(S.target.value);
    }
  const [A, setA] = useState(3);

    function handleSliderChangeA(A) {
      setA(A.target.value);
      console.log(A.target.value);
    }

  
  return (
    <div>
      <h1>Double-Slit Experiment (or Michelson interferometer)</h1>
      <div>
        <label for="lambda">Lambda:</label>
        <input type="range" id="lambda" name="lambda" min="0" max="10" step="1" value={Lambda} onChange={handleSliderChangeL}></input>
        {Lambda}
        
      </div>
      <div>
        <label for="s">s:</label>
        <input type="range" id="s" name="s" min="10" max="30" step="1" value={S} onChange={handleSliderChangeS}></input>
        {S}
      </div>
      <div>
        <label for="a">a:</label>
        <input type="range" id="a" name="a" min="1" max="5" step="1" value={A} onChange={handleSliderChangeA}></input>
        {A}
      </div>
    </div>
  );
}

export default DoubleSlit;
