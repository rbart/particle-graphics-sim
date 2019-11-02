import Advancer from './Advancer'
import Particle from '../Particle'
import QuadTreeNode from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import { QuadTree, ParticleAggregate, ParticleAggregator } from '../../datastructure/QuadTreeBuilder'

import Vector2d from '../Vector2d'

export default class QuadTreeGravityAdvancer implements Advancer {

  private quadTree: QuadTree<Particle, ParticleAggregate, ParticleAggregator>

  constructor(readonly gravityCoef: number, readonly extents: Vector2d) {
    let aggregator = new ParticleAggregator()
    // divide the screen up into a roughly 20x20 grid at the leaf level.
    // TODO: move this into a builder and/or constants file.
    let minNodeSize = extents.length() / 20
    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleAggregate, ParticleAggregator>(
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
      this.applyGravityRecursive(particle, this.quadTree.root)
    }
  }

  private applyGravityRecursive(particle: Particle, node: QuadTreeNode<Particle, ParticleAggregate>) {
    if (node.isEmpty) return
    let contained = node.containsMore(particle)
    if (contained && node.isLeaf) {
      for (let other of node.elements) {
        if (other == particle) continue
        let diff = particle.pos.subtract(other.pos);
        let gravityStrength = 1.0/(diff.lengthSquared()) * this.gravityCoef;
        let gravityVector = diff.multiply(gravityStrength);
        particle.spd.subtractMutate(gravityVector)
      }
    } else if (contained) {
      for (let child of node.children()) {
        this.applyGravityRecursive(particle, child)
      }
    } else {
      // node does not contain child - recurse no further
      let totalMass = node.aggregate!.totalMass;
      let aggLength = node.aggregate!.centroid.length();
      if (totalMass == 0) return
      //if (aggLength == 0) return
      if (!isFinite(totalMass)) return
      if (!isFinite(aggLength)) return
      let diff = particle.pos.subtract(node.aggregate!.centroid)
      let gravityStrength = node.aggregate!.totalMass * 1.0/(diff.lengthSquared()) * this.gravityCoef;
      let gravityVector = diff.multiply(gravityStrength);
      particle.spd.subtractMutate(gravityVector)
    }
  }
}
