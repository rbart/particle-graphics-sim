import HasPosition2d from '../state/HasPosition2d'
import { QuadTreeNode, QuadTreeLeafNode, QuadTreeInnerNode } from './QuadTreeNode'
import Collection from './Collection'
import QuadTreeCollectionFactory from './QuadTreeCollectionFactory'
import Rectangle from '../state/Rectangle'

export default class QuadTreeBuilder<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>> {

  constructor(
    private collectionFactory: QuadTreeCollectionFactory<TCollection>,
    private minNodeSize: number) { }

  build(bounds: Rectangle): QuadTreeNode<TElement, TCollection> {
    if (bounds.extents.length() >= this.minNodeSize) {
      let halfExtent = bounds.extents.multiply(0.5)
      let upperLeft = this.build(new Rectangle(bounds.origin, halfExtent))
      let upperRight = this.build(new Rectangle(bounds.origin.addX(halfExtent.x), halfExtent))
      let lowerLeft = this.build(new Rectangle(bounds.origin.addY(halfExtent.y), halfExtent))
      let lowerRight = this.build(new Rectangle(bounds.origin.add(halfExtent), halfExtent))

      return new QuadTreeInnerNode<TElement, TCollection>(
        bounds,
        this.collectionFactory.createInstance(bounds),
        upperLeft,
        upperRight,
        lowerLeft,
        lowerRight)

    } else {
      return new QuadTreeLeafNode<TElement, TCollection>(
        bounds, this.collectionFactory.createInstance(bounds))
    }
  }
}
