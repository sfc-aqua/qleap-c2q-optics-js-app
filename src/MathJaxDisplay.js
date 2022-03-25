import React from "react";
import { MathJax } from "better-react-mathjax";
import PropTypes from "prop-types";

function MathJaxDisplay({
  source, x, y, hidden,
}) {
  return (
    <div
      className="mathjax-display"
      style={{
        position: "absolute",
        top: y,
        left: x,
        display: hidden ? "none" : "",
      }}
    >
      <MathJax dynamic renderMode="post" hideUntilTypeset="every">{source}</MathJax>
    </div>
  );
}

MathJaxDisplay.propTypes = {
  source: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  hidden: PropTypes.bool,
};

MathJaxDisplay.defaultProps = {
  x: 0,
  y: 0,
  hidden: false,
};

export default MathJaxDisplay;
