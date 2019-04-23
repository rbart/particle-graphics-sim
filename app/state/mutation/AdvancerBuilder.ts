import Advancer from "./Advancer"
import BasicAdvancer from './BasicAdvancer'
import WallBounceAdvancer from './WallBounceAdvancer'
import GravityAdvancer from './GravityAdvancer'
import Particle from '../../objects/Particle'

export default class AdvancerBuilder implements Advancer {

  constructor(private advancers: Advancer[]) {}

  advance(particles: Particle[]): void {
    this.advancers.forEach(advancer => advancer.advance(particles))
  }

  static createDefault(width: number, height: number): Advancer {

    let advancers: Advancer[] = [
      new WallBounceAdvancer(0.9, width, height),
      new GravityAdvancer(0.02),
      new BasicAdvancer()
    ];

    return new AdvancerBuilder(advancers)
  }
}
