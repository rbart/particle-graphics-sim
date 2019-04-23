export default class Vector2d {
  constructor(
    public x: number,
    public y: number) { }

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

    lengthSquared(): number {
      return this.x * this.x + this.y * this.y
    }

    length(): number {
      return Math.sqrt(this.lengthSquared())
    }
}
