import { GRID_SIZE, ORIGINAL_WAVE_COLOR, SUPERPOSED_WAVE_COLOR } from "./constants";

export const drawWaves = (ctx, waves, width, t, showEachWave) => {
  const composites = Array(width).fill(0);

  for (let i = 0; i < waves.length; i++) {
    const {
      k, amplitude, phase, omega, visible, color, selected,
    } = waves[i];

    ctx.beginPath();
    ctx.lineWidth = selected ? 4 : 1;
    for (let x = 0; x < width; x++) {
      if (visible) {
        const y = Math.cos(k * x * 0.005 * Math.PI - omega * t * 0.01 + phase)
          * amplitude
          * GRID_SIZE;
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        composites[x] += y;
      }
    }
    if (showEachWave || selected) {
      ctx.stroke();
    }
  }

  ctx.strokeStyle = SUPERPOSED_WAVE_COLOR;
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    ctx.lineTo(x, composites[x]);
  }
  ctx.stroke();
};

export const drawOriginalWave = (ctx, points, width) => {
  ctx.strokeStyle = ORIGINAL_WAVE_COLOR;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < width; i++) {
    ctx.lineTo(i, points[i % points.length] * GRID_SIZE);
  }
  ctx.stroke();
};
