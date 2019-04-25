import HasPosition2d from './HasPosition2d'
import Vector2d from './Vector2d';

export default class Particle implements HasPosition2d {
  constructor(
    readonly pos: Vector2d,
    readonly spd: Vector2d,
    readonly rad: number,
    readonly color: string) { }

  position(): Vector2d {
    return this.pos;
  }
}
