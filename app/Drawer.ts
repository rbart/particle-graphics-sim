import Particle from './objects/Particle'

export default class Drawer {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly width: number,
    readonly height: number) { }

  //doClear: number = 0;

  init() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.width,this.height);
  }

  clear() {
    //if (this.doClear++ %1 != 0) return;
    this.ctx.globalAlpha = 0.1;
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
    }
  }
}
