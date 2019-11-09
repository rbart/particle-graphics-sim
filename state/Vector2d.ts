import HasPosition2d from "./HasPosition2d";

export default class Vector2d implements HasPosition2d {

  constructor(
    public x: number,
    public y: number) { }

    position(): Vector2d {
      return this
    }

    equals(other: Vector2d): boolean {
      return this.x == other.x && this.y == other.y;
    }

    addX(x: number): Vector2d {
      return new Vector2d(this.x+x, this.y);
    }

    addY(y: number): Vector2d {
      return new Vector2d(this.x, this.y+y);
    }

    add(other: Vector2d): Vector2d {
      return new Vector2d(this.x+other.x, this.y+other.y);
    }

    addMutate(other: Vector2d): void {
      this.x += other.x;
      this.y += other.y;
    }

    subtract(other: Vector2d): Vector2d {
      return new Vector2d(this.x-other.x, this.y-other.y);
    }

    subtractMutate(other: Vector2d): void {
      this.x -= other.x;
      this.y -= other.y;
    }

    multiply(scalar: number): Vector2d {
      return new Vector2d(this.x * scalar, this.y * scalar);
    }

    multiplyMutate(scalar: number) {
      this.x *= scalar
      this.y *= scalar
    }

    divideMutate(scalar: number) {
      this.x /= scalar
      this.y /= scalar
    }

    lengthSquared(): number {
      return this.x * this.x + this.y * this.y
    }

    length(): number {
      return Math.sqrt(this.lengthSquared())
    }

    toString(): string {
      return `Vector2d: {x: ${this.x}, y: ${this.y}}`
    }

    dotProduct(other: Vector2d): number {
      return this.x * other.x + this.y * other.y
    }

    cosineSimilarity(other: Vector2d): number {
      return this.dotProduct(other) / (this.length() * other.length())
    }

    setEqualTo(other: Vector2d) {
      this.x = other.x
      this.y = other.y
    }
}
