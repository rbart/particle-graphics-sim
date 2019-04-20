export default class Vector2d {
  constructor(
    public x: number,
    public y: number) { }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}
