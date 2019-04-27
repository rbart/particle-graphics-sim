import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeNode from './QuadTreeNode'

export default class QuadTreeInternalNode<TElement extends HasPosition2d> extends QuadTreeNode<TElement> {
  constructor(
    readonly origin: Vector2d,
    readonly extents: Vector2d,
    public upperLeft: QuadTreeNode<TElement>,
    public upperRight: QuadTreeNode<TElement>,
    public lowerLeft: QuadTreeNode<TElement>,
    public lowerRight: QuadTreeNode<TElement>
  ) {
    super(origin, extents)
  }

  add(newElement: TElement): QuadTreeNode<TElement> {

    // if (!this.contains(newElement.position())) {
    //   throw newElement + " is not contained within " + this
    // }

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

  *allNodes(): Iterable<QuadTreeNode<TElement>> {
    for (let child of this.children()) {
      yield child
      for (let node of child.allNodes()) {
        yield node
      }
    }
  }

  *allLeafNodes(): Iterable<QuadTreeNode<TElement>> {
    for (let child of this.children()) {
      for (let node of child.allLeafNodes()) {
        yield node
      }
    }
  }

  *allNonIntersectingNodes(position: Vector2d): Iterable<QuadTreeNode<TElement>> {
    for (let child of this.children()) {
      if (!child.contains(position)) {
        for (let node of child.allNonIntersectingNodes(position)) {
          yield node
        }
      }
    }
  }

  private children(): QuadTreeNode<TElement>[] {
    return [this.upperLeft, this.upperRight, this.lowerLeft, this.lowerRight]
  }
}
