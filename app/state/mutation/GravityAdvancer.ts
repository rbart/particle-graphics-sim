import Advancer from './Advancer'
import Particle from '../Particle'
import AdvancerFactory from './AdvancerFactory'
import Rectangle from '../Rectangle'

export class GravityAdvancerFactory implements AdvancerFactory {

  constructor(private gravityCoef: number) { }

  createInstance(_: Rectangle): GravityAdvancer {
    return new GravityAdvancer(this.gravityCoef)
  }
}

export default class GravityAdvancer implements Advancer {

  constructor(readonly gravityCoef: number) { }

  advance(particles: Particle[]): void {
    for (let i = 0; i < particles.length; i++) {
      let p1 = particles[i]
      for (let j = i + 1; j < particles.length; j++) {
        if (!isFinite(p1.pos.length())) continue
        let p2 = particles[j];
        if (!isFinite(p2.pos.length())) continue
        let diff = p1.pos.subtract(p2.pos);
        let diffUnit = diff.multiply(1.0 / diff.length())
        let radSum = p1.rad + p2.rad
        let gravityStrength = (this.gravityCoef)/(diff.lengthSquared() + radSum);
        gravityStrength = Math.min(10, gravityStrength)
        let gravityVector = diffUnit.multiply(gravityStrength);
        p1.spd.subtractMutate(gravityVector.multiply(p2.mass))
        p2.spd.addMutate(gravityVector.multiply(p1.mass))
      }
    }
  }
}
