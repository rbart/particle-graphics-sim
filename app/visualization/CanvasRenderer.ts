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
      this.drawCircle(particle)
      if (particle.spd.lengthSquared() > particle.rad) {
        this.drawPathLine(particle)
      }
    }
  }

  private drawCircle(particle: Particle): void {
    this.ctx.beginPath();
    this.ctx.arc(particle.pos.x, particle.pos.y, particle.rad, 0, 2 * Math.PI);
    this.ctx.fillStyle = particle.color;
    this.ctx.fill();
  }

  private drawPathLine(particle: Particle): void {
    this.ctx.beginPath()
    this.ctx.strokeStyle = particle.color;
    this.ctx.lineWidth = particle.rad * 2
    this.ctx.moveTo(particle.pos.x, particle.pos.y)
    let lastPos: Vector2d = particle.pos.subtract(particle.spd)
    this.ctx.lineTo(lastPos.x, lastPos.y)
    this.ctx.stroke()
  }

  private fade(): void {
    let initialAlpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = this.fadeRate
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0,0,this.width,this.height)
    this.ctx.globalAlpha = initialAlpha
  }
}