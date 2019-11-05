import Particle from '../state/Particle'
import Renderer from './Renderer'

export default class RendererCollection implements Renderer {

  constructor(private readonly renderers: Renderer[]) { }

  initialize(): void {
    for (let renderer of this.renderers) {
      renderer.initialize()
    }
  }

  render(particles: Particle[]): void {
    for (let renderer of this.renderers) {
      renderer.render(particles)
    }
  }
}
