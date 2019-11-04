import Advancer from './Advancer'
import Particle from '../Particle'
import { QuadTreeNode } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import Vector2d from '../Vector2d'
import ParticleAggregationVisitor from './ParticleAggregationVisitor'
import GravityVisitor from './ApplyGravityVisitor'

export default class QuadTreeGravityAdvancer implements Advancer {

  private quadTree: QuadTreeNode<Particle>
  private particleAggregator: ParticleAggregationVisitor

  constructor(readonly gravityCoef: number, readonly extents: Vector2d) {
    // divide the screen up into a roughly 20x20 grid at the leaf level.
    // TODO: move this into a builder and/or constants file.
    let minNodeSize = extents.length() / 20
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
      let gravityVisitor = new GravityVisitor(particle, this.gravityCoef)
      this.quadTree.accept(gravityVisitor)
    }
  }
}
