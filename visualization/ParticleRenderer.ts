import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'
import Renderer, { RendererFactory } from './Renderer'
import Rectangle from '../state/Rectangle';

export class ParticleRendererFactory implements RendererFactory {
  createInstance(_: Rectangle, ctx: CanvasRenderingContext2D): Renderer {
    return new ParticleRenderer(ctx)
  }
}

export default class ParticleRenderer implements Renderer {

  private readonly circleCanvasCache: Map<string, OffscreenCanvas>

  constructor(readonly ctx: CanvasRenderingContext2D) {
    this.circleCanvasCache = new Map()
  }

  initialize() { }

  render(particles: Particle[]) {
    for (let particle of particles) {
      this.ctx.strokeStyle = particle.hslColorString();
      this.ctx.lineWidth = particle.rad * 2
      this.ctx.beginPath();
      if (particle.spd.x != 0 || particle.spd.y != 0) {
        this.drawPathLine(particle)
      }
      this.ctx.stroke();
      if (particle.rad > 1.5) {
        let circleCanvas: OffscreenCanvas = this.getOrCreateCircleCanvas(particle)
        let radPlus1 = particle.rad+1
        this.ctx.drawImage(circleCanvas, particle.pos.x-radPlus1, particle.pos.y-radPlus1)
        if (particle.spd.lengthSquared() > 1) {
          this.ctx.drawImage(circleCanvas, particle.lastPos.x-radPlus1, particle.lastPos.y-radPlus1)
        }
      }
      particle.lastPos.setEqualTo(particle.pos)
    }
  }

  getOrCreateCircleCanvas(particle: Particle): OffscreenCanvas {
    if (!this.circleCanvasCache.has(particle.colorSizeCacheKey())) {
      let canvas = this.initializeCircleCanvas(particle)
      this.circleCanvasCache.set(particle.colorSizeCacheKey(), canvas)
    }
    return this.circleCanvasCache.get(particle.colorSizeCacheKey())!
  }

  initializeCircleCanvas(particle: Particle): OffscreenCanvas {
    let canvas = new OffscreenCanvas(particle.rad*2+2, particle.rad*2+2)
    let ctx = <OffscreenCanvasRenderingContext2D>canvas.getContext("2d")
    ctx.beginPath();
    ctx.arc(particle.rad+1, particle.rad+1, particle.rad, 0, Math.PI * 2)
    ctx.fillStyle = particle.hslColorString()
    ctx.fill()
    return canvas
  }

  private drawPathLine(particle: Particle): void {
    this.ctx.moveTo(particle.pos.x, particle.pos.y)
    let spdVect = particle.spd;
    let lengthSquared = spdVect.lengthSquared()
    if (particle.rad < 1.5 && lengthSquared < 6) {
      let shortage = 6 / lengthSquared
      spdVect = spdVect.multiply(Math.sqrt(shortage))
    }
    let lastPos: Vector2d = particle.pos.subtract(spdVect)
    this.ctx.lineTo(lastPos.x, lastPos.y)
  }
}
