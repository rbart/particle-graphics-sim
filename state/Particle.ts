import HasPosition2d from './HasPosition2d'
import Vector2d from './Vector2d';
import Vector3d from './Vector3d'

export default class Particle implements HasPosition2d {
  constructor(
    readonly pos: Vector2d,
    readonly spd: Vector2d,
    public mass: number,
    readonly rad: number,
    readonly hue: Vector2d) { }

  position(): Vector2d {
    return this.pos;
  }

  private hslColorString_memo: string | null = null
  hslColorString(): string {
    if (this.hslColorString_memo == null) {
      let colorAngle: number = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI)
      this.hslColorString_memo = `hsl(${colorAngle| 0},100%,50%)`
    }
    return this.hslColorString_memo!
  }
}
