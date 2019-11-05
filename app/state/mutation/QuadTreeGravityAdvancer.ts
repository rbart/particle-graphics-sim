import Advancer from './Advancer'
import Particle from '../Particle'
import { QuadTreeNode } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import Vector2d from '../Vector2d'
import ParticleAggregationVisitor from './ParticleAggregationVisitor'
import ApplyGravityVisitor from './ApplyGravityVisitor'

export default class QuadTreeGravityAdvancer implements Advancer {

  private quadTree: QuadTreeNode<Particle>
  private particleAggregator: ParticleAggregationVisitor

  constructor(readonly gravityCoef: number, readonly extents: Vector2d) {
    // TODO: move this into a builder and/or constants file.
    let minNodeSize = extents.length() / 80
    let quadTreeBuilder = new QuadTreeBuilder<Particle>(minNodeSize)
    this.quadTree = quadTreeBuilder.build(extents)
    this.particleAggregator = new ParticleAggregationVisitor()
  }

  advance(particles: Particle[]): void {

    this.quadTree.clear()

    for (let particle of particles) {
      this.quadTree.add(particle)
    }

    this.quadTree.accept(this.particleAggregator)

    for (let particle of particles) {
      let gravityVisitor = new ApplyGravityVisitor(particle, this.gravityCoef)
      this.quadTree.accept(gravityVisitor)
    }
  }
}
