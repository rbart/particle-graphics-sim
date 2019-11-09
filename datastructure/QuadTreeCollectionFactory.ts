import Rectangle from "../state/Rectangle";

export default interface QuadTreeCollectionFactory<TCollection> {
  createInstance(bounds: Rectangle): TCollection
}
