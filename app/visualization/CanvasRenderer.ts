import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'
import Renderer from './Renderer'

export default class CanvasRenderer implements Renderer {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly width: number,
    readonly height: number,
    readonly fadeRate: number) { }

  initialize() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = "rgb(3,3,3)";
    this.ctx.fillRect(0,0,this.width,this.height);
  }

  render(particles: Particle[]) {
    this.fade()
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

  private fade(): void {
    let initialAlpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = this.fadeRate
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0,0,this.width,this.height)
    this.ctx.globalAlpha = initialAlpha
  }
}
