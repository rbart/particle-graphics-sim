import Advancer from './Advancer'
import Particle from '../Particle'
import { IQuadTreeNode, QuadTreeNode, QuadTreeLeafNode, Visitor } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import { QuadTree, ParticleAggregatorVisitor } from '../../datastructure/QuadTreeBuilder'

import Vector2d from '../Vector2d'

class GravityVisitor implements Visitor<Particle> {

  constructor(private readonly particle: Particle, private readonly gravityCoef: number) { }

  visit(node: QuadTreeNode<Particle>): void {
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

  private canApplyAggregate(node: IQuadTreeNode<Particle>): boolean {
    let position = this.particle.position()
    let bufferWidth = Math.max(node.extents.x, node.extents.y) / 4
    let contains = position.x >= node.origin.x - bufferWidth &&
      position.x < node.origin.x + node.extents.x + bufferWidth &&
      position.y >= node.origin.y - bufferWidth &&
      position.y < node.origin.y + node.extents.y + bufferWidth
    return !contains
  }
}

export default class QuadTreeGravityAdvancer implements Advancer {

  private quadTree: QuadTree<Particle, ParticleAggregatorVisitor>

  constructor(readonly gravityCoef: number, readonly extents: Vector2d) {
    let aggregator = new ParticleAggregatorVisitor()
    // divide the screen up into a roughly 20x20 grid at the leaf level.
    // TODO: move this into a builder and/or constants file.
    let minNodeSize = extents.length() / 20
    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleAggregatorVisitor>(
      aggregator, minNodeSize)
    this.quadTree = quadTreeBuilder.build(extents)
  }

  advance(particles: Particle[]): void {

    this.quadTree.clear()

    for (let particle of particles) {
      this.quadTree.add(particle)
    }

    this.quadTree.computeAggregates()

    for (let particle of particles) {
      let gravityVisitor = new GravityVisitor(particle, this.gravityCoef)
      this.quadTree.root.accept(gravityVisitor)
    }
  }
}
