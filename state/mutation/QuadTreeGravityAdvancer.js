"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeBuilder_1 = require("../../datastructure/QuadTreeBuilder");
const QuadTreeBuilder_2 = require("../../datastructure/QuadTreeBuilder");
class QuadTreeGravityAdvancer {
    constructor(gravityCoef, extents) {
        this.gravityCoef = gravityCoef;
        this.extents = extents;
        this.minNodeSize = 5;
        let aggregator = new QuadTreeBuilder_2.ParticleAggregator();
        let quadTreeBuilder = new QuadTreeBuilder_1.default(aggregator, this.minNodeSize);
        this.quadTree = quadTreeBuilder.build(extents);
    }
    advance(particles) {
        this.quadTree.clear();
        // for (let particle of particles) {
        //   this.quadTree.add(particle)
        // }
        //
        // this.quadTree.computeAggregates()
        // for (let particle of particles) {
        //   this.applyGravityRecursive(particle, this.quadTree.root)
        // }
    }
    applyGravityRecursive(particle, node) {
        let contained = node.contains(particle);
        if (contained && node.isLeaf) {
            // for (let other of node.elements) {
            //   if (other == particle) continue
            //   let diff = particle.pos.subtract(other.pos);
            //   let gravityStrength = 1.0/(diff.lengthSquared()) * this.gravityCoef;
            //   let gravityVector = diff.multiply(gravityStrength);
            //   particle.spd.subtractMutate(gravityVector)
            // }
        }
        else if (contained) {
            for (let child of node.children()) {
                this.applyGravityRecursive(particle, child);
            }
        }
        else {
            // node does not contain child - recurse no further
            let totalMass = node.aggregate.totalMass;
            let aggLength = node.aggregate.centroid.length();
            if (totalMass == 0)
                return;
            //if (aggLength == 0) return
            if (!isFinite(totalMass))
                return;
            if (!isFinite(aggLength))
                return;
            let diff = particle.pos.subtract(node.aggregate.centroid);
            let gravityStrength = node.aggregate.totalMass * 1.0 / (diff.lengthSquared()) * this.gravityCoef;
            let gravityVector = diff.multiply(gravityStrength);
            particle.spd.subtractMutate(gravityVector);
        }
    }
}
exports.default = QuadTreeGravityAdvancer;
//# sourceMappingURL=QuadTreeGravityAdvancer.js.map