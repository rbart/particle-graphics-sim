import Advancer from './Advancer'
import Particle from '../Particle'
import { QuadTreeNode } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder, { Factory } from '../../datastructure/QuadTreeBuilder'
import Vector2d from '../Vector2d'
import ParticleAggregationVisitor from './ParticleAggregationVisitor'
import ApplyGravityVisitor from './ApplyGravityVisitor'
import ParticleCollection from '../ParticleCollection'

export default class QuadTreeGravityAdvancer implements Advancer {

  private quadTree: QuadTreeNode<Particle, ParticleCollection>
  private particleAggregator: ParticleAggregationVisitor

  constructor(readonly gravityCoef: number, readonly extents: Vector2d) {
    // TODO: move this into a builder and/or constants file.
    let minNodeSize = extents.length() / 80
    let collectionBuilder = <Factory<ParticleCollection>> {
      createInstance() { return new ParticleCollection() }
    }
    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleCollection>(
      collectionBuilder, minNodeSize)
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
