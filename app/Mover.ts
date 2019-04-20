import Particle from './objects/Particle'

export default class Mover {
  constructor(
    readonly grav: number,
    readonly width: number,
    readonly height: number) {}

  move(particles: Particle[]) {
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i]
      if ((particle.pos.x > this.width - particle.rad && particle.spd.x > 0) ||
        (particle.pos.x < particle.rad && particle.spd.x < 0)) particle.spd.x *= -.9;
      if ((particle.pos.y > this.height - particle.rad && particle.spd.y > 0) ||
        (particle.pos.y < particle.rad && particle.spd.y < 0)) particle.spd.y *= -.9;
      particle.pos.x += particle.spd.x;
      particle.pos.y += particle.spd.y;

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let diff = particle.pos.subtract(p2.pos);
        let gravityStrength = 1.0/(diff.lengthSquared()) * this.grav;
        let gravityVector = diff.multiply(gravityStrength);
        particle.spd.subtractMutate(gravityVector)
        p2.spd.addMutate(gravityVector)
      }
    }
  }
}
