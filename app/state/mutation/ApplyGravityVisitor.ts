import Particle from "../Particle"
import QuadTreeVisitor from "./QuadTreeVisitor"
import { QuadTreeInnerNode, QuadTreeLeafNode, QuadTreeNode } from "../../datastructure/QuadTreeNode"

export default class ApplyGravityVisitor implements QuadTreeVisitor<Particle> {

  constructor(private readonly particle: Particle, private readonly gravityCoef: number) { }

  visit(node: QuadTreeInnerNode<Particle>): void {
    if (node.isEmpty) return
    let canApplyAggregate = this.canApplyAggregate(node)
    if (!canApplyAggregate) {
      for (let child of node.children()) {
        child.accept(this)
      }
    } else {
      this.apply([node.aggregate!])
    }
  }

  visitLeaf(node: QuadTreeLeafNode<Particle>): void {
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

  private canApplyAggregate(node: QuadTreeNode<Particle>): boolean {
    let position = this.particle.position()
    let bufferWidth = Math.max(node.extents.x, node.extents.y) / 4
    let contains = position.x >= node.origin.x - bufferWidth &&
      position.x < node.origin.x + node.extents.x + bufferWidth &&
      position.y >= node.origin.y - bufferWidth &&
      position.y < node.origin.y + node.extents.y + bufferWidth
    return !contains
  }
}
