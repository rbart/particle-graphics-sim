import ParticleRenderer from './ParticleRenderer'
import QuadTreeRenderer from './QuadTreeRenderer'
import FadeRenderer from './FadeRenderer'
import Renderer from './Renderer'
import RendererCollection from './RendererCollection'
import Rectangle from '../state/Rectangle'

export default class RendererCollectionBuilder {

  static createDefault(
    ctx: CanvasRenderingContext2D,
    bounds: Rectangle,
    fadeRate: number): Renderer {

    return new RendererCollection([
      new FadeRenderer(ctx, bounds, fadeRate),
      new ParticleRenderer(ctx, bounds),
      new QuadTreeRenderer(ctx, bounds)
    ])
  }
}
