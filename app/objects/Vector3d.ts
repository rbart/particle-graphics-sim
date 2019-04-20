export default class Vector3d {
  constructor(
    public x: number,
    public y: number,
    public z: number) { }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
}
