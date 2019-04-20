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
        let dx = particle.pos.x - p2.pos.x;
        let dy = particle.pos.y - p2.pos.y;
        let grav = 1.0/(dx*dx + dy*dy) * this.grav;
        particle.spd.x -= dx * grav;
        particle.spd.y -= dy * grav;
        p2.spd.x += dx * grav;
        p2.spd.y += dy * grav;
      }
    }
  }
}
