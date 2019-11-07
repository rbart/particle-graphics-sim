import Advancer from './Advancer'
import Particle from '../Particle'
import { QuadTreeNode } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import Vector2d from '../Vector2d'
import ParticleAggregationVisitor from './ParticleAggregationVisitor'
import ApplyGravityVisitor from './ApplyGravityVisitor'
import ParticleCollection, { ParticleCollectionFactory } from '../ParticleCollection'

export default class QuadTreeGravityAdvancer implements Advancer {

  private static defaultMinNodeSizeFactor: number = (1 / 80)

  private quadTree: QuadTreeNode<Particle, ParticleCollection>
  private particleAggregator: ParticleAggregationVisitor

  constructor(
      readonly gravityCoef: number,
      readonly extents: Vector2d,
      minNodeSizeFactor: number = QuadTreeGravityAdvancer.defaultMinNodeSizeFactor
    ) {

    let minNodeSize = extents.length() * minNodeSizeFactor

    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleCollection>(
      new ParticleCollectionFactory(), minNodeSize)

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
