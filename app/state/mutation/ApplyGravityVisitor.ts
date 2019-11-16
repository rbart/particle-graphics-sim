import Particle from "../Particle"
import QuadTreeVisitor from "../../datastructure/QuadTreeVisitor"
import { QuadTreeInnerNode, QuadTreeLeafNode } from "../../datastructure/QuadTreeNode"
import ParticleCollection from "../ParticleCollection"
import GravityVisitorFactory from "./GravityVisitorFactory"

export default class ApplyGravityVisitor implements QuadTreeVisitor<Particle, ParticleCollection> {

  constructor(protected readonly particle: Particle, protected readonly gravityCoef: number) { }

  visit(node: QuadTreeInnerNode<Particle, ParticleCollection>): void {
    if (node.isEmpty) return
    let canApplyAggregate = !node.collection.paddedBounds.contains(this.particle)
    if (!canApplyAggregate) {
      for (let child of node.children) {
        child.accept(this)
      }
    } else {
      this.apply([node.collection.aggregate])
    }
  }

  visitLeaf(node: QuadTreeLeafNode<Particle, ParticleCollection>): void {
    this.apply(node.elements)
  }

  protected apply(particles: Particle[]): void {
    for (let other of particles) {
      if (other == this.particle) continue
      this.applyGravityFrom(other)
    }
  }

  protected applyGravityFrom(other: Particle) {
    let diff = this.particle.pos.subtract(other.pos);
    let gravityStrength = other.mass/(diff.lengthSquared()) * this.gravityCoef;
    let gravityVector = diff.multiply(gravityStrength)
    this.particle.spd.subtractMutate(gravityVector)
  }
}

export class ApplyGravityVisitorFactory implements GravityVisitorFactory<ApplyGravityVisitor> {
  constructor(private readonly gravityCoef: number) {}
  createInstance(particle: Particle): ApplyGravityVisitor {
    return new ApplyGravityVisitor(particle, this.gravityCoef)
  }
}
