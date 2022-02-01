import Particle from "../Particle";

export default interface GravityVisitorFactory<TVisitor> {
  createInstance(particle: Particle): TVisitor
}
