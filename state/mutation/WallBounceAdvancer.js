"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WallBounceAdvancer {
    constructor(bounceCoef, width, height) {
        this.bounceCoef = bounceCoef;
        this.width = width;
        this.height = height;
    }
    advance(particles) {
        for (let particle of particles) {
            if (this.belowMinX(particle) || this.aboveMaxX(particle)) {
                this.invertSpdX(particle);
            }
            if (this.aboveMaxY(particle) || this.belowMinY(particle)) {
                this.invertSpdY(particle);
            }
        }
    }
    invertSpdX(particle) {
        particle.spd.x *= -this.bounceCoef;
    }
    invertSpdY(particle) {
        particle.spd.y *= -this.bounceCoef;
    }
    aboveMaxX(particle) {
        return (particle.pos.x > this.width - particle.rad && particle.spd.x > 0);
    }
    belowMinX(particle) {
        return (particle.pos.x < particle.rad && particle.spd.x < 0);
    }
    aboveMaxY(particle) {
        return (particle.pos.y > this.height - particle.rad && particle.spd.y > 0);
    }
    belowMinY(particle) {
        return (particle.pos.y < particle.rad && particle.spd.y < 0);
    }
}
exports.default = WallBounceAdvancer;
//# sourceMappingURL=WallBounceAdvancer.js.map