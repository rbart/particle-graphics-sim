import Advancer from './Advancer'
import Particle from '../Particle'

export default class BasicAdvancer implements Advancer {

  constructor(private readonly dragFactor: number) {}

  advance(particles: Particle[]): void {
    for (let particle of particles ) {
      particle.spd.multiplyMutate(this.dragFactor)
    }
  }
}
