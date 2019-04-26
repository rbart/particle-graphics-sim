import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeNode from './QuadTreeNode'
import QuadTreeInternalNode from './QuadTreeInternalNode'

export default class QuadTreeLeafNode<TElement extends HasPosition2d> extends QuadTreeNode<TElement> {

  readonly elements: TElement[]

  constructor(readonly origin: Vector2d, readonly extents: Vector2d) {
    super(origin, extents)
    this.elements = []
  }

  add(newElement: TElement): QuadTreeNode<TElement> {
    if (this.elements.length == 0 ||
        this.elements.findIndex(element =>
          element.position().equals(newElement.position()))
        ) {
      this.elements.push(newElement);
      return this;
    } else {
      let halfExtent = this.extents.multiply(0.5)
      let upperLeft = new QuadTreeLeafNode<TElement>(this.origin, halfExtent)
      let upperRight = new QuadTreeLeafNode<TElement>(
        this.origin.addX(halfExtent.x), halfExtent)
      let lowerLeft = new QuadTreeLeafNode<TElement>(this.origin.addY(halfExtent.y), halfExtent)
      let lowerRight = new QuadTreeLeafNode<TElement>(this.origin.add(halfExtent), halfExtent)
      let newInternalNode = new QuadTreeInternalNode<TElement>(
        this.origin,
        this.extents,
        upperLeft,
        upperRight,
        lowerLeft,
        lowerRight);
      return newInternalNode;
    }
  }

  *[Symbol.iterator](): Iterator<TElement> {
    for (let element of this.elements) {
      yield element;
    }
  }
}
