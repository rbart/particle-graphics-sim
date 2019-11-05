"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = require("./Vector2d");
const Vector3d_1 = require("./Vector3d");
const Particle_1 = require("./Particle");
class ParticleBuilder {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    generateRandomParticle(maxSpeed, minRadius, maxRadius) {
        let radius = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
        let randomPosition = new Vector2d_1.default(Math.floor(Math.random() * this.width - radius) + radius, Math.floor(Math.random() * this.height - radius) + radius);
        let randomSpeed = new Vector2d_1.default(Math.random() * maxSpeed * 2 - maxSpeed, Math.random() * maxSpeed * 2 - maxSpeed);
        return new Particle_1.default(randomPosition, randomSpeed, radius, radius, this.getRndColor());
    }
    getRndColor() {
        let hue = (360 * Math.random() | 0);
        return new Vector3d_1.default(hue, 100, 50);
    }
}
exports.default = ParticleBuilder;
//# sourceMappingURL=ParticleBuilder.js.map