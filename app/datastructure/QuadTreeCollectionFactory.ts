import Vector2d from "../state/Vector2d";

export default interface QuadTreeCollectionFactory<TCollection> {
  createInstance(origin: Vector2d, extents: Vector2d): TCollection
}
