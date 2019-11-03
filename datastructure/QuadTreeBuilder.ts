import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeNode from './QuadTreeNode'
import Particle from '../state/Particle'

export interface Aggregate<TElement> { }

export class ParticleAggregate implements Aggregate<Particle> {
  constructor(public centroid: Vector2d, public totalMass: number) { }
}

export interface Aggregator<TElement, TAggregate extends Aggregate<TElement>> {
  aggregate(elements: TElement[]): TAggregate
  combine(aggregates: Aggregate<TElement>[]): TAggregate
}

export class ParticleAggregator implements Aggregator<Particle, ParticleAggregate> {
  aggregate(particles: Particle[]): ParticleAggregate {
    let totalMass = 0
    let sumX = 0
    let sumY = 0
    for (let particle of particles) {
      totalMass += 1
      sumX += particle.pos.x
      sumY += particle.pos.y
    }
    let avgX = totalMass == 0 ? 0 : sumX / totalMass
    let avgY = totalMass == 0 ? 0 : sumY / totalMass
    return new ParticleAggregate(new Vector2d(avgX, avgY), totalMass)
  }
  combine(aggregates: ParticleAggregate[]): ParticleAggregate {
    let totalMass = 0
    let sumX = 0
    let sumY = 0
    for (let agg of aggregates) {
      if (agg.totalMass == 0) continue;
      totalMass += agg.totalMass
      sumX += agg.centroid.x * agg.totalMass
      sumY += agg.centroid.y * agg.totalMass
    }
    let avgX = sumX / totalMass
    let avgY = sumY / totalMass
    return new ParticleAggregate(new Vector2d(avgX, avgY), totalMass)
  }
}

export class QuadTree<
  TElement extends HasPosition2d,
  TAggregate extends Aggregate<TElement>,
  TAggregator extends Aggregator<TElement, TAggregate>> {

  constructor(public root: QuadTreeNode<TElement, TAggregate>, private aggregator: TAggregator) {}

  add(element: TElement) {
    this.addRecursive(element, this.root)
  }

  computeAggregates() {
    this.computeAggregatesRecursive(this.root)
  }

  clear() {
    this.clearRecursive(this.root)
  }

  private addRecursive(element: TElement, node: QuadTreeNode<TElement, TAggregate>) {
    node.isEmpty = false
    if (node.isLeaf) {
      node.elements.push(element)
    } else {
      let children = [node.upperLeft!, node.upperRight!, node.lowerLeft!, node.lowerRight!]
      for (let child of children) {
        if (child.contains(element)) {
          this.addRecursive(element, child);
          break;
        }
      }
    }
  }

  private computeAggregatesRecursive(node: QuadTreeNode<TElement, TAggregate>) {
    if (node.isEmpty) {
      node.aggregate = this.aggregator.aggregate(node.elements)
      return
    } else if (node.isLeaf) {
      node.aggregate = this.aggregator.aggregate(node.elements)
    } else {
      let children = node.children()
      for (let child of children) {
        this.computeAggregatesRecursive(child)
      }
      let childAggregates: Aggregate<TElement>[] = children.map(c => c.aggregate!)
      node.aggregate = this.aggregator.combine(childAggregates)
    }
  }

  private clearRecursive(node: QuadTreeNode<TElement, TAggregate>) {
    if (!node.isEmpty) {
      node.isEmpty = true
      if (!node.isLeaf) {
        for (let child of node.children()) {
          this.clearRecursive(child)
        }
      }
      node.elements = []
      node.aggregate = null;
    }
  }
}

export default class QuadTreeBuilder<
  TElement extends HasPosition2d,
  TAggregate extends Aggregate<TElement>,
  TAggregator extends Aggregator<TElement, TAggregate>> {

  constructor(private aggregator: TAggregator, private minNodeSize: number) {}

  build(extents: Vector2d): QuadTree<TElement, TAggregate, TAggregator> {
    return new QuadTree(this.buildImpl(new Vector2d(0,0), extents), this.aggregator);
  }

  private buildImpl(origin: Vector2d, extents: Vector2d): QuadTreeNode<TElement, TAggregate> {
    if (extents.length() >= this.minNodeSize) {
      let halfExtent = extents.multiply(0.5)
      let upperLeft = this.buildImpl(origin, halfExtent)
      let upperRight = this.buildImpl(origin.addX(halfExtent.x), halfExtent)
      let lowerLeft = this.buildImpl(origin.addY(halfExtent.y), halfExtent)
      let lowerRight = this.buildImpl(origin.add(halfExtent), halfExtent)
      return new QuadTreeNode<TElement, TAggregate>(
        origin, extents, upperLeft, upperRight, lowerLeft, lowerRight)
    } else {
      return new QuadTreeNode<TElement, TAggregate>(origin, extents)
    }
  }
}
