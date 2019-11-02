import HasPosition2d from '../state/HasPosition2d'
import { Aggregate } from './QuadTreeBuilder'
import Vector2d from '../state/Vector2d'

export default class QuadTreeNode<
  TElement extends HasPosition2d,
  TAggregate extends Aggregate<TElement>> {

  public elements: TElement[] = []
  public isLeaf: boolean;
  public aggregate: TAggregate | null = null
  public isEmpty: boolean = true
  public em: number // TODO rename this and move it into QuadTree

  constructor(
    public origin: Vector2d,
    public extents: Vector2d,
    public upperLeft: QuadTreeNode<TElement, TAggregate> | null = null,
    public upperRight: QuadTreeNode<TElement, TAggregate> | null = null,
    public lowerLeft: QuadTreeNode<TElement, TAggregate> | null = null,
    public lowerRight: QuadTreeNode<TElement, TAggregate> | null = null) {
      this.isLeaf = upperLeft == null && upperRight == null && lowerLeft == null && lowerRight == null
      this.em = extents.length() / 5
    }

  children(): QuadTreeNode<TElement, TAggregate>[] {
    if (this.isLeaf) return []
    else return [this.upperLeft!, this.upperRight!, this.lowerLeft!, this.lowerRight!]
  }

  contains(element: HasPosition2d): boolean {
    let position = element.position()
    return position.x >= this.origin.x &&
      position.x < this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y < this.origin.y + this.extents.y;
  }

  containsMore(element: HasPosition2d): boolean {
    let position = element.position()
    let num = this.em
    return position.x >= this.origin.x - num &&
      position.x < this.origin.x + this.extents.x + num &&
      position.y >= this.origin.y - num &&
      position.y < this.origin.y + this.extents.y + num;
  }
}
