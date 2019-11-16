import Advancer from './Advancer'
import Particle from '../Particle'
import { QuadTreeNode } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import ParticleAggregationVisitor from './ParticleAggregationVisitor'
import ParticleCollection, { ParticleCollectionFactory } from '../ParticleCollection'
import Rectangle from '../Rectangle'
import GravityVisitorFactory from './GravityVisitorFactory'
import QuadTreeVisitor from '../../datastructure/QuadTreeVisitor'

export default class QuadTreeGravityAdvancer
  <TGravityVisitor extends QuadTreeVisitor<Particle, ParticleCollection>>
  implements Advancer {

  private quadTree: QuadTreeNode<Particle, ParticleCollection>
  private particleAggregator: ParticleAggregationVisitor

  constructor(
      readonly bounds: Rectangle,
      readonly gravityVisitorFactory: GravityVisitorFactory<TGravityVisitor>,
      minNodeSizeFactor: number
    ) {

    let minNodeSize = bounds.extents.length() * minNodeSizeFactor

    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleCollection>(
      new ParticleCollectionFactory(), minNodeSize)

    this.quadTree = quadTreeBuilder.build(bounds)
    this.particleAggregator = new ParticleAggregationVisitor()
  }

  advance(particles: Particle[]): void {
    this.quadTree.clear()
    for (let particle of particles) {
      this.quadTree.add(particle)
    }
    this.quadTree.accept(this.particleAggregator)
    for (let particle of particles) {
      let gravityVisitor = this.gravityVisitorFactory.createInstance(particle)
      this.quadTree.accept(gravityVisitor)
    }
  }
}

import AdvancerFactory from './AdvancerFactory'

export class QuadTreeGravityAdvancerFactory
  <TGravityVisitor extends QuadTreeVisitor<Particle, ParticleCollection>>
  implements AdvancerFactory {

  private static defaultMinNodeSizeFactor: number = (1 / 200)

  constructor(
    readonly gravityVisitorFactory: GravityVisitorFactory<TGravityVisitor>,
    readonly minNodeSizeFactor: number = QuadTreeGravityAdvancerFactory.defaultMinNodeSizeFactor) { }

  createInstance(bounds: Rectangle): QuadTreeGravityAdvancer<TGravityVisitor> {
    return new QuadTreeGravityAdvancer(bounds, this.gravityVisitorFactory, this.minNodeSizeFactor)
  }
}
