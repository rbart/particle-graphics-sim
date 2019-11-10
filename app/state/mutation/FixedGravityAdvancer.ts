import Advancer from './Advancer'
import Particle from '../Particle'
import Vector2d from '../Vector2d';

export default class FixedGravityAdvancer implements Advancer {

  constructor(readonly point: Vector2d, readonly mass: number, readonly gravityCoef: number) { }

  advance(particles: Particle[]): void {
    for (let i = 0; i < particles.length; i++) {
      let p1 = particles[i]
      let diff = p1.pos.subtract(this.point);
      let gravityStrength = this.mass/(diff.length()) * this.gravityCoef;
      let gravityVector = diff.multiply(gravityStrength);
      if (gravityVector.length() > 20) gravityVector.multiplyMutate(20 / gravityVector.length())
      p1.spd.subtractMutate(gravityVector)
    }
  }
}
