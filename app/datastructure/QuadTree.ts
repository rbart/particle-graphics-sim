import HasPosition2d from '../state/HasPosition2d'
import Vector2d from '../state/Vector2d'

export default class QuadTree<TElement extends HasPosition2d> {
  private root: QuadTreeNode<TElement>
  constructor(readonly extents: Vector2d) {
    this.root = new QuadTreeLeafNode<TElement>(new Vector2d(0,0), extents)
  }

  add(element: TElement): void {
    this.root = this.root.add(element)
  }
}

abstract class QuadTreeNode<TElement extends HasPosition2d> {
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
}

class QuadTreeInternalNode<TElement extends HasPosition2d> extends QuadTreeNode<TElement> {
  constructor(
    readonly origin: Vector2d,
    readonly extents: Vector2d,
    readonly upperLeft: QuadTreeNode<TElement>,
    readonly upperRight: QuadTreeNode<TElement>,
    readonly lowerLeft: QuadTreeNode<TElement>,
    readonly lowerRight: QuadTreeNode<TElement>
  ) {
    super(origin, extents)
  }

  add(newElement: TElement): QuadTreeNode<TElement> {
    for (let child of this.children()) {
      if (child.contains(newElement.position())) {
        child.add(newElement);
        break;
      }
    }
    return this;
  }

  private children(): QuadTreeNode<TElement>[] {
    return [this.upperLeft, this.upperRight, this.lowerLeft, this.lowerRight]
  }
}

class QuadTreeLeafNode<TElement extends HasPosition2d> extends QuadTreeNode<TElement> {

  readonly elements: TElement[]

  constructor(
    readonly origin: Vector2d,
    readonly extents: Vector2d
  ) {
    super(origin, extents)
    this.elements = []
  }

  add(newElement: TElement): QuadTreeNode<TElement> {
    if (this.elements.length == 0 ||
        this.elements.findIndex(element =>
          element.position().equals(newElement.position()))
        ) {
      this.elements.push(newElement);
      return this;
    } else {
      let halfExtent = this.extents.multiply(0.5)
      let upperLeft = new QuadTreeLeafNode<TElement>(this.origin, halfExtent)
      let upperRight = new QuadTreeLeafNode<TElement>(
        this.origin.addX(halfExtent.x), halfExtent)
      let lowerLeft = new QuadTreeLeafNode<TElement>(this.origin.addY(halfExtent.y), halfExtent)
      let lowerRight = new QuadTreeLeafNode<TElement>(this.origin.add(halfExtent), halfExtent)
      let newInternalNode = new QuadTreeInternalNode<TElement>(
        this.origin,
        this.extents,
        upperLeft,
        upperRight,
        lowerLeft,
        lowerRight);
      return newInternalNode;
    }
  }
}

// export default class QuadTree<TElement extends HasPosition2d> { //} implements Iterable<T> {
//
//   element?: TElement
//
//   upperLeft?: QuadTree<TElement>
//   upperRight?: QuadTree<TElement>
//   lowerLeft?: QuadTree<TElement>
//   lowerRight?: QuadTree<TElement>
//
//   constructor(readonly origin: Vector2d, readonly extents: Vector2d) {}
//
//   contains(position: Vector2d): boolean {
//     return position.x >= this.origin.x &&
//       position.x <= this.origin.x + this.extents.x &&
//       position.y >= this.origin.y &&
//       position.y <= this.origin.y + this.extents.y;
//   }
//
//   private isEmptyLeaf(): boolean {
//     return this.element === undefined &&
//       this.upperLeft === undefined;
//   }
//
//   add(newElement: TElement): void {
//     if (this.isEmptyLeaf()) {
//       this.element = newElement
//     } else {
//       this.initializeChildren();
//       [newElement, this.element].forEach(element => {
//
//         this.upperLeft!.add(element!)
//       })
//     }
//   }
//
//   private initializeChildren() {
//     let halfExtent = this.extents.multiply(0.5)
//     this.upperLeft = new QuadTree<TElement>(this.origin, halfExtent)
//     this.upperRight = new QuadTree<TElement>(this.origin.addComponents(halfExtent.x, 0), halfExtent)
//     this.lowerLeft = new QuadTree<TElement>(this.origin.addComponents(0, halfExtent.y), halfExtent)
//     this.lowerRight = new QuadTree<TElement>(this.origin.add(halfExtent), halfExtent)
//   }
//
//   private children(): QuadTree<TElement>[] {
//     return [this.upperLeft, this.upperRight, this.lowerLeft, this.lowerRight]
//   }

  // [Symbol.iterator](): Iterator<T> {
  //   const iterator = {
  //     next(): IteratorResult<T> {
  //       return { done: true, value: undefined } as any as IteratorResult<T>;;
  //     }
  //   };
  //   return iterator;
  // }
//}
