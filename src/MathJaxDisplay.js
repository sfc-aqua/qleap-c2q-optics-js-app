import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import PropTypes from "prop-types";

function MathJaxDisplay({
  source, x, y, hidden,
}) {
  const [lastTimeUpdated, setLastTimeUpdated] = useState(0);
  const [lastSource, setLastSource] = useState(source);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  // XXX: reduce the number of compile mathjax and force reflow.
  useEffect(() => {
    const timerId = setInterval(() => {
      if (source !== lastSource) {
        setLastSource(source);
        setLastTimeUpdated(Date.now());
        setShouldUpdate(false);
      }
      if (Date.now() - lastTimeUpdated > 500) {
        setShouldUpdate(true);
      }
    }, 100);
    return () => clearInterval(timerId);
  }, [
    lastSource,
    source,
    shouldUpdate,
    setShouldUpdate,
    lastTimeUpdated,
    setLastTimeUpdated,
  ]);

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
      <MathJax
        dynamic={shouldUpdate}
        renderMode="post"
        hideUntilTypeset="every"
        onTypeset={() => setShouldUpdate(false)}
      >
        {lastSource}
      </MathJax>
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
