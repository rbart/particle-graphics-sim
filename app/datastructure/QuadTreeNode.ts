import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'
import QuadTreeVisitor from '../state/mutation/QuadTreeVisitor'

export interface ICollection<TElement> extends Iterable<TElement> {

  add(element: TElement): void
  clear(): void
  isEmpty(): boolean

  [Symbol.iterator](): Iterator<TElement>
}

export class Collection<TElement> implements ICollection<TElement> {
  private readonly elements: TElement[]

  constructor() {
    this.elements = []
  }
  add(element: TElement): void {
    this.elements.push(element)
  }
  clear(): void {
    this.elements.length = 0
  }
  isEmpty(): boolean {
    return this.elements.length == 0
  }
  [Symbol.iterator](): Iterator<TElement> {
    return this.elements[Symbol.iterator]()
  }
}

export interface QuadTreeNode<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>> {

  origin: Vector2d
  extents: Vector2d
  collection: TCollection

  accept(visitor: QuadTreeVisitor<TElement, TCollection>): void
  add(element: TElement): void
  clear(): void
  contains(element: HasPosition2d): boolean,
}

export class QuadTreeLeafNode<
    TElement extends HasPosition2d,
    TCollection extends Collection<TElement>>
  implements QuadTreeNode<TElement, TCollection> {

  constructor(
    public readonly origin: Vector2d,
    public readonly extents: Vector2d,
    public readonly collection: TCollection) { }

  accept(visitor: QuadTreeVisitor<TElement, TCollection>) {
    visitor.visitLeaf(this)
  }

  add(element: TElement) {
    this.collection.add(element)
  }

  clear() {
    this.collection.clear()
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
  }

  accept(visitor: QuadTreeVisitor<TElement, TCollection>) {
    if (this.allChildrenEmpty) {
      visitor.visitLeaf(this)
    } else {
      visitor.visit(this)
    }
  }

  add(element: TElement) {
    if (this.collection.isEmpty()) {
      this.collection.add(element)
    }
    else if (this.allChildrenEmpty) {
      this.allChildrenEmpty = false
      for (let priorElement of this.collection) {
        this.add(priorElement)
      }
      this.collection.clear()
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

  *children(): Iterable<QuadTreeNode<TElement, TCollection>> {
    yield this.upperLeft
    yield this.upperRight
    yield this.lowerLeft
    yield this.lowerRight
  }

  clear() {
    if (!this.collection.isEmpty()) {
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
