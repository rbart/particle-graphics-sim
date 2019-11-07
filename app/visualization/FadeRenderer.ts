import Particle from '../state/Particle'
import Renderer from './Renderer'
import Rectangle from '../state/Rectangle';

export default class FadeRenderer implements Renderer {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly bounds: Rectangle,
    readonly fadeRate: number) { }

  initialize() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = "rgb(3,3,3)";
    this.ctx.fillRect(
      this.bounds.origin.x,
      this.bounds.origin.y,
      this.bounds.extents.x,
      this.bounds.extents.y);
  }

  render(_: Particle[]) {
    let initialAlpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = this.fadeRate
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(
      this.bounds.origin.x,
      this.bounds.origin.y,
      this.bounds.extents.x,
      this.bounds.extents.y);
    this.ctx.globalAlpha = initialAlpha
  }
}
