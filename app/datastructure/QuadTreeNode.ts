import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeVisitor from '../state/mutation/QuadTreeVisitor'

export interface ICollection<TElement> {
  elements: TElement[]
}

export class Collection<TElement> implements ICollection<TElement> {
  public readonly elements: TElement[]

  constructor() {
    this.elements = []
  }
}

export interface QuadTreeNode<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>> {

  origin: Vector2d
  extents: Vector2d
  collection: TCollection
  isEmpty: boolean

  accept(visitor: QuadTreeVisitor<TElement, TCollection>): void
  add(element: TElement): void
  clear(): void
  contains(element: HasPosition2d): boolean,
}

export class QuadTreeLeafNode<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>>
  implements QuadTreeNode<TElement, TCollection> {

  public isEmpty: boolean
  public elements: TElement[]

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d,
    public readonly collection: TCollection) {

    this.isEmpty = true
    this.elements = collection.elements // keep direct pointer for perf
  }

  accept(visitor: QuadTreeVisitor<TElement, TCollection>) {
    visitor.visitLeaf(this)
  }

  add(element: TElement) {
    this.isEmpty = false
    this.elements.push(element)
  }

  clear() {
    this.isEmpty = true
    this.elements.length = 0
  }

  contains(element: HasPosition2d): boolean {
    let position = element.position()
    return position.x >= this.origin.x &&
      position.x < this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y < this.origin.y + this.extents.y;
  }
}

export class QuadTreeInnerNode<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>>
  extends QuadTreeLeafNode<TElement, TCollection> {

  private allChildrenEmpty: boolean
  public readonly children: QuadTreeNode<TElement, TCollection>[]

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d,
    public readonly collection: TCollection,
    public readonly upperLeft: QuadTreeNode<TElement, TCollection>,
    public readonly upperRight: QuadTreeNode<TElement, TCollection>,
    public readonly lowerLeft: QuadTreeNode<TElement, TCollection>,
    public readonly lowerRight: QuadTreeNode<TElement, TCollection>) {

    super(origin, extents, collection)
    this.allChildrenEmpty = true
    this.children = [upperLeft, upperRight, lowerLeft, lowerRight]
  }

  accept(visitor: QuadTreeVisitor<TElement, TCollection>) {
    if (this.allChildrenEmpty) {
      visitor.visitLeaf(this)
    } else {
      visitor.visit(this)
    }
  }

  add(element: TElement) {
    if (this.isEmpty) {
      this.isEmpty = false
      super.add(element)
    }
    else if (this.allChildrenEmpty) {
      this.allChildrenEmpty = false
      for (let priorElement of this.elements) {
        this.add(priorElement)
      }
      this.clear()
      this.add(element)
    }
    else {
      for (let child of this.children) {
        if (child.contains(element)) {
          child.add(element)
          break
        }
      }
    }
  }

  clear() {
    if (!this.isEmpty) {
      super.clear()
    }
    if (!this.allChildrenEmpty) {
      for (let child of this.children) {
        child.clear()
      }
      this.allChildrenEmpty = true
    }
  }
}
