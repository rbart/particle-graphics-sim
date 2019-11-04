import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import { QuadTreeNode, QuadTreeLeafNode, QuadTreeInnerNode } from './QuadTreeNode'

export default class QuadTreeBuilder<TElement extends HasPosition2d> {

  constructor(private minNodeSize: number) { }

  // TODO just pass a rectangle
  build(extents: Vector2d): QuadTreeNode<TElement> {
    return this.buildImpl(new Vector2d(0,0), extents)
  }

  private buildImpl(origin: Vector2d, extents: Vector2d): QuadTreeNode<TElement> {
    if (extents.length() >= this.minNodeSize) {
      let halfExtent = extents.multiply(0.5)
      let upperLeft = this.buildImpl(origin, halfExtent)
      let upperRight = this.buildImpl(origin.addX(halfExtent.x), halfExtent)
      let lowerLeft = this.buildImpl(origin.addY(halfExtent.y), halfExtent)
      let lowerRight = this.buildImpl(origin.add(halfExtent), halfExtent)
      return new QuadTreeInnerNode<TElement>(
        origin, extents, upperLeft, upperRight, lowerLeft, lowerRight)
    } else {
      return new QuadTreeLeafNode<TElement>(origin, extents)
    }
  }
}
