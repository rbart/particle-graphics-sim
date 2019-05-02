import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'

export default class QuadTreeNode<TElement extends HasPosition2d> {

  public elements: TElement[] | null = null
  public upperLeft: QuadTreeNode<TElement> | null = null
  public upperRight: QuadTreeNode<TElement> | null = null
  public lowerLeft: QuadTreeNode<TElement> | null = null
  public lowerRight: QuadTreeNode<TElement> | null = null
  public isLeaf: boolean = true

  constructor(
    public origin: Vector2d,
    public extents: Vector2d) { }

  contains(position: Vector2d): boolean {
    return position.x >= this.origin.x &&
      position.x < this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y < this.origin.y + this.extents.y;
  }

  add(element: TElement): void {
    if (this.elements == null) {
      this.elements = [element]
    } else {
      this.elements.push(element);

      if (!this.allSamePosition(element) && !this.tooSmallExtents()) {
        if (this.isLeaf) {
          this.isLeaf = false
          this.initializeChildren()
          this.elements.forEach(el => this.addToChildren(el))
        } else {
          this.addToChildren(element)
        }
      }
    }
  }

  private initializeChildren(): void {
    let halfExtent = this.extents.multiply(0.5)
    this.upperLeft = new QuadTreeNode<TElement>(this.origin, halfExtent)
    this.upperRight = new QuadTreeNode<TElement>(this.origin.addX(halfExtent.x), halfExtent)
    this.lowerLeft = new QuadTreeNode<TElement>(this.origin.addY(halfExtent.y), halfExtent)
    this.lowerRight = new QuadTreeNode<TElement>(this.origin.add(halfExtent), halfExtent)
  }

  private addToChildren(element: TElement) {
    if (this.upperLeft!.contains(element.position())) {
      this.upperLeft!.add(element);
    }
    else if (this.upperRight!.contains(element.position())) {
      this.upperRight!.add(element);
    }
    else if (this.lowerLeft!.contains(element.position())) {
      this.lowerLeft!.add(element);
    }
    else if (this.lowerRight!.contains(element.position())) {
      this.lowerRight!.add(element);
    }
  }

  private allSamePosition(element: TElement): boolean {
    return this.elements!.every(e => e.position().equals(element.position()))
  }

  private tooSmallExtents() {
    return this.extents.length() < 10
  }

  containingNode(position: Vector2d): QuadTreeNode<TElement> | null {
    if (this.isLeaf) {
      return this
    } else {
      for (let child of this.children()) {
        if (child.contains(position)) {
          return child.containingNode(position)
        }
      }
      return null;
    }
  }

  allLeafNodes(): QuadTreeNode<TElement>[] {
    if (this.isLeaf) {
      if (this.elements != null) {
        return [this]
      } else {
        return []
      }
    } else {
      return this.children().map(child => child.allLeafNodes()).reduce((a,b) => a.concat(b))
    }
  }

  allNonIntersectingNodes(position: Vector2d): QuadTreeNode<TElement>[] {
    if (!this.contains(position) && this.elements != null && this.extents.x < 200) {
      return [this]
    }
    else if (!this.isLeaf) {
      return this.children().map(child => child.allNonIntersectingNodes(position)).reduce((a,b) => a.concat(b))
    } else {
      return []
    }
  }

  private children_memo: QuadTreeNode<TElement>[] | null = null;
  private children(): QuadTreeNode<TElement>[] {
    if (this.children_memo == null) {
     this.children_memo = [this.upperLeft!, this.upperRight!, this.lowerLeft!, this.lowerRight!]
   }
   return this.children_memo!
  }

  // abstract [Symbol.iterator](): Iterator<TElement>
  //
  // abstract allNodes(): Iterable<QuadTreeNode<TElement>>
  //
  // abstract allLeafNodes(): Iterable<QuadTreeNode<TElement>>
  //
  // abstract allNonIntersectingNodes(position: Vector2d): Iterable<QuadTreeNode<TElement>>
}
