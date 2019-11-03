import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'

export interface Visitor <TElement extends HasPosition2d> {
  visit(node: QuadTreeNode<TElement>): void
  visitLeaf(node: QuadTreeLeafNode<TElement>): void
}

export interface IQuadTreeNode<TElement extends HasPosition2d> {
  origin: Vector2d
  extents: Vector2d
  isEmpty: boolean
  elements: TElement[]
  aggregate: TElement | null
  accept(visitor: Visitor<TElement>): void
  add(element: TElement): void
  clear(): void
  contains(element: HasPosition2d): boolean,
}

export class QuadTreeLeafNode<TElement extends HasPosition2d> implements IQuadTreeNode<TElement> {
  public elements: TElement[] = []
  public aggregate: TElement | null = null
  public isEmpty: boolean = true

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d) { }

  accept(visitor: Visitor<TElement>) {
    visitor.visitLeaf(this)
  }

  add(element: TElement) {
    this.isEmpty = false
    this.elements.push(element)
  }

  clear() {
    this.elements.length = 0
    this.aggregate = null
    this.isEmpty = true
  }

  contains(element: HasPosition2d): boolean {
    let position = element.position()
    return position.x >= this.origin.x &&
      position.x < this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y < this.origin.y + this.extents.y;
  }
}

export class QuadTreeNode<TElement extends HasPosition2d>
  extends QuadTreeLeafNode<TElement> implements IQuadTreeNode<TElement> {

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d,
    public readonly upperLeft: IQuadTreeNode<TElement>,
    public readonly upperRight: IQuadTreeNode<TElement>,
    public readonly lowerLeft: IQuadTreeNode<TElement>,
    public readonly lowerRight: IQuadTreeNode<TElement>) {

    super(origin, extents)
  }

  accept(visitor: Visitor<TElement>) {
    visitor.visit(this)
  }

  add(element: TElement) {
    this.isEmpty = false
    for (let child of this.children()) {
      if (child.contains(element)) {
        child.add(element)
        break
      }
    }
  }

  *children(): Iterable<IQuadTreeNode<TElement>> {
    yield this.upperLeft
    yield this.upperRight
    yield this.lowerLeft
    yield this.lowerRight
  }

  clear() {
    super.clear()
    for (let child of this.children()) {
      child.clear()
    }
  }
}
