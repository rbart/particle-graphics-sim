"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParticleBuilder_1 = require("./state/ParticleBuilder");
const AdvancerCollectionBuilder_1 = require("./state/mutation/AdvancerCollectionBuilder");
const RendererBuilder_1 = require("./visualization/RendererBuilder");
var c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
function fullscreen() {
    var el = document.getElementById('canvas');
    if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
    else {
        el.mozRequestFullScreen();
    }
}
c.addEventListener("click", fullscreen);
let ctx = c.getContext("2d"); //ctx_temp!;
let particles = [];
let particleBuilder = new ParticleBuilder_1.default(c.width, c.height);
for (var i = 0; i < 5000; i++) {
    let particle = particleBuilder.generateRandomParticle(0.5, 1, 1);
    particles.push(particle);
}
let renderer = RendererBuilder_1.default.createDefault(ctx, c.width, c.height, 0.8);
renderer.initialize();
let advancer = AdvancerCollectionBuilder_1.default.createDefault(c.width, c.height);
function frame() {
    advancer.advance(particles);
    renderer.render(particles);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
//# sourceMappingURL=script.js.map