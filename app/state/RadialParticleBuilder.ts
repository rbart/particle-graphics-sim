import Vector2d from './Vector2d'
import Particle from './Particle'
import Rectangle from './Rectangle';

export class RadialParticleBuilder {

  constructor(
    private readonly numParticles: number,
    private readonly minRadius: number,
    private readonly maxRadius: number,
    private readonly g: number,
    private readonly mass: number
  ) { }

  generateParticles(bounds: Rectangle): Particle[] {
    let particles: Particle[] = []
    for (let i = 0; i < this.numParticles; i++) {
      particles.push(this.generateParticle(bounds))
    }
    return particles
  }

  private generateParticle(bounds: Rectangle): Particle {
    let mass = 0//0.000001
    let radius = 1
    let randomAngle = Math.random() * 2 * Math.PI
    let randomVector = new Vector2d(Math.cos(randomAngle), Math.sin(randomAngle))
    let randomRadius = (Math.random() * (this.maxRadius - this.minRadius)) + this.minRadius
    let boundsCenter = bounds.origin.add(bounds.extents.multiply(0.5))
    let randomPosition = randomVector
      .multiply(randomRadius)
      .add(boundsCenter)

    // let denom = randomRadius
    // let speed = 10*Math.sqrt((this.g * this.mass) / denom)// https://en.wikipedia.org/wiki/Circular_orbit#Velocity
    //let speedAngle = randomAngle + (Math.PI/2)
    //let speedUnitVector = new Vector2d(Math.cos(speedAngle), Math.sin(speedAngle))
    let speed = Math.sqrt((this.g * this.mass) / randomRadius)
    let speedVector = new Vector2d(-randomVector.y, randomVector.x).multiply(speed)

    return new Particle(
      randomPosition, speedVector, mass, radius, this.getRndHue(randomAngle)
    )
  }

  private getRndHue(angle: number): Vector2d {

    //let hueAngle = 1//Math.PI * 2 * Math.random()

    let hueX = Math.cos(angle)
    let hueY = Math.sin(angle)

    return new Vector2d(hueX, hueY);
  }
}
