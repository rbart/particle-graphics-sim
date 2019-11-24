import Particle from '../state/Particle'
import Renderer, { RendererFactory } from './Renderer'
import Rectangle from '../state/Rectangle';
import Vector2d from '../state/Vector2d';

export class FixedCircleRendererFactory implements RendererFactory {
  constructor(readonly point: Vector2d, readonly radius: number) { }
  createInstance(bounds: Rectangle, ctx: CanvasRenderingContext2D): Renderer {
    return new FixedCircleRenderer(ctx, this.point, this.radius, bounds)
  }
}

export default class FixedCircleRenderer implements Renderer {
  point: Vector2d;
  gradient: CanvasGradient;
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    point: Vector2d,
    readonly radius: number,
    readonly bounds: Rectangle) {

      let scaledPoint = new Vector2d(
        bounds.extents.x * point.x,
        bounds.extents.y * point.y)
      this.point = bounds.origin.add(scaledPoint)
      this.gradient = ctx.createRadialGradient(
        this.point.x,
        this.point.y,
        0,//this.radius / 2,
        this.point.x,
        this.point.y,
        this.radius);
      this.gradient.addColorStop(0, 'black')
      this.gradient.addColorStop(0.25, 'rgb(200,200,200)')
      this.gradient.addColorStop(1, 'transparent')//grd.addColorStop(1,'transparent');
  }

  initialize() { }

  render(_: Particle[]) {
    this.ctx.beginPath()
    this.ctx.arc(this.point.x, this.point.y, this.radius, 0, 2*Math.PI)
    this.ctx.fillStyle = this.gradient
    this.ctx.fill()
  }
}
