import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'
import Renderer from './Renderer'
import Rectangle from '../state/Rectangle';

export default class CanvasRenderer implements Renderer {
  //circleCanvas: HTMLCanvasElement;
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly rectangle: Rectangle) {

    // this.circleCanvas = <HTMLCanvasElement>document.createElement("canvas")
    // this.circleCanvas.width = 20
    // this.circleCanvas.height = 20
    // let circleCtx = <CanvasRenderingContext2D>this.circleCanvas.getContext("2d")
    // circleCtx.beginPath();
    // this.ctx.lineWidth = 0
    // this.ctx.strokeStyle = 'red'
    // circleCtx.arc(10, 10, 5, 0, 2 * Math.PI);
    // circleCtx.fillStyle = 'red';
    // circleCtx.fill();
    //circleCtx.stroke();
  }

  initialize() { }

  render(particles: Particle[]) {
    for (let particle of particles) {
      this.ctx.strokeStyle = particle.hslColorString()
      this.ctx.lineWidth = particle.rad * 2
      this.ctx.beginPath();
      if (particle.spd.x != 0 || particle.spd.y != 0) {
        this.drawPathLine(particle)
      }
      this.ctx.stroke();
    }
  }

  private drawPathLine(particle: Particle): void {
    let rad = particle.rad
    let radx2 = rad*2
    let pos = particle.pos
    // TODO: particles could remember their own lastpos.
    this.ctx.drawImage(particle.circleImg(), particle.pos.x - particle.rad, particle.pos.y - particle.rad)
    // this.ctx.drawImage(
    //   particle.circleImg(), 0, 0, radx2, radx2, pos.x - rad, pos.y - rad, radx2, radx2)
    this.ctx.moveTo(pos.x, pos.y)
    let spdVect = particle.spd;
    // let lengthSquared = spdVect.lengthSquared()
    // if (lengthSquared < 6) {
    //   let shortage = 6 / lengthSquared
    //   spdVect = spdVect.multiply(Math.sqrt(shortage))
    // }
    let lastPos: Vector2d = pos.subtract(spdVect)
    this.ctx.lineTo(lastPos.x, lastPos.y)
  }
}
