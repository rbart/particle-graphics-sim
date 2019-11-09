import Vector2d from "./Vector2d";
import HasPosition2d from "./HasPosition2d";

export default class Rectangle {

  constructor(
    public origin: Vector2d,
    public extents: Vector2d) { }

  contains(element: HasPosition2d): boolean {
    let position = element.position()
    return position.x >= this.origin.x &&
      position.x < this.origin.x + this.extents.x &&
      position.y >= this.origin.y &&
      position.y < this.origin.y + this.extents.y;
  }

  toString(): string {
    return `Rectangle: {origin: ${this.origin}, extents: ${this.extents}}`
  }
}
