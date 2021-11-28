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
      this.degree = degree;
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
      const [amplitude,phase] = this.harmonics[i];
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

  toPolar([x,y]){
    const angle = Math.atan2(y,x);
    const r = Math.sqrt(x*x+y*y);
    return [r,angle];//amplitude, phase
  }

  toCartesian([r,angle]){
    return [
      Math.cos(angle)*r,
      Math.sin(angle)*r
    ];
  }

  complexMultiply([r1,i1],[r2,i2]){
    return [r1*r2-i1*i2,r1*i2+r2*i1];
  }

  complexAdd([r1,i1],[r2,i2]){
    return [r1+r2,i1+i2];
  }

  computeNthTerm(term){//term: int
    const width = this.points.length;
    const points = this.points;
    const sum = [0,0];
    for(let i = 0; i < width; i++){
      const t = i/width;// 0 <= t < 1
      //coef is a complex number e^(-term2πit)
      const coef = [
        Math.cos(-term*t*2*Math.PI),
        Math.sin(-term*t*2*Math.PI)
      ];
      const [r1,i1] = this.complexMultiply([points[i],0],coef);
      sum[0] += r1;
      sum[1] += i1;
    }
    const avg = [sum[0]/width,sum[1]/width];
    return this.toPolar(avg);//polar coordinates for easy processing with sin cos
  }

  fourierTransform() {
    //does fourier transform based on this.points
    const harmonics = [];
    for (let i = 0; i < this.degree; i++) {
      harmonics.push(this.computeNthTerm(i));
    }
    this.harmonics = harmonics;
    return harmonics;
  }
};
export default WaveForm;
