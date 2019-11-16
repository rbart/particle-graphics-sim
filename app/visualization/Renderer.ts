import Particle from '../state/Particle'
import Rectangle from '../state/Rectangle';

export default interface Renderer {
  initialize(): void
  render(particles: Particle[]): void
}

export interface RendererFactory {
  createInstance(bounds: Rectangle, ctx: CanvasRenderingContext2D): Renderer
}
