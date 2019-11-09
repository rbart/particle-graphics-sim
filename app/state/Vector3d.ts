export default class Vector3d {
  constructor(
    public x: number,
    public y: number,
    public z: number) { }

    length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    multiply(scalar: number): Vector3d {
      return new Vector3d(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    dotProduct(other: Vector3d): number {
      return this.x * other.x + this.y * other.y + this.z * other.z
    }
}
