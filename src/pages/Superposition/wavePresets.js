const WAVE_PRESETS = {
  Triangle: (width) => {
    const points = [];
    const n = 1; // number of periods
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(Math.abs(((r * n) % 1) * 2 - 1) * 2 - 1);
    }
    return points;
  },
  Square: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(((r * 4) % 1) * 2 - 1);
    }
    return points;
  },
  Step: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(r < 0.5 ? 1 : -1);
    }
    return points;
  },
  Delta: (width) => {
    const points = Array(width).fill(0);
    points[Math.floor(width * 0.5)] = -100;
    return points;
  },
  Cosine: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(Math.cos(r * 2 * Math.PI));
    }
    return points;
  },
  Sine: (width) => {
    const points = [];
    for (let i = 0; i < width; i++) {
      const r = i / width;
      points.push(Math.sin(r * 2 * Math.PI));
    }
    return points;
  },
};

export default WAVE_PRESETS;
