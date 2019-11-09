import Particle from "../Particle"
import ApplyGravityVisitor from "./ApplyGravityVisitor"

export default class ApplyColorGravityVisitor extends ApplyGravityVisitor {

  protected apply(particles: Particle[]): void {
    for (let other of particles) {
      if (other == this.particle) continue
      let diff = this.particle.pos.subtract(other.pos);
      let colorCosine = this.particle.hue.cosineSimilarity(other.hue)
      let gravityStrength = (colorCosine * other.mass * this.gravityCoef)/diff.lengthSquared();
      let gravityVector = diff.multiply(gravityStrength);
      this.particle.spd.subtractMutate(gravityVector)
    }
  }
}
