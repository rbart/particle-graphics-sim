import HasPosition2d from '../state/HasPosition2d'
import { Aggregate } from './QuadTreeBuilder'
import Vector2d from '../state/Vector2d'

export default class QuadTreeNode<
  TElement extends HasPosition2d,
  TAggregate extends Aggregate<TElement>> {

  public elements: TElement[] = []
  public isLeaf: boolean;
  public cachedAggregate: TAggregate | null = null

  constructor(
    public origin: Vector2d,
    public extents: Vector2d,
    public upperLeft: QuadTreeNode<TElement, TAggregate> | null = null,
    public upperRight: QuadTreeNode<TElement, TAggregate> | null = null,
    public lowerLeft: QuadTreeNode<TElement, TAggregate> | null = null,
    public lowerRight: QuadTreeNode<TElement, TAggregate> | null = null) {
      this.isLeaf = upperLeft == null && upperRight == null && lowerLeft == null && lowerRight == null
    }

  children(): QuadTreeNode<TElement, TAggregate>[] {
    if (this.isLeaf) return []
    else return [this.upperLeft!, this.upperRight!, this.lowerLeft!, this.lowerRight!]
  }

  contains(position: Vector2d): boolean {
    return position.x >= this.origin.x &&
      position.x < this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y < this.origin.y + this.extents.y;
  }

  // containingNode(position: Vector2d): QuadTreeNode<TElement> | null {
  //   if (this.isLeaf) {
  //     return this
  //   } else {
  //     for (let child of this.children()) {
  //       if (child.contains(position)) {
  //         return child.containingNode(position)
  //       }
  //     }
  //     return null;
  //   }
  // }

  // allNonIntersectingNodes(position: Vector2d): QuadTreeNode<TElement>[] {
  //   if (!this.contains(position) && this.elements != null && this.extents.x < 200) {
  //     return [this]
  //   }
  //   else if (!this.isLeaf) {
  //     return [...this.children()].map(child => child.allNonIntersectingNodes(position)).reduce((a,b) => a.concat(b))
  //   } else {
  //     return []
  //   }
  // }

  // abstract [Symbol.iterator](): Iterator<TElement>
  //
  // abstract allNodes(): Iterable<QuadTreeNode<TElement>>
  //
  // abstract allLeafNodes(): Iterable<QuadTreeNode<TElement>>
  //
  // abstract allNonIntersectingNodes(position: Vector2d): Iterable<QuadTreeNode<TElement>>
}
