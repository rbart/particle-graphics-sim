import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'
import Renderer from './Renderer'

export default class CanvasRenderer implements Renderer {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly width: number,
    readonly height: number) { }

  initialize() { }

  render(particles: Particle[]) {
    for (let particle of particles) {
      this.ctx.strokeStyle = particle.hslColorString();
      this.ctx.lineWidth = particle.rad * 2
      this.ctx.beginPath();
      if (particle.spd.x != 0 || particle.spd.y != 0) {
        this.drawPathLine(particle)
      }
      this.ctx.stroke();
    }
  }

  private drawPathLine(particle: Particle): void {
    this.ctx.moveTo(particle.pos.x, particle.pos.y)
    let spdVect = particle.spd;
    let lastPos: Vector2d = particle.pos.subtract(spdVect)
    while (spdVect.lengthSquared() < 4) {
      spdVect = spdVect.multiply(2)
      lastPos = particle.pos.subtract(spdVect)
    }
    this.ctx.lineTo(lastPos.x, lastPos.y)
  }
}
