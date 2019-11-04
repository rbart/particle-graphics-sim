import Particle from "./state/Particle";
import ParticleBuilder from "./state/ParticleBuilder"
import Advancer from "./state/mutation/Advancer"
import AdvancerBuilder from "./state/mutation/AdvancerCollectionBuilder"
import Renderer from "./visualization/Renderer"
import RendererBuilder from "./visualization/RendererBuilder"

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

let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>c.getContext("2d")//ctx_temp!;

let particles: Particle[] = []

let particleBuilder = new ParticleBuilder(c.width, c.height);

for (var i = 0; i < 3000; i++) {
  let particle: Particle = particleBuilder.generateRandomParticle(0.5, 1, 1);
  particles.push(particle);
}

let renderer: Renderer = RendererBuilder.createDefault(ctx, c.width, c.height, 0.8);

renderer.initialize();

let advancer: Advancer = AdvancerBuilder.createDefault(c.width, c.height);

function frame() {
  advancer.advance(particles);
  renderer.render(particles);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
