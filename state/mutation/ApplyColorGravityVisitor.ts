import Particle from "../Particle"
import ApplyGravityVisitor from "./ApplyGravityVisitor"

export default class ApplyColorGravityVisitor extends ApplyGravityVisitor {

  constructor(
    protected readonly particle: Particle,
    protected readonly gravityCoef: number,
    protected readonly frameNumber: number)
  {
    super(particle, gravityCoef)
  }

  protected apply(particles: Particle[]): void {
    for (let other of particles) {
      if (other == this.particle) continue
      let diff = this.particle.pos.subtract(other.pos);
      let colorCosine = this.particle.hue.cosineSimilarity(other.hue)

      let colorFactorCosine = Math.cos(this.frameNumber / 151)
      // this controls how much color controls gravity
      colorCosine = (colorFactorCosine + (1-colorFactorCosine)*colorCosine)
      // this controls how often everything switches to negative

      let gravityPushPullCosine = Math.cos(this.frameNumber / 237)
      colorCosine *= -0.2 / (1.1 + gravityPushPullCosine) + 1


      //let frameCosine = Math.cos(this.frameNumber / 300)
      //let frameCosine2 = Math.cos(this.frameNumber / 600)
      //colorCosine = frameCosine2 * (frameCosine + (1-frameCosine)*colorCosine)
      let gravityStrength = (colorCosine * other.mass * this.gravityCoef)/diff.lengthSquared();
      let gravityVector = diff.multiply(gravityStrength);
      if (gravityVector.length() > 20) gravityVector.multiplyMutate(20 / gravityVector.length())
      this.particle.spd.subtractMutate(gravityVector)
    }
  }
}
