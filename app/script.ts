import Particle from "./objects/Particle";
import ParticleBuilder from "./objects/ParticleBuilder"
import Advancer from "./state/mutation/Advancer"
import AdvancerBuilder from "./state/mutation/AdvancerBuilder"
import Drawer from "./Drawer"

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

for (var i = 0; i < 500; i++) {
  let particle: Particle = particleBuilder.generateRandomParticle(0.5, 1, 1);
  particles.push(particle);
}

let drawer: Drawer = new Drawer(ctx, c.width, c.height);

drawer.init();

let advancer: Advancer = AdvancerBuilder.createDefault(c.width, c.height);

function frame() {
  drawer.clear();
  advancer.advance(particles);
  drawer.drawCircle(particles);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
