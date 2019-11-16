import HasPosition2d from './HasPosition2d'
import Vector2d from './Vector2d'

export default class Particle implements HasPosition2d {

  public lastPos: Vector2d
  private hslColorString_memo: string | null = null
  private colorSizeCacheKey_memo: string | null = null

  constructor(
      readonly pos: Vector2d,
      readonly spd: Vector2d,
      public mass: number,
      readonly rad: number,
      readonly hue: Vector2d) {

    this.lastPos = new Vector2d(pos.x, pos.y)
  }

  hslColorString() {
    if (this.hslColorString_memo == null) {
      let colorAngle: number = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI)
      this.hslColorString_memo = `hsl(${colorAngle| 0},100%,50%)`
    }
    return this.hslColorString_memo
  }

  colorSizeCacheKey() {
    if (this.colorSizeCacheKey_memo == null) {
      let colorAngle: number = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI)
      this.colorSizeCacheKey_memo = `${(this.rad + 0.5) * 2 | 0}_${colorAngle / 5 | 0}`
    }
    return this.colorSizeCacheKey_memo
  }

  position(): Vector2d {
    return this.pos
  }
}
