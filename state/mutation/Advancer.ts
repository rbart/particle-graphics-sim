import Particle from "../Particle"

export default interface Advancer {
  advance(particles: Particle[]): void
}
