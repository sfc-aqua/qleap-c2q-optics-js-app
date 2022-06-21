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

const generatePhotons = (numPhotons) => {
  const photons = [];
  for (let i = 0; i < numPhotons; i++) {
    // probability of reflection of the beam splitters
    const probabilityBS2 = Math.random();

    photons.push(
      new Photon(
        equipment.source.posX - i * 50,
        equipment.source.posY + i * 50,
        20,
        5,
        probabilityBS2,
      ),
    );
  }
  return photons;
};

const PROBABILITIES = [
  1, 0.98, 0.9, 0.79, 0.65, 0.5, 0.35, 0.21, 0.1, 0.02,
  0, 0.02, 0.1, 0.21, 0.35, 0.5, 0.65, 0.79, 0.9, 0.98, 1,
];
const d0Probability = ["100", "98", "90", "79", "65", "50", "35", "21", "10", "2", "0", "2", "10", "21", "35", "50", "65", "79", "90", "98", "100"];
const d1Probability = ["0", "2", "10", "21", "35", "50", "65", "79", "90", "98", "100", "98", "90", "79", "65", "50", "35", "21", "10", "2", "0"];

function MachZehnderCanvas({
  size: { width, height },
  photonFire, setFirePhoton,
  shots, angle,
  setCountStatus,
  resetCounts, setResetCounts,
  showOperators, showStateVectors,
}) {
  const cvs = useRef(null);
  const photonArray = generatePhotons(shots, angle);
  const probability = PROBABILITIES[angle];

  useAnimationFrame(() => {
    if (!cvs.current) return;
    const ctx = cvs.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // show the MachZehnder Equipment
    equipment.draw(ctx, angle);

    // Photon Animation
    photonArray.forEach((photon) => equipment.fire(ctx, photon, photonFire, probability));
    if (equipment.counts === shots) {
      setFirePhoton(false);
      equipment.counts = 0;
    }

    // Arguments of Operator
    if (showOperators){
      ctx.font = `13px sans-serif`;
      ctx.fillText((angle*0.1).toFixed(1), 340, 540);
    }
    if (showStateVectors){
      ctx.font = `20px sans-serif`;
      ctx.fillText((angle*0.1+1).toFixed(1), 535, 315);
      ctx.fillText((angle*0.1).toFixed(1), 995, 315);
      ctx.fillText((angle*0.1).toFixed(1), 995, 275);
    }
    

    //  theoretical probability to click detector
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${d0Probability[angle]}%`, equipment.detector0.posX + 110, equipment.detector0.posY);
    ctx.fillText(`${d1Probability[angle]}%`, equipment.detector1.posX + 110, equipment.detector1.posY);

    // show counts of clicked detector as a discrete probability distribution
    ctx.strokeRect(1300, 50, -210, 500);
    const widthRatio = 200 / shots;
    ctx.strokeRect(1300, 150, -equipment.countsD0 * widthRatio, 50);
    ctx.strokeRect(1300, 400, -equipment.countsD1 * widthRatio, 50);
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(equipment.countsD0, 1250, 250);
    ctx.fillText(equipment.countsD1, 1250, 500);
    ctx.fillText("D0", 1350, 200);
    ctx.fillText("D1", 1350, 450);

    // disable photon fire button when counts is not empty
    if (equipment.countsD0 > 1) {
      setCountStatus("counted");
    }

    // reset counts of click distribution
    if (resetCounts) {
      setResetCounts(false);
      equipment.counts = 0;
      equipment.countsD0 = 0;
      equipment.countsD1 = 0;
      setCountStatus("empty");
    }
  });
  return (
    <canvas
      width={width}
      height={height}
      ref={cvs}
    />

  );
}
MachZehnderCanvas.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  photonFire: PropTypes.bool.isRequired,
  setFirePhoton: PropTypes.func.isRequired,
  shots: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  setCountStatus: PropTypes.func.isRequired,
  resetCounts: PropTypes.bool.isRequired,
  setResetCounts: PropTypes.func.isRequired,
};
export default MachZehnderCanvas;
