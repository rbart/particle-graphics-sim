"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = require("../state/Vector2d");
const QuadTreeNode_1 = require("./QuadTreeNode");
class ParticleAggregate {
    constructor(centroid, totalMass) {
        this.centroid = centroid;
        this.totalMass = totalMass;
    }
}
exports.ParticleAggregate = ParticleAggregate;
class ParticleAggregator {
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
        return new ParticleAggregate(new Vector2d_1.default(avgX, avgY), totalMass);
    }
    combine(aggregates) {
        let totalMass = 0;
        let sumX = 0;
        let sumY = 0;
        for (let agg of aggregates) {
            if (agg.totalMass == 0)
                continue;
            totalMass += agg.totalMass;
            sumX += agg.centroid.x * agg.totalMass;
            sumY += agg.centroid.y * agg.totalMass;
        }
        let avgX = sumX / totalMass;
        let avgY = sumY / totalMass;
        return new ParticleAggregate(new Vector2d_1.default(avgX, avgY), totalMass);
    }
}
exports.ParticleAggregator = ParticleAggregator;
class QuadTree {
    constructor(root, aggregator) {
        this.root = root;
        this.aggregator = aggregator;
    }
    add(element) {
        this.addRecursive(element, this.root);
    }
    computeAggregates() {
        this.computeAggregatesRecursive(this.root);
    }
    clear() {
        this.clearRecursive(this.root);
    }
    addRecursive(element, node) {
        if (node.isLeaf) {
            node.elements.push(element);
        }
        else {
            let children = [node.upperLeft, node.upperRight, node.lowerLeft, node.lowerRight];
            for (let child of children) {
                if (child.contains(element)) {
                    this.addRecursive(element, child);
                    break;
                }
            }
        }
    }
    computeAggregatesRecursive(node) {
        if (node.isLeaf) {
            node.aggregate = this.aggregator.aggregate(node.elements);
        }
        else {
            let children = node.children();
            for (let child of children) {
                this.computeAggregatesRecursive(child);
            }
            let childAggregates = children.map(c => c.aggregate);
            node.aggregate = this.aggregator.combine(childAggregates);
        }
    }
    clearRecursive(node) {
        if (!node.isLeaf) {
            for (let child of node.children()) {
                this.clearRecursive(child);
            }
        }
        node.elements = [];
        node.aggregate = null;
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
            return new QuadTreeNode_1.default(origin, extents, upperLeft, upperRight, lowerLeft, lowerRight);
        }
        else {
            return new QuadTreeNode_1.default(origin, extents);
        }
    }
}
exports.default = QuadTreeBuilder;
//# sourceMappingURL=QuadTreeBuilder.js.map