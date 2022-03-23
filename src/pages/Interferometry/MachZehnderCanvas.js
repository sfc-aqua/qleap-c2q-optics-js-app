import React, { useRef } from "react";
import PropTypes from "prop-types";
import useAnimationFrame from "../../useAnimation";
import MachZehnderEquipment from "./MachZehnderEquipment";
import Photon from "./Photon";

const equipment = new MachZehnderEquipment(
  100,
  100,
  800,
  400,
);

const generateNumberOfPhotons = (number) => {
  const photonArray = [];
  for (let i = 0; i < number; i++) {
    photonArray[i] = new Photon(
      equipment.source.posX - i * 50,
      equipment.source.posY + i * 50,
      10,
      5,
    );
  }
  return photonArray;
};

function MachZehnderCanvas({
  size: { width, height }, photonFire, setFirePhoton, shots, angle, showSample,
}) {
  const cvs = useRef(null);
  const photonArray = generateNumberOfPhotons(shots);

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // show the MachZehnder Equipment
    equipment.draw(ctx, angle, showSample);

    // Photon Animation
    photonArray.forEach((photon) => equipment.fire(ctx, photon, photonFire));
    if (equipment.counts === shots) {
      setFirePhoton(false);
      equipment.counts = 0;
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
