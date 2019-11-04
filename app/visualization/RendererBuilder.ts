import CanvasRenderer from './CanvasRenderer'
import QuadTreeRenderer from './QuadTreeRenderer'
import Renderer from './Renderer'
import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'

export default class RendererBuilder {

  static createDefault(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fadeRate: number): Renderer {

    let canvasRenderer = new CanvasRenderer(ctx, width, height, fadeRate)
    let quadTreeRenderer = new QuadTreeRenderer(ctx, new Vector2d(width, height))
    let renderer: Renderer = {
      initialize() {
        canvasRenderer.initialize()
        quadTreeRenderer.initialize()
      },
      render(elements: Particle[]) {
        canvasRenderer.render(elements)
        quadTreeRenderer.render(elements)
      }
    }
    return renderer
  }
}
