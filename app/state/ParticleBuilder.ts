import Vector2d from './Vector2d'
import Particle from './Particle'
import Rectangle from './Rectangle';

export default interface ParticleBuilder {
  generateParticles(bounds: Rectangle): Particle[]
}

export class BasicParticleBuilder {

  constructor(
    private readonly numParticles: number,
    private readonly maxSpeed: number,
    private readonly minRadius: number,
    private readonly maxRadius: number,
  ) { }

  generateParticles(bounds: Rectangle): Particle[] {
    let particles: Particle[] = []
    for (let i = 0; i < this.numParticles; i++) {
      particles.push(this.generateParticle(bounds))
    }
    return particles
  }

  private generateParticle(bounds: Rectangle): Particle {
    let radius = Math.floor(Math.random() * (this.maxRadius - this.minRadius)) + this.minRadius;
    let randomPosition = bounds.origin.add(new Vector2d(
      Math.floor(Math.random() * bounds.extents.x - radius) + radius,
      Math.floor(Math.random() * bounds.extents.y - radius) + radius,
    ));
    let randomSpeed = new Vector2d(
      Math.random() * this.maxSpeed * 2 - this.maxSpeed,
      Math.random() * this.maxSpeed * 2 - this.maxSpeed,
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
