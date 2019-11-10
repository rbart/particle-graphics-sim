import Particle from "../Particle"
import ApplyGravityVisitor from "./ApplyGravityVisitor"

export default class ApplyColorGravityVisitor extends ApplyGravityVisitor {

  colorFactorCosine: number
  gravityPushPullCosine: number

  constructor(
    protected readonly particle: Particle,
    protected readonly gravityCoef: number,
    protected readonly frameNumber: number)
  {
    super(particle, gravityCoef)
    this.colorFactorCosine = Math.cos(this.frameNumber / 151)
    this.gravityPushPullCosine = Math.cos(this.frameNumber / 237)
    this.gravityPushPullCosine = -0.2 / (1.1 + this.gravityPushPullCosine) + 1
  }

  protected apply(particles: Particle[]): void {
    for (let other of particles) {
      if (other == this.particle) continue
      let diff = this.particle.pos.subtract(other.pos);
      let colorCosine = this.particle.hue.cosineSimilarity(other.hue)
      colorCosine = (this.colorFactorCosine + (1-this.colorFactorCosine)*colorCosine)
      colorCosine *= this.gravityPushPullCosine
      let gravityStrength = (colorCosine * other.mass * this.gravityCoef)/diff.lengthSquared();
      let gravityVector = diff.multiply(gravityStrength);
      if (gravityVector.length() > 20) gravityVector.multiplyMutate(20 / gravityVector.length())
      this.particle.spd.subtractMutate(gravityVector)
    }
  }
}
