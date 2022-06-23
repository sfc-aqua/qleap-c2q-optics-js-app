import React from "react";
import PropTypes from "prop-types";

function ImageDisplay({
  source, alt, x, y, show, background, padding, height,
}) {
  const styles = {
    position: "absolute",
    top: y,
    left: x,
    display: show ? "" : "none",
    background,
    padding,
    margin: 0,
    borderRadius: "15px",
    boxShadow: "1px 2px 5px black",
  };
  return (
    <div
      className="image-display"
      style={styles}
    >
      <img
        src={source}
        alt={alt}
        height={height}
      />
    </div>
  );
}

ImageDisplay.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  background: PropTypes.string,
  height: PropTypes.number,
  show: PropTypes.bool,
  padding: PropTypes.number,
};

ImageDisplay.defaultProps = {
  alt: "",
  x: 0,
  y: 0,
  show: false,
  background: "#f7f7f7",
  padding: 10,
  height: 60,
};

export default ImageDisplay;
