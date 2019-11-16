import Particle from "../Particle"
import ApplyColorGravityVisitor from "./ApplyColorGravityVisitor"
import GravityVisitorFactory from './GravityVisitorFactory'

export default class OscillatingColorGravityVisitor extends ApplyColorGravityVisitor {

  colorFactorCosine: number
  gravityPushPullCosine: number

  constructor(
    protected readonly particle: Particle,
    protected readonly gravityCoef: number) {
    super(particle, gravityCoef)
    // TODO make these constants configurable, get time externally somehow.
    let frameNumber = Date.now() / 30
    this.colorFactorCosine = Math.cos(frameNumber / 151)
    this.gravityPushPullCosine = Math.cos(frameNumber / 237)
    this.gravityPushPullCosine = -0.2 / (1.1 + this.gravityPushPullCosine) + 1
  }

  protected applyGravityFrom(other: Particle): void {
    let diff = this.particle.pos.subtract(other.pos);
    let colorCosine = this.particle.hue.cosineSimilarity(other.hue)
    colorCosine = (this.colorFactorCosine + (1 - this.colorFactorCosine)*colorCosine)
    colorCosine *= this.gravityPushPullCosine
    let gravityStrength = (colorCosine * other.mass * this.gravityCoef)/diff.lengthSquared();
    let gravityVector = diff.multiply(gravityStrength);
    if (gravityVector.length() > 20) gravityVector.multiplyMutate(20 / gravityVector.length())
    this.particle.spd.subtractMutate(gravityVector)
  }
}

export class OscillatingColorGravityVisitorFactory implements GravityVisitorFactory<OscillatingColorGravityVisitor> {
  constructor(private readonly gravityCoef: number) {}
  createInstance(particle: Particle): OscillatingColorGravityVisitor {
    return new OscillatingColorGravityVisitor(particle, this.gravityCoef)
  }
}
