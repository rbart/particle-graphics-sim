import Vector2d from './Vector2d'
import Vector3d from './Vector3d'
import Particle from './Particle'

export default class ParticleBuilder {

  constructor(
    readonly width: number,
    readonly height: number) { }

  generateRandomParticle(maxSpeed: number, minRadius: number, maxRadius: number) {
    let radius = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
    let randomPosition = new Vector2d(
      Math.floor(Math.random() * this.width - radius) + radius,
      Math.floor(Math.random() * this.height - radius) + radius,
    );
    let randomSpeed = new Vector2d(
      Math.random() * maxSpeed * 2 - maxSpeed,
      Math.random() * maxSpeed * 2 - maxSpeed,
    );
    return new Particle(
      randomPosition, randomSpeed, radius, this.getRndColor()
    );
  }

  private getRndColor() {

    let rgbVect = new Vector3d(
      255*Math.random(),
      255*Math.random(),
      255*Math.random());

    let scaleFactor = 255 / rgbVect.length();

    let r = scaleFactor*rgbVect.x|0,
        g = scaleFactor*rgbVect.y|0,
        b = scaleFactor*rgbVect.z|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}
