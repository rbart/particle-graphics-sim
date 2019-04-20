import Particle from "./objects/Particle";
import ParticleBuilder from "./objects/ParticleBuilder"
import Mover from "./Mover"
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

let ctx_temp: CanvasRenderingContext2D | null;
if (!(ctx_temp = c.getContext("2d"))) {
  throw new Error(`2d context not supported or canvas already initialized`);
}
let ctx: CanvasRenderingContext2D = ctx_temp!;

let particles: Particle[] = []

let particleBuilder = new ParticleBuilder(c.width, c.height);

for (var i = 0; i < 500; i++) {
  let particle: Particle = particleBuilder.generateRandomParticle(0.5, 1, 1);
  particles.push(particle);
}

let drawer: Drawer = new Drawer(ctx, c.width, c.height);

drawer.init();

let mover: Mover = new Mover(0.02, c.width, c.height);

function frame() {
  drawer.clear();
  mover.move(particles);
  drawer.drawCircle(particles);
  requestAnimationFrame(() => frame());
}

requestAnimationFrame(frame);
