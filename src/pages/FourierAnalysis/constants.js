// text height map generation function
const generateHeightMap = function (str, width) {
  // temp canvas to trace the letters
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = width * (100 / 500);
  const ctx = canvas.getContext("2d");
  ctx.font = `bold ${Math.floor(width * (150 / 500))}px sans`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(str, canvas.width / 2, canvas.height * 0.73);
  const imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imgdata;
  const points = [];
  for (let i = 0; i < canvas.width; i++) {
    let j = 0;
    for (; j < canvas.height; j++) {
      const idx = (j * canvas.width + i) * 4;
      if (data[idx + 3] > 100) {
        break;
      }
    }
    points.push((1 - j / canvas.height) * 2 - 1);
  }
  return points;
};

export const MODE = {
  EDIT: "Edit",
  VIEW: "View",
};

export const PRESETS = {
  Cosine: () => ({
    harmonics: [
      [0, 0], [1, 0],
    ],
  }),
  Sine: () => ({
    harmonics: [
      [0, 0], [1, -Math.PI / 2],
    ],
  }),
  Triangle: () => {
    const arr = [];
    const width = 1000;
    const n = 4;// number of periods
    for (let i = 0; i < width; i++) {
      const r = i / width;
      arr.push(Math.abs(((r * n) % 1) * 2 - 1) * 2 - 1);
    }
    return {
      points: arr,
      degree: 50,
    };
  },
  Sawtooth: () => {
    const arr = [];
    const width = 1000;
    for (let i = 0; i < width; i++) {
      const r = i / width;
      arr.push(((r * 4) % 1) * 2 - 1);
    }
    return {
      points: arr,
      degree: 190,
    };
  },
  Step: () => { // classic original fourier analysis
    const arr = [];
    const width = 1000;
    for (let i = 0; i < width; i++) {
      const r = i / width;
      arr.push(r < 0.5 ? 1 : -1);
    }
    return {
      points: arr,
      degree: 190,
    };
  },
  Flat: () => ({
    points: [0, 0, 0, 0, 0, 0],
    degree: 10,
  }),
  AQUA: () => ({
    points: generateHeightMap("AQUA", 1500),
    degree: 500,
  }),
};
