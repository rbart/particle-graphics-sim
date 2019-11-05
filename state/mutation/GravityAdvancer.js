"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GravityAdvancer {
    constructor(gravityCoef) {
        this.gravityCoef = gravityCoef;
    }
    advance(particles) {
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                if (!isFinite(p1.pos.length()))
                    continue;
                let p2 = particles[j];
                if (!isFinite(p2.pos.length()))
                    continue;
                let diff = p1.pos.subtract(p2.pos);
                let gravityStrength = 1.0 / (diff.lengthSquared()) * this.gravityCoef;
                let gravityVector = diff.multiply(gravityStrength);
                p1.spd.subtractMutate(gravityVector);
                p2.spd.addMutate(gravityVector);
            }
        }
    }
}
exports.default = GravityAdvancer;
//# sourceMappingURL=GravityAdvancer.js.map