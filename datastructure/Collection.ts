export interface ICollection<TElement> {
  elements: TElement[]
}

export default class Collection<TElement> implements ICollection<TElement> {
  public readonly elements: TElement[]

  constructor() {
    this.elements = []
  }
}
