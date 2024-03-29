import Advancer from "./Advancer"
import Particle from '../Particle'

export default class AdvancerCollection implements Advancer {

  constructor(private advancers: Advancer[]) {}

  advance(particles: Particle[]): void {
    this.advancers.forEach(advancer => advancer.advance(particles))
  }
}
