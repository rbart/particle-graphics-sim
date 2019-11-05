import Particle from '../state/Particle'
import Renderer from './Renderer'

export default class FadeRenderer implements Renderer {
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

  render(_: Particle[]) {
    let initialAlpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = this.fadeRate
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0,0,this.width,this.height)
    this.ctx.globalAlpha = initialAlpha
  }
}
