import Advancer from './Advancer'
import Particle from '../Particle'
import Rectangle from '../Rectangle'
import Vector2d from '../Vector2d'

export default class WallBounceAdvancer implements Advancer {

  private origin: Vector2d
  private outer: Vector2d

  constructor(readonly bounceCoef: number, readonly bounds: Rectangle) {
    this.origin = bounds.origin
    this.outer = bounds.origin.add(bounds.extents)
  }

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
    return (particle.pos.x > this.outer.x - particle.rad && particle.spd.x > 0)
  }

  private belowMinX(particle: Particle): boolean {
    return (particle.pos.x < particle.rad + this.origin.x && particle.spd.x < 0);
  }

  private aboveMaxY(particle: Particle): boolean {
    return (particle.pos.y > this.outer.y - particle.rad && particle.spd.y > 0)
  }

  private belowMinY(particle: Particle): boolean {
    return (particle.pos.y < particle.rad + this.origin.y && particle.spd.y < 0)
  }
}
