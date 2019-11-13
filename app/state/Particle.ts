import HasPosition2d from './HasPosition2d'
import Vector2d from './Vector2d';
import Vector3d from './Vector3d'

export default class Particle implements HasPosition2d {
  public circleCanvas: OffscreenCanvas | null = null;
  //public circleCanvas: HTMLCanvasElement;
  constructor(
    readonly pos: Vector2d,
    readonly spd: Vector2d,
    public mass: number,
    readonly rad: number,
    readonly hue: Vector2d) {

    // this.circleCanvas = <HTMLCanvasElement>document.createElement("canvas")
    // this.circleCanvas.setAttribute("id", Math.random.toString())
    // this.circleCanvas.width = 20
    // this.circleCanvas.height = 20
    // let circleCtx = <CanvasRenderingContext2D>this.circleCanvas.getContext("2d")
    // circleCtx.beginPath();
    // circleCtx.strokeStyle = "red"
    // circleCtx.lineWidth = rad * 2
    // circleCtx.arc(10, 10, 5, 0, 2 * Math.PI);
    // circleCtx.stroke()
  }

  circleImg(): OffscreenCanvas {
    if (this.circleCanvas == null) {
      this.circleCanvas = new OffscreenCanvas(this.rad*2, this.rad*2) //<HTMLCanvasElement>document.createElement("canvas")
      // this.circleCanvas.width = this.rad * 2
      // this.circleCanvas.height = this.rad * 2
      let circleCtx = this.circleCanvas.getContext("2d")!
      //circleCtx.beginPath();
      //circleCtx.strokeStyle = this.hslColorString()
      //circleCtx.lineWidth = 0
      circleCtx.arc(this.rad, this.rad, this.rad, 0, 2 * Math.PI);
      circleCtx.fillStyle = this.hslColorString();
      circleCtx.fill();
      //circleCtx.stroke()
    }

    return this.circleCanvas;
  }

  position(): Vector2d {
    return this.pos;
  }

  private hslColorString_memo: string | null = null
  hslColorString(): string {
    //return "red"
    if (this.hslColorString_memo == null) {
      let colorAngle: number = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI)
      this.hslColorString_memo = `hsl(${colorAngle| 0},100%,50%)`
    }
    return this.hslColorString_memo!
  }
}
