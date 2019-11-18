import Advancer from './Advancer'
import Particle from '../Particle'
import Vector2d from '../Vector2d';
import AdvancerFactory from './AdvancerFactory';
import Rectangle from '../Rectangle';

export class FixedGravityAdvancerFactory implements AdvancerFactory {
  constructor(readonly point: Vector2d, readonly mass: number, readonly gravityCoef: number) { }
  createInstance(bounds: Rectangle): FixedGravityAdvancer {
    return new FixedGravityAdvancer(bounds, this.point, this.mass, this.gravityCoef)
  }
}

export default class FixedGravityAdvancer implements Advancer {
  point: Vector2d
  effectiveRadius: number;
  constructor(
      bounds: Rectangle,
      point: Vector2d,
      readonly mass: number,
      readonly gravityCoef: number) {

    let scaledPoint = new Vector2d(
      bounds.extents.x * point.x,
      bounds.extents.y * point.y)
    this.point = bounds.origin.add(scaledPoint)
    this.effectiveRadius = Math.sqrt(Math.abs(mass))
  }

  advance(particles: Particle[]): void {
    for (let i = 0; i < particles.length; i++) {
      let p1 = particles[i]
      let gravityVector = p1.pos.subtract(this.point)
      let gravityStrength =
        (this.mass * this.gravityCoef) / gravityVector.lengthSquared()
      gravityStrength = Math.min(20, gravityStrength)
      gravityVector.multiplyMutate(gravityStrength / gravityVector.length())
      p1.spd.subtractMutate(gravityVector)
    }
  }
}
