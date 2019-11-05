"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Particle {
    constructor(pos, spd, mass, rad, color) {
        this.pos = pos;
        this.spd = spd;
        this.mass = mass;
        this.rad = rad;
        this.color = color;
        this.hslColorString_memo = null;
    }
    position() {
        return this.pos;
    }
    hslColorString() {
        if (this.hslColorString_memo == null) {
            this.hslColorString_memo = `hsl(${this.color.x | 0},${this.color.y | 0}%,${this.color.z | 0}%)`;
        }
        return this.hslColorString_memo;
    }
}
exports.default = Particle;
//# sourceMappingURL=Particle.js.map