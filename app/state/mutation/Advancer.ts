import Particle from "../../objects/Particle"

export default interface Advancer {
  advance(particles: Particle[]): void
}
