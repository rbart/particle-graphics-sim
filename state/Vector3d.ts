export default class Vector3d {
  constructor(
    public x: number,
    public y: number,
    public z: number) { }

    length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    multiply(scalar: number): Vector3d {
      return new Vector3d(this.x * scalar, this.y * scalar, this.z * scalar);
    }
}
