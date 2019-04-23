import Advancer from './Advancer'
import Particle from '../Particle'

export default class WallBounceAdvancer implements Advancer {

  constructor(readonly bounceCoef: number, readonly width: number, readonly height: number) { }

  advance(particles: Particle[]): void {
    for (let particle of particles) {
      if (this.belowMinX(particle) || this.aboveMaxX(particle)) {
        this.invertSpdX(particle)
      }

      if (this.aboveMaxY(particle) || this.belowMinY(particle)) {
        this.invertSpdY(particle)
      }
    }
  }

  private invertSpdX(particle: Particle): void {
    particle.spd.x *= -this.bounceCoef
  }

  private invertSpdY(particle: Particle): void {
    particle.spd.y *= -this.bounceCoef
  }

  private aboveMaxX(particle: Particle): boolean {
    return (particle.pos.x > this.width - particle.rad && particle.spd.x > 0)
  }

  private belowMinX(particle: Particle): boolean {
    return (particle.pos.x < particle.rad && particle.spd.x < 0);
  }

  private aboveMaxY(particle: Particle): boolean {
    return (particle.pos.y > this.height - particle.rad && particle.spd.y > 0)
  }

  private belowMinY(particle: Particle): boolean {
    return (particle.pos.y < particle.rad && particle.spd.y < 0)
  }
}
