import Advancer from './Advancer'
import Particle from '../Particle'

export default class BasicAdvancer implements Advancer {
  advance(particles: Particle[]): void {
    for (let particle of particles ) {
      particle.spd.multiplyMutate(0.995)
      particle.pos.addMutate(particle.spd);
    }
  }
}
