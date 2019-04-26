import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeNode from './QuadTreeNode'

export default class QuadTreeInternalNode<TElement extends HasPosition2d> extends QuadTreeNode<TElement> {
  constructor(
    readonly origin: Vector2d,
    readonly extents: Vector2d,
    readonly upperLeft: QuadTreeNode<TElement>,
    readonly upperRight: QuadTreeNode<TElement>,
    readonly lowerLeft: QuadTreeNode<TElement>,
    readonly lowerRight: QuadTreeNode<TElement>
  ) {
    super(origin, extents)
  }

  add(newElement: TElement): QuadTreeNode<TElement> {
    for (let child of this.children()) {
      if (child.contains(newElement.position())) {
        child.add(newElement);
        break;
      }
    }
    return this;
  }

  *[Symbol.iterator](): Iterator<TElement> {
    for (let child of this.children()) {
      for (let element of this.upperLeft) {
        yield element;
      }
    }
  }

  private children(): QuadTreeNode<TElement>[] {
    return [this.upperLeft, this.upperRight, this.lowerLeft, this.lowerRight]
  }
}
