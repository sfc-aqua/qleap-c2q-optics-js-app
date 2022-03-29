const fourierTransform = (numWaves, points) => {
  function toPolar([x, y]) {
    const angle = Math.atan2(y, x);
    const r = Math.sqrt(x * x + y * y);
    return [r, angle]; // amplitude, phase
  }

  function complexMultiply([r1, i1], [r2, i2]) {
    return [r1 * r2 - i1 * i2, r1 * i2 + r2 * i1];
  }

  const width = points.length;
  const harmonics = [];
  for (let term = 0; term < 200; term++) {
    const sum = [0, 0];
    for (let i = 0; i < width; i++) {
      const t = i / width; // 0 <= t < 1

      // coef is a complex number e^(-term2πit)
      const coef = [
        Math.cos(-term * t * 2 * Math.PI),
        Math.sin(-term * t * 2 * Math.PI),
      ];
      const [r1, i1] = complexMultiply([points[i] * 2, 0], coef);
      sum[0] += r1;
      sum[1] += i1;
    }

    const avg = [sum[0] / width, sum[1] / width];
    // polar coordinates for easy processing with sin cos
    const [amplitude, phase] = toPolar(avg);
    harmonics.push({ amplitude, phase, k: term });
  }
  harmonics.sort((a, b) => Math.abs(b.amplitude) - Math.abs(a.amplitude));
  return harmonics.slice(0, numWaves);
};

export default fourierTransform;
