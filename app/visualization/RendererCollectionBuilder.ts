import ParticleRenderer from './ParticleRenderer'
import QuadTreeRenderer from './QuadTreeRenderer'
import FadeRenderer from './FadeRenderer'
import Renderer from './Renderer'
import Vector2d from '../state/Vector2d'
import RendererCollection from './RendererCollection'

export default class RendererCollectionBuilder {

  static createDefault(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fadeRate: number): Renderer {

    return new RendererCollection([
      new FadeRenderer(ctx, width, height, fadeRate),
      new ParticleRenderer(ctx, width, height),
      //new QuadTreeRenderer(ctx, new Vector2d(width, height))
    ])
  }
}
