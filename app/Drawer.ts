import Particle from './objects/Particle'
import Vector2d from './objects/Vector2d'

export default class Drawer {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly width: number,
    readonly height: number) { }

  //doClear: number = 0;

  init() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = "rgb(253,253,253)";
    this.ctx.fillRect(0,0,this.width,this.height);
  }

  clear() {
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.width,this.height);
    this.ctx.globalAlpha = 1.0;
  }

  drawCircle(particles: Particle[]) {
    for (let particle of particles) {
      this.ctx.beginPath();
      this.ctx.arc(particle.pos.x, particle.pos.y, particle.rad, 0, 2 * Math.PI);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      if (particle.spd.lengthSquared() < particle.rad) continue;
      this.ctx.beginPath();
      this.ctx.strokeStyle = particle.color;
      this.ctx.lineWidth = particle.rad * 2
      this.ctx.moveTo(particle.pos.x, particle.pos.y);
      let lastPos: Vector2d = particle.pos.subtract(particle.spd);
      this.ctx.lineTo(lastPos.x, lastPos.y);
      this.ctx.stroke();
    }
  }
}
