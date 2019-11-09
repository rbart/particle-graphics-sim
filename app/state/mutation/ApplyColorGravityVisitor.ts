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
      let frameCosine = Math.cos(this.frameNumber / 150)
      let frameCosine2 = Math.cos(this.frameNumber / 450)
      colorCosine = frameCosine2 * (frameCosine + (1-frameCosine)*colorCosine)
      let gravityStrength = (colorCosine * other.mass * this.gravityCoef)/diff.lengthSquared();
      let gravityVector = diff.multiply(gravityStrength);
      if (gravityVector.length() > 10) gravityVector.multiplyMutate(10 / gravityVector.length())
      this.particle.spd.subtractMutate(gravityVector)
    }
  }
}
