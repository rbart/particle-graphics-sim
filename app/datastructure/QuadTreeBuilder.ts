import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import Vector3d from '../state/Vector3d'
import { IQuadTreeNode, QuadTreeLeafNode, QuadTreeNode } from './QuadTreeNode'
import Particle from '../state/Particle'
import { Visitor }  from './QuadTreeNode'

export class ParticleAggregatorVisitor implements Visitor<Particle> {

  visit(node: QuadTreeNode<Particle>): void {
    if (node.isEmpty) {
      return
    }
    let childAggregates: Particle[] = []
    for (let child of node.children()) {
      if (!child.isEmpty) {
        child.accept(this)
        childAggregates.push(child.aggregate!)
      }
    }
    node.aggregate = this.aggregate(childAggregates)
  }

  visitLeaf(node: QuadTreeLeafNode<Particle>): void {
    if (node.isEmpty) return
    node.aggregate = this.aggregate(node.elements)
  }

  private aggregate(particles: Particle[]): Particle {
    let totalMass = 0
    let sumX = 0
    let sumY = 0
    for (let particle of particles) {
      totalMass += particle.mass
      sumX += particle.pos.x * particle.mass
      sumY += particle.pos.y * particle.mass
    }
    let avgX = totalMass == 0 ? 0 : sumX / totalMass
    let avgY = totalMass == 0 ? 0 : sumY / totalMass
    // TODO aggregate all the fields properly
    return new Particle(new Vector2d(avgX, avgY), new Vector2d(0, 0), totalMass, totalMass, new Vector3d(0, 0, 0))
  }
}

export class QuadTree<
  TElement extends HasPosition2d,
  TAggregator extends Visitor<TElement>> {

  constructor(public root: IQuadTreeNode<TElement>, private aggregator: TAggregator) {}

  add(element: TElement) {
    this.root.add(element)
  }

  computeAggregates() {
    this.root.accept(this.aggregator)
  }

  clear() {
    this.root.clear()
  }
}

export default class QuadTreeBuilder<
  TElement extends HasPosition2d,
  TAggregator extends Visitor<TElement>> {

  constructor(private aggregator: TAggregator, private minNodeSize: number) {}

  build(extents: Vector2d): QuadTree<TElement, TAggregator> {
    return new QuadTree(this.buildImpl(new Vector2d(0,0), extents), this.aggregator);
  }

  private buildImpl(origin: Vector2d, extents: Vector2d): IQuadTreeNode<TElement> {
    if (extents.length() >= this.minNodeSize) {
      let halfExtent = extents.multiply(0.5)
      let upperLeft = this.buildImpl(origin, halfExtent)
      let upperRight = this.buildImpl(origin.addX(halfExtent.x), halfExtent)
      let lowerLeft = this.buildImpl(origin.addY(halfExtent.y), halfExtent)
      let lowerRight = this.buildImpl(origin.add(halfExtent), halfExtent)
      return new QuadTreeNode<TElement>(
        origin, extents, upperLeft, upperRight, lowerLeft, lowerRight)
    } else {
      return new QuadTreeLeafNode<TElement>(origin, extents)
    }
  }
}
