import React, { useRef } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";
import MachZehnderEquipment from "./MachZehnderEquipment";

const equipment = new MachZehnderEquipment(
  100,
  100,
  400,
  400,
);

function MachZehnderCanvas({ size: { width, height }, photonFire }) {
  const cvs = useRef(null);
  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    equipment.draw(ctx);
    if (photonFire) {
      equipment.fire(ctx);
    } else {
      equipment.photon.initialize();
    }
  });
  return (
    <canvas
      width={width}
      height={height}
      ref={cvs}
      style={{ border: "solid 1px red" }}
    />

  );
}
MachZehnderCanvas.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};
export default MachZehnderCanvas;
