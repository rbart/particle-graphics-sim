import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'

// export default class QuadTree<TElement extends HasPosition2d> {
//   private root: QuadTreeNode<TElement>
//   constructor(readonly extents: Vector2d) {
//     this.root = new QuadTreeLeafNode<TElement>(new Vector2d(0,0), extents)
//   }
//
//   add(element: TElement): void {
//     this.root = this.root.add(element)
//   }
// }

export default abstract class QuadTreeNode<TElement extends HasPosition2d> implements Iterable<TElement> {
  constructor(
    readonly origin: Vector2d,
    readonly extents: Vector2d) {}

  contains(position: Vector2d): boolean {
    return position.x >= this.origin.x &&
      position.x <= this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y <= this.origin.y + this.extents.y;
  }

  abstract add(element: TElement): QuadTreeNode<TElement>

  abstract [Symbol.iterator](): Iterator<TElement>
}
