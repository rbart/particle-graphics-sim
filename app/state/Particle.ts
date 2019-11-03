import HasPosition2d from './HasPosition2d'
import Vector2d from './Vector2d';
import Vector3d from './Vector3d'

export default class Particle implements HasPosition2d {
  constructor(
    readonly pos: Vector2d,
    readonly spd: Vector2d,
    readonly mass: number,
    readonly rad: number,
    readonly color: Vector3d) { }

  position(): Vector2d {
    return this.pos;
  }

  private hslColorString_memo: string | null = null
  hslColorString(): string {
    if (this.hslColorString_memo == null) {
      this.hslColorString_memo = `hsl(${this.color.x | 0},${this.color.y | 0}%,${this.color.z | 0}%)`
    }
    return this.hslColorString_memo!
  }
}
