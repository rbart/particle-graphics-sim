import Particle from "./state/Particle";
import Advancer from "./state/mutation/Advancer"
import Renderer from "./visualization/Renderer"
import Vector2d from "./state/Vector2d";
import Rectangle from "./state/Rectangle";
import Configurations from './state/Configurations'

var c = <HTMLCanvasElement>document.getElementById("canvas");
c.width  = window.innerWidth;
c.height = window.innerHeight;

function fullscreen(){
  var el = <any>document.getElementById('canvas');
  if(el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  }
  else {
    el.mozRequestFullScreen();
  }
}
c.addEventListener("click",fullscreen)

let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>c.getContext("2d")

let bounds: Rectangle = new Rectangle(new Vector2d(0,0), new Vector2d(c.width, c.height))

let configuration = Configurations.VariableMassGravityConfig

let particles: Particle[] = configuration.particleBuilder.generateParticles(bounds)
let renderer: Renderer = configuration.getRenderer(bounds, ctx);
let advancer: Advancer = configuration.getAdvancer(bounds);

let frameNumber = 0
function framesPerSecondLogger() {
  let lastFrameReportTime = Date.now()
  return function() {
    let now = Date.now()
    let seconds = (now - lastFrameReportTime) / 1000
    let fps = frameNumber / seconds
    console.log("FPS: " + fps.toFixed(1))
    frameNumber = 0
    lastFrameReportTime = now
  }
}

setInterval(framesPerSecondLogger(), 2000)

function drawFrame() {
  frameNumber++
  advancer.advance(particles);
  requestAnimationFrame(drawFrame);
  renderer.render(particles);
}

requestAnimationFrame(drawFrame);
