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
  constructor(
      bounds: Rectangle,
      point: Vector2d,
      readonly mass: number,
      readonly gravityCoef: number) {

    let scaledPoint = new Vector2d(
      bounds.extents.x * point.x,
      bounds.extents.y * point.y)
    this.point = bounds.origin.add(scaledPoint)
  }

  advance(particles: Particle[]): void {
    for (let i = 0; i < particles.length; i++) {
      let p1 = particles[i]
      let diff = p1.pos.subtract(this.point)
      let diffUnit = diff.multiply(1 / diff.length())
      let gravityStrength = (this.mass * this.gravityCoef)/(diff.lengthSquared())
      let gravityVector = diffUnit.multiply(gravityStrength)
      //if (gravityVector.length() > 20) gravityVector.multiplyMutate(20 / gravityVector.length())
      p1.spd.subtractMutate(gravityVector)
    }
  }
}
