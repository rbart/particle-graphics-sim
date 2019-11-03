"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CanvasRenderer {
    constructor(ctx, width, height, fadeRate) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.fadeRate = fadeRate;
    }
    initialize() {
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "rgb(3,3,3)";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    render(particles) {
        this.fade();
        for (let particle of particles) {
            this.ctx.strokeStyle = particle.hslColorString();
            this.ctx.lineWidth = particle.rad * 2;
            this.ctx.beginPath();
            if (particle.spd.x != 0 || particle.spd.y != 0) {
                this.drawPathLine(particle);
            }
            this.ctx.stroke();
        }
    }
    drawPathLine(particle) {
        this.ctx.moveTo(particle.pos.x, particle.pos.y);
        let spdVect = particle.spd;
        let lastPos = particle.pos.subtract(spdVect);
        while (spdVect.lengthSquared() < 4) {
            spdVect = spdVect.multiply(2);
            lastPos = particle.pos.subtract(spdVect);
        }
        this.ctx.lineTo(lastPos.x, lastPos.y);
    }
    fade() {
        let initialAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = this.fadeRate;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = initialAlpha;
    }
}
exports.default = CanvasRenderer;
//# sourceMappingURL=CanvasRenderer.js.map