import CanvasRenderer from './CanvasRenderer'
import Renderer from './Renderer'

export default class RendererBuilder {

  static createDefault(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fadeRate: number): Renderer {

    return new CanvasRenderer(ctx, width, height, fadeRate)
  }
}
