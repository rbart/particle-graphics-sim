import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeVisitor from '../state/mutation/QuadTreeVisitor'

export interface QuadTreeNode<TElement extends HasPosition2d> {
  origin: Vector2d
  extents: Vector2d
  isEmpty: boolean
  elements: TElement[]
  aggregate: TElement | null
  accept(visitor: QuadTreeVisitor<TElement>): void
  add(element: TElement): void
  clear(): void
  contains(element: HasPosition2d): boolean,
}

export class QuadTreeLeafNode<TElement extends HasPosition2d> implements QuadTreeNode<TElement> {
  public elements: TElement[] = []
  public aggregate: TElement | null = null
  public isEmpty: boolean = true

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d) { }

  accept(visitor: QuadTreeVisitor<TElement>) {
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

export class QuadTreeInnerNode<TElement extends HasPosition2d>
  extends QuadTreeLeafNode<TElement> implements QuadTreeNode<TElement> {

  private allChildrenEmpty: boolean

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d,
    public readonly upperLeft: QuadTreeNode<TElement>,
    public readonly upperRight: QuadTreeNode<TElement>,
    public readonly lowerLeft: QuadTreeNode<TElement>,
    public readonly lowerRight: QuadTreeNode<TElement>) {

    super(origin, extents)
    this.allChildrenEmpty = true
  }

  accept(visitor: QuadTreeVisitor<TElement>) {
    if (this.allChildrenEmpty) {
      visitor.visitLeaf(this)
    } else {
      visitor.visit(this)
    }
  }

  add(element: TElement) {
    if (this.isEmpty) {
      this.isEmpty = false
      this.elements.push(element)
    }
    else if (this.allChildrenEmpty) {
      this.allChildrenEmpty = false
      for (let priorElement of this.elements) {
        this.add(priorElement)
      }
      this.elements.length = 0
      this.add(element)
    }
    else {
      for (let child of this.children()) {
        if (child.contains(element)) {
          child.add(element)
          break
        }
      }
    }
  }

  *children(): Iterable<QuadTreeNode<TElement>> {
    yield this.upperLeft
    yield this.upperRight
    yield this.lowerLeft
    yield this.lowerRight
  }

  clear() {
    if (!this.isEmpty) {
      super.clear()
    }
    if (!this.allChildrenEmpty) {
      for (let child of this.children()) {
        child.clear()
      }
      this.allChildrenEmpty = true
    }
  }
}
