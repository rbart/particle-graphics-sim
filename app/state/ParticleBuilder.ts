import Vector2d from './Vector2d'
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
      randomPosition, randomSpeed, radius, radius, this.getRndHue()
    );
  }

  private getRndHue(): Vector2d {

    let hueAngle = 360 * Math.random()

    let hueX = Math.cos(hueAngle)
    let hueY = Math.sin(hueAngle)

    return new Vector2d(hueX, hueY);
  }
}
