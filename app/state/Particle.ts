import Vector2d from './Vector2d';

export default class Particle {
  constructor(
    readonly pos: Vector2d,
    readonly spd: Vector2d,
    readonly rad: number,
    readonly color: string) { }
}
