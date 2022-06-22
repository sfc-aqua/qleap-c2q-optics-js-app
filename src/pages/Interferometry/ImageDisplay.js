import PropTypes from "prop-types";

function ImageDisplay({
    source, x, y, show, background, padding, height,
}) {
    const styles = {
        position: "absolute", 
        top: y, 
        left: x, 
        display: show ? "" : "none", 
        background: background, 
        padding: padding,
        margin: 0,
        borderRadius: "15px",
        boxShadow: '1px 2px 5px black',
    }
    return (
        <div
        className="image-display"
        style={styles}
        >
        <img
            src={source}
            height={height}
          />
        </div>
    );
}

ImageDisplay.propTypes = {
    source: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    show: PropTypes.bool,
    padding: PropTypes.number,
};

ImageDisplay.defaultProps = {
    x: 0,
    y: 0,
    show: false,
    background: "#f7f7f7",
    padding: 10,
    height: 60,
};

export default ImageDisplay;
