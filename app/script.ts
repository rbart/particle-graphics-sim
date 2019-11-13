import Particle from "./state/Particle";
import ParticleBuilder from "./state/ParticleBuilder"
import Advancer from "./state/mutation/Advancer"
import AdvancerBuilder from "./state/mutation/AdvancerCollectionBuilder"
import Renderer from "./visualization/Renderer"
import RendererCollectionBuilder from "./visualization/RendererCollectionBuilder"
import Vector2d from "./state/Vector2d";
import Rectangle from "./state/Rectangle";

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

let particles: Particle[] = []

let particleBuilder = new ParticleBuilder(c.width, c.height);

for (var i = 0; i < 2000; i++) {
  let particle: Particle = particleBuilder.generateRandomParticle(0.3, 1.5, 1.5);
  particles.push(particle);
}

let bounds: Rectangle = new Rectangle(new Vector2d(0,0), new Vector2d(c.width, c.height))

let renderer: Renderer = RendererCollectionBuilder.createDefault(ctx, bounds, 0.7);

renderer.initialize();

let advancer: Advancer = AdvancerBuilder.createDefault(bounds);

let lastFrames = 0
let lastFrameReportTime = Date.now()

setInterval(function() {
  let now = Date.now()
  let seconds = (now - lastFrameReportTime) / 1000
  let fps = lastFrames / seconds
  console.log("FPS: " + fps.toFixed(1))
  lastFrames = 0
  lastFrameReportTime = now
}, 2000)

function frame() {
  lastFrames++
  advancer.advance(particles);
  requestAnimationFrame(frame);
  renderer.render(particles);
}

requestAnimationFrame(frame);
