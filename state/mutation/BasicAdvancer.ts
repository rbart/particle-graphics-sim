import Advancer from './Advancer'
import Particle from '../Particle'
import AdvancerFactory from './AdvancerFactory';
import Rectangle from '../Rectangle';

export class BasicAdvancerFactory implements AdvancerFactory {
  constructor(private readonly dragCoef: number) { }
  createInstance(_: Rectangle): BasicAdvancer {
    return new BasicAdvancer(this.dragCoef)
  }
}

export default class BasicAdvancer implements Advancer {
  constructor(private readonly dragCoef: number) { }
  advance(particles: Particle[]): void {
    for (let particle of particles ) {
      particle.spd.multiplyMutate(this.dragCoef)
      particle.pos.addMutate(particle.spd);
    }
  }
}
