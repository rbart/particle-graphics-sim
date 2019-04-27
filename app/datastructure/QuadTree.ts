import QuadTreeNode from './QuadTreeNode'
import QuadTreeLeafNode from './QuadTreeLeafNode'
import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'

export default class QuadTree<TElement extends HasPosition2d> implements Iterable<TElement> {

  private root: QuadTreeNode<TElement>

  constructor(readonly origin: Vector2d, readonly extents: Vector2d) {
    this.root = new QuadTreeLeafNode<TElement>(origin, extents)
  }

  add(element: TElement): void {
    this.root = this.root.add(element)
  }

  [Symbol.iterator](): Iterator<TElement> {
    return this.root[Symbol.iterator]()
  }

  allNodes(): Iterator<QuadTreeNode<TElement>> {
    return this.root.allNodes();
  }

  allNonIntersectingNodes(position: Vector2d): Iterator<QuadTreeNode<TElement>> {
    return this.root.allNonIntersectingNodes(position)
  }
}
