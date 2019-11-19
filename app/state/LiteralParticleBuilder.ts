import Vector2d from './Vector2d'
import Particle from './Particle'
import Rectangle from './Rectangle';
import ParticleBuilder from './ParticleBuilder';

export class LiteralParticleBuilder implements ParticleBuilder {

  constructor(
    private readonly protoParticles: Particle[]
  ) { }

  generateParticles(bounds: Rectangle): Particle[] {
    let particles: Particle[] = []
    for (let proto of this.protoParticles) {
      let pos = proto.pos.multiplyVector(bounds.extents).add(bounds.origin)
      let spd = proto.spd.multiplyVector(bounds.extents).add(bounds.origin)
      let particle = new Particle(pos, spd, proto.mass, proto.rad, proto.hue)
      particles.push(particle)
    }
    return particles
  }
}

export class CombinedParticuleBuilder implements ParticleBuilder {
  constructor(private readonly builders: ParticleBuilder[]) { }
  generateParticles(bounds: Rectangle): Particle[] {
    let particles: Particle[] = []
    for (let builder of this.builders) {
      particles = particles.concat(builder.generateParticles(bounds))
    }
    return particles
  }
}
