import React from "react";
import PropTypes from "prop-types";

function Parameter({
  name, min, max, step, value, onChange,
}) {
  return (
    <div>
      <label htmlFor={name}>
        <span className="param-name">
          {name}
          :
          {" "}
        </span>
        <span className="param-value">{value}</span>
      </label>
      <input
        type="range"
        id={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <style jsx>
        {`
          .param-name {
            width: 6rem;
            display: inline-block;
          }
          .param-value {
            width: 2rem;
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
}

Parameter.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Parameter;
