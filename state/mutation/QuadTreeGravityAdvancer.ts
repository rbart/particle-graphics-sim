import Advancer from './Advancer'
import Particle from '../Particle'
import { QuadTreeNode } from '../../datastructure/QuadTreeNode'
import QuadTreeBuilder from '../../datastructure/QuadTreeBuilder'
import ParticleAggregationVisitor from './ParticleAggregationVisitor'
import ApplyGravityVisitor from './ApplyGravityVisitor'
import ParticleCollection, { ParticleCollectionFactory } from '../ParticleCollection'
import Rectangle from '../Rectangle'
import ApplyColorGravityVisitor from './ApplyColorGravityVisitor'

export default class QuadTreeGravityAdvancer implements Advancer {

  private static defaultMinNodeSizeFactor: number = (1 / 200)

  private quadTree: QuadTreeNode<Particle, ParticleCollection>
  private particleAggregator: ParticleAggregationVisitor

  private frame: number = 0

  constructor(
      readonly gravityCoef: number,
      readonly bounds: Rectangle,
      minNodeSizeFactor: number = QuadTreeGravityAdvancer.defaultMinNodeSizeFactor
    ) {

    let minNodeSize = bounds.extents.length() * minNodeSizeFactor

    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleCollection>(
      new ParticleCollectionFactory(), minNodeSize)

    this.quadTree = quadTreeBuilder.build(bounds)
    this.particleAggregator = new ParticleAggregationVisitor()
  }

  advance(particles: Particle[]): void {

    this.frame++
    if (this.frame % 100 == 0) {
       console.log("Frame: " + this.frame + " Cos: " + Math.cos(this.frame / 500))

    }

    this.quadTree.clear()

    for (let particle of particles) {
      this.quadTree.add(particle)
    }

    this.quadTree.accept(this.particleAggregator)

    for (let particle of particles) {
      let gravityVisitor = this.getGravityVisitor(particle)
      this.quadTree.accept(gravityVisitor)
    }
  }

  private getGravityVisitor(particle: Particle): ApplyGravityVisitor {
    return new ApplyColorGravityVisitor(particle, this.gravityCoef, this.frame)
    //return new ApplyGravityVisitor(particle, this.gravityCoef)
    // if (this.frame % 1000 > 500) {
    //   return new ApplyGravityVisitor(particle, this.gravityCoef)
    // } else {
    //   return new ApplyColorGravityVisitor(particle, this.gravityCoef, this.frame)
    // }
  }
}
