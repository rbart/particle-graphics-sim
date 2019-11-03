"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeBuilder_1 = require("./QuadTreeBuilder");
const Vector2d_1 = require("../state/Vector2d");
const chai_1 = require("chai");
class TestElement {
    constructor(x, y) {
        this.pos = new Vector2d_1.default(x, y);
    }
    position() {
        return this.pos;
    }
}
class TestAggregator {
    aggregate(elements) {
        return new TestAggregate(elements.map(e => e.pos.length()).reduce((a, b) => a + b, 0));
    }
    combine(aggregates) {
        return new TestAggregate(aggregates.map(a => a.val).reduce((a, b) => a + b));
    }
}
class TestAggregate {
    constructor(val) {
        this.val = val;
    }
}
describe('QuadTreeBuilder', () => {
    let extents = new Vector2d_1.default(10, 10);
    it('should build a simple quadtree', () => {
        let builder = new QuadTreeBuilder_1.default(new TestAggregator(), extents.length());
        let quadTree = builder.build(extents);
        var nodesCount = 0;
        var elementsCount = 0;
        let countNodes = (node) => {
            elementsCount += node.elements.length;
            nodesCount++;
            for (let child of node.children()) {
                countNodes(child);
            }
        };
        let testElement = new TestElement(2, 2);
        quadTree.add(testElement);
        countNodes(quadTree.root);
        chai_1.expect(nodesCount).to.equal(5);
        chai_1.expect(elementsCount).to.equal(1);
    });
    it('should build a large quadtree', () => {
        let testExtents = new Vector2d_1.default(1920, 1080);
        let builder = new QuadTreeBuilder_1.default(new TestAggregator(), 5);
        let quadTree = builder.build(testExtents);
        var nodesCount = 0;
        let countNodes = (node) => {
            nodesCount++;
            for (let child of node.children()) {
                countNodes(child);
            }
        };
        countNodes(quadTree.root);
        chai_1.expect(nodesCount).to.equal(349525);
    });
    it('should compute a simple aggregate', () => {
        let builder = new QuadTreeBuilder_1.default(new TestAggregator(), extents.length());
        let quadTree = builder.build(extents);
        let testElements = [
            new TestElement(3, 4)
        ];
        for (let element of testElements) {
            quadTree.add(element);
        }
        quadTree.computeAggregates();
        chai_1.expect(quadTree.root.aggregate.val).to.equal(5);
    });
    it('should compute a nontrivial aggregate', () => {
        let builder = new QuadTreeBuilder_1.default(new TestAggregator(), extents.length());
        let quadTree = builder.build(extents);
        let testElements = [
            new TestElement(1, 0),
            new TestElement(3, 4),
            new TestElement(0, 2),
            new TestElement(4, 3) // length 5
        ];
        for (let element of testElements) {
            quadTree.add(element);
        }
        quadTree.computeAggregates();
        chai_1.expect(quadTree.root.aggregate.val).to.equal(13);
    });
});
//# sourceMappingURL=QuadTreeBuilder.spec.js.map