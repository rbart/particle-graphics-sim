import Particle from "../Particle"
import QuadTreeVisitor from "../../datastructure/QuadTreeVisitor"
import { QuadTreeInnerNode, QuadTreeLeafNode } from "../../datastructure/QuadTreeNode"
import ParticleCollection from "../ParticleCollection"

export default class ApplyGravityVisitor implements QuadTreeVisitor<Particle, ParticleCollection> {

  constructor(private readonly particle: Particle, private readonly gravityCoef: number) { }

  visit(node: QuadTreeInnerNode<Particle, ParticleCollection>): void {
    if (node.isEmpty) return
    let canApplyAggregate = node.collection.canApplyAggregate(this.particle)
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

  private apply(particles: Particle[]): void {
    for (let other of particles) {
      if (other == this.particle) continue
      let diff = this.particle.pos.subtract(other.pos);
      let gravityStrength = other.mass/(diff.lengthSquared()) * this.gravityCoef;
      let gravityVector = diff.multiply(gravityStrength);
      this.particle.spd.subtractMutate(gravityVector)
    }
  }
}
