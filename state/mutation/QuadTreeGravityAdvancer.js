"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeBuilder_1 = require("../../datastructure/QuadTreeBuilder");
const QuadTreeBuilder_2 = require("../../datastructure/QuadTreeBuilder");
class GravityVisitor {
    constructor(particle, gravityCoef) {
        this.particle = particle;
        this.gravityCoef = gravityCoef;
    }
    visit(node) {
        if (node.isEmpty)
            return;
        let contained = node.contains(this.particle);
        if (contained) {
            for (let child of node.children()) {
                child.accept(this);
            }
        }
        else {
            for (let child of node.children()) {
                this.apply([child.aggregate]);
            }
        }
    }
    visitLeaf(node) {
        this.apply(node.elements);
    }
    apply(particles) {
        for (let other of particles) {
            if (other == this.particle)
                continue;
            let diff = this.particle.pos.subtract(other.pos);
            let gravityStrength = 1.0 / (diff.lengthSquared()) * this.gravityCoef;
            let gravityVector = diff.multiply(gravityStrength);
            this.particle.spd.subtractMutate(gravityVector);
        }
    }
}
class QuadTreeGravityAdvancer {
    constructor(gravityCoef, extents) {
        this.gravityCoef = gravityCoef;
        this.extents = extents;
        let aggregator = new QuadTreeBuilder_2.ParticleAggregatorVisitor();
        // divide the screen up into a roughly 20x20 grid at the leaf level.
        // TODO: move this into a builder and/or constants file.
        let minNodeSize = extents.length() / 20;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(aggregator, minNodeSize);
        this.quadTree = quadTreeBuilder.build(extents);
    }
    advance(particles) {
        this.quadTree.clear();
        for (let particle of particles) {
            this.quadTree.add(particle);
        }
        this.quadTree.computeAggregates();
        for (let particle of particles) {
            let gravityVisitor = new GravityVisitor(particle, this.gravityCoef);
            this.quadTree.root.accept(gravityVisitor);
        }
    }
}
exports.default = QuadTreeGravityAdvancer;
//# sourceMappingURL=QuadTreeGravityAdvancer.js.map