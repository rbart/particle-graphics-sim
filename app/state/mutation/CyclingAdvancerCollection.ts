import Particle from "../Particle"
import Advancer from "./Advancer";
import AdvancerFactory from "./AdvancerFactory";
import Rectangle from "../Rectangle";

export class CyclingAdvancerCollectionFactory implements AdvancerFactory {

  constructor(private cycleSeconds: number, private advancerFactories: AdvancerFactory[][]) { }

  createInstance(bounds: Rectangle): CyclingAdvancerCollection {
    let advancers = this.advancerFactories.map(a => a.map(aa => aa.createInstance(bounds)))
    return new CyclingAdvancerCollection(this.cycleSeconds, advancers)
  }
}

export default class CyclingAdvancerCollection {
  private readonly startTime: number;

  constructor(private cycleSeconds: number, private advancers: Advancer[][]) {
    this.startTime = Date.now()
  }

  advance(particles: Particle[]): void {
    let currentTime = Date.now()
    let elapsedMs = currentTime - this.startTime
    let elapsedSeconds = elapsedMs / 1000.0
    let elapsedCycles = elapsedSeconds / this.cycleSeconds
    let cycleNumber = (elapsedCycles | 0) % this.advancers.length
    this.advancers[cycleNumber].forEach(adv => adv.advance(particles))
  }
}
