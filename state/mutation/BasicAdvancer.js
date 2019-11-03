"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicAdvancer {
    advance(particles) {
        for (let particle of particles) {
            particle.pos.addMutate(particle.spd);
        }
    }
}
exports.default = BasicAdvancer;
//# sourceMappingURL=BasicAdvancer.js.map