export default class Vector2d {
  constructor(
    public x: number,
    public y: number) { }

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

    lengthSquared(): number {
      return this.x * this.x + this.y * this.y
    }

    length(): number {
      return Math.sqrt(this.lengthSquared())
    }
}
