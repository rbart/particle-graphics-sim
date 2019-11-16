import Particle from "../Particle"
import ApplyGravityVisitor from "./ApplyGravityVisitor"
import GravityVisitorFactory from "./GravityVisitorFactory";

export default class ApplyColorGravityVisitor extends ApplyGravityVisitor {

  constructor(
    protected readonly particle: Particle,
    protected readonly gravityCoef: number) {

    super(particle, gravityCoef)
  }

  protected applyGravityFrom(other: Particle): void {
    let diff = this.particle.pos.subtract(other.pos);
    let colorCosine = this.particle.hue.cosineSimilarity(other.hue)
    let gravityStrength = (colorCosine * other.mass * this.gravityCoef)/diff.lengthSquared();
    let gravityVector = diff.multiply(gravityStrength);
    if (gravityVector.length() > 20) gravityVector.multiplyMutate(20 / gravityVector.length())
    this.particle.spd.subtractMutate(gravityVector)
  }
}

export class ApplyColorGravityVisitorFactory implements GravityVisitorFactory<ApplyColorGravityVisitor> {
  constructor(private readonly gravityCoef: number) {}
  createInstance(particle: Particle): ApplyColorGravityVisitor {
    return new ApplyColorGravityVisitor(particle, this.gravityCoef)
  }
}
