import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import { QuadTreeNode, QuadTreeLeafNode, QuadTreeInnerNode } from './QuadTreeNode'
import { Collection } from './QuadTreeNode'
import QuadTreeCollectionFactory from './QuadTreeCollectionFactory'

export default class QuadTreeBuilder<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>> {

  constructor(
    private collectionFactory: QuadTreeCollectionFactory<TCollection>,
    private minNodeSize: number) { }

  build(extents: Vector2d): QuadTreeNode<TElement, TCollection> {
    return this.buildImpl(new Vector2d(0,0), extents)
  }

  private buildImpl(origin: Vector2d, extents: Vector2d): QuadTreeNode<TElement, TCollection> {
    if (extents.length() >= this.minNodeSize) {
      let halfExtent = extents.multiply(0.5)
      let upperLeft = this.buildImpl(origin, halfExtent)
      let upperRight = this.buildImpl(origin.addX(halfExtent.x), halfExtent)
      let lowerLeft = this.buildImpl(origin.addY(halfExtent.y), halfExtent)
      let lowerRight = this.buildImpl(origin.add(halfExtent), halfExtent)

      return new QuadTreeInnerNode<TElement, TCollection>(
        origin,
        extents,
        this.collectionFactory.createInstance(origin, extents),
        upperLeft,
        upperRight,
        lowerLeft,
        lowerRight)

    } else {
      return new QuadTreeLeafNode<TElement, TCollection>(
        origin, extents, this.collectionFactory.createInstance(origin, extents))
    }
  }
}
