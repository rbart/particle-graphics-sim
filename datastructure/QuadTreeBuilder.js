"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = require("../state/Vector2d");
const Vector3d_1 = require("../state/Vector3d");
const QuadTreeNode_1 = require("./QuadTreeNode");
const Particle_1 = require("../state/Particle");
class ParticleAggregatorVisitor {
    visit(node) {
        let childAggregates = [];
        for (let child of node.children()) {
            child.accept(this);
            childAggregates.push(child.aggregate);
        }
        node.aggregate = this.aggregate(childAggregates);
    }
    visitLeaf(node) {
        node.aggregate = this.aggregate(node.elements);
    }
    aggregate(particles) {
        let totalMass = 0;
        let sumX = 0;
        let sumY = 0;
        for (let particle of particles) {
            totalMass += 1;
            sumX += particle.pos.x;
            sumY += particle.pos.y;
        }
        let avgX = totalMass == 0 ? 0 : sumX / totalMass;
        let avgY = totalMass == 0 ? 0 : sumY / totalMass;
        // TODO aggregate all the fields properly
        return new Particle_1.default(new Vector2d_1.default(avgX, avgY), new Vector2d_1.default(0, 0), totalMass, 1, new Vector3d_1.default(0, 0, 0));
    }
}
exports.ParticleAggregatorVisitor = ParticleAggregatorVisitor;
class QuadTree {
    constructor(root, aggregator) {
        this.root = root;
        this.aggregator = aggregator;
    }
    add(element) {
        this.root.add(element);
    }
    computeAggregates() {
        this.root.accept(this.aggregator);
    }
    clear() {
        this.root.clear();
    }
}
exports.QuadTree = QuadTree;
class QuadTreeBuilder {
    constructor(aggregator, minNodeSize) {
        this.aggregator = aggregator;
        this.minNodeSize = minNodeSize;
    }
    build(extents) {
        return new QuadTree(this.buildImpl(new Vector2d_1.default(0, 0), extents), this.aggregator);
    }
    buildImpl(origin, extents) {
        if (extents.length() >= this.minNodeSize) {
            let halfExtent = extents.multiply(0.5);
            let upperLeft = this.buildImpl(origin, halfExtent);
            let upperRight = this.buildImpl(origin.addX(halfExtent.x), halfExtent);
            let lowerLeft = this.buildImpl(origin.addY(halfExtent.y), halfExtent);
            let lowerRight = this.buildImpl(origin.add(halfExtent), halfExtent);
            return new QuadTreeNode_1.QuadTreeNode(origin, extents, upperLeft, upperRight, lowerLeft, lowerRight);
        }
        else {
            return new QuadTreeNode_1.QuadTreeLeafNode(origin, extents);
        }
    }
}
exports.default = QuadTreeBuilder;
//# sourceMappingURL=QuadTreeBuilder.js.map