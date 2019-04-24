import Particle from '../state/Particle'

export default interface Renderer {
  initialize(): void
  render(particles: Particle[]): void
}
