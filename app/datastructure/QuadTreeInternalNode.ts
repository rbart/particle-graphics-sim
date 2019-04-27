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
    if (this.upperLeft.contains(newElement.position())) {
      this.upperLeft = this.upperLeft.add(newElement);
    }
    else if (this.upperRight.contains(newElement.position())) {
      this.upperRight = this.upperRight.add(newElement);
    }
    else if (this.lowerLeft.contains(newElement.position())) {
      this.lowerLeft = this.lowerLeft.add(newElement);
    }
    else if (this.lowerRight.contains(newElement.position())) {
      this.lowerRight = this.lowerRight.add(newElement);
    }
    return this;
  }

  *[Symbol.iterator](): Iterator<TElement> {
    for (let child of this.children()) {
      for (let element of child) {
        yield element;
      }
    }
  }

  *allNodes(): Iterator<QuadTreeNode<TElement>> {
    for (let child of this.children()) {
      yield child;
    }
  }

  *allNonIntersectingNodes(position: Vector2d): Iterator<QuadTreeNode<TElement>> {
    for (let child of this.children()) {
      if (!this.contains(position)) {
        yield(this)
      }
    }
  }

  private children(): QuadTreeNode<TElement>[] {
    return [this.upperLeft, this.upperRight, this.lowerLeft, this.lowerRight]
  }
}
