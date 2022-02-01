import Vector2d from './Vector2d'
import Particle from './Particle'
import Rectangle from './Rectangle';

export default interface ParticleBuilder {
  generateParticles(bounds: Rectangle): Particle[]
}

export class BasicParticleBuilder implements ParticleBuilder {

  constructor(
    private readonly numParticles: number,
    private readonly maxSpeed: number,
    private readonly minMass: number,
    private readonly maxMass: number,
  ) { }

  generateParticles(bounds: Rectangle): Particle[] {
    let particles: Particle[] = []
    for (let i = 0; i < this.numParticles; i++) {
      particles.push(this.generateParticle(bounds))
    }
    return particles
  }

  private generateParticle(bounds: Rectangle): Particle {
    let mass = Math.floor(Math.random() * (this.maxMass - this.minMass)) + this.minMass;
    let radius = Math.max(Math.sqrt(mass), 1)
    let randomPosition = bounds.origin.add(new Vector2d(
      Math.floor(Math.random() * bounds.extents.x - radius) + radius,
      Math.floor(Math.random() * bounds.extents.y - radius) + radius,
    ));
    let randomSpeed = new Vector2d(
      Math.random() * this.maxSpeed * 2 - this.maxSpeed,
      Math.random() * this.maxSpeed * 2 - this.maxSpeed,
    );
    return new Particle(
      randomPosition, randomSpeed, mass, radius, this.getRndHue()
    );
  }

  private getRndHue(): Vector2d {

    let hueAngle = 360 * Math.random()

    let hueX = Math.cos(hueAngle)
    let hueY = Math.sin(hueAngle)

    return new Vector2d(hueX, hueY);
  }
}
