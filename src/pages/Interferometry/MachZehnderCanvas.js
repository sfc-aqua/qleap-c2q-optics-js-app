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

const generateNumberOfPhotons = (number, angle) => {
  const photonArray = [];
  const d0Probability = [
    1, 0.98, 0.9, 0.79, 0.65, 0.5, 0.35, 0.21, 0.1, 0.2,
    0, 0.2, 0.1, 0.21, 0.35, 0.5, 0.65, 0.79, 0.9, 0.98, 1,
  ];
  for (let i = 0; i < number; i++) {
    // probability of reflection of the beam splitters
    const probabilityBS1 = Math.random();
    const probabilityBS2 = d0Probability[angle];

    photonArray[i] = new Photon(
      equipment.source.posX - i * 50,
      equipment.source.posY + i * 50,
      10,
      5,
      probabilityBS1,
      probabilityBS2,
    );
  }
  return photonArray;
};

function MachZehnderCanvas({
  size: { width, height }, photonFire, setFirePhoton, shots, angle, showSample,
}) {
  const cvs = useRef(null);
  const photonArray = generateNumberOfPhotons(shots, angle);

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

    //  theoretical probability to click detector
    const d0Probability = ["100", "98", "90", "79", "65", "50", "35", "21", "10", "2", "0", "2", "10", "21", "35", "50", "65", "79", "90", "98", "100"];
    const d1Probability = ["0", "2", "10", "21", "35", "50", "65", "79", "90", "98", "100", "98", "90", "79", "65", "50", "35", "21", "10", "2", "0"];
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.strokeText(`${d0Probability[angle]}%`, equipment.detector0.posX + 110, equipment.detector0.posY);
    ctx.strokeText(`${d1Probability[angle]}%`, equipment.detector1.posX + 110, equipment.detector1.posY);
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
