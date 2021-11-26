class WaveForm {
  //public
  harmonics;
  points;
  degree;

  constructor({ harmonics, points, degree }) {
    if (harmonics) {//construct points
      this.harmonics = [...harmonics];
      this.degree = harmonics.length;
    } else if (points && degree) {//construct harmonics
      this.degree = degree();
      this.points = points;
      this.fourierTransform();//generates harmonics
    } else {
      throw new Error("not enough information to construct a wave");
    }
    //if either points or harmonics are incomplete
  }

  waveHeightAt(r) {
    let result = 0;
    for (let i = 0; i < this.degree; i++) {
      const [phase,amplitude] = this.harmonics[i];
      result += Math.cos(phase+r * i) * amplitude;
    }
    return result;
  }

  getHeights(width) {
    const result = [];
    for (let i = 0; i < width; i++) {
      result.push(this.waveHeightAt(i / width * 2 * Math.PI));
    }
    return result;
  }

  fourierTransform() {
    //does fourier transform based on this.points
    //for now it's just a mockup
    let harmonics = [];
    for (let i = 0; i < this.degree; i++) {
      harmonics.push(1);//mockup value
    }
    this.harmonics = harmonics;
    return harmonics;
  }
};
export default WaveForm;
