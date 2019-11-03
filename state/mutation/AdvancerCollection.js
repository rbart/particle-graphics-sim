"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdvancerBuilder {
    constructor(advancers) {
        this.advancers = advancers;
    }
    advance(particles) {
        this.advancers.forEach(advancer => advancer.advance(particles));
    }
}
exports.default = AdvancerBuilder;
//# sourceMappingURL=AdvancerCollection.js.map