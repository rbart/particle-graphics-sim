"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuadTreeLeafNode {
    constructor(origin, extents) {
        this.origin = origin;
        this.extents = extents;
        this.elements = [];
        this.aggregate = null;
        this.isEmpty = true;
    }
    accept(visitor) {
        visitor.visitLeaf(this);
    }
    add(element) {
        this.isEmpty = false;
        this.elements.push(element);
    }
    clear() {
        this.elements.length = 0;
        this.aggregate = null;
        this.isEmpty = true;
    }
    contains(element) {
        let position = element.position();
        return position.x >= this.origin.x &&
            position.x < this.origin.x + this.extents.x &&
            position.y >= this.origin.y &&
            position.y < this.origin.y + this.extents.y;
    }
}
exports.QuadTreeLeafNode = QuadTreeLeafNode;
class QuadTreeNode extends QuadTreeLeafNode {
    constructor(origin, extents, upperLeft, upperRight, lowerLeft, lowerRight) {
        super(origin, extents);
        this.origin = origin;
        this.extents = extents;
        this.upperLeft = upperLeft;
        this.upperRight = upperRight;
        this.lowerLeft = lowerLeft;
        this.lowerRight = lowerRight;
    }
    accept(visitor) {
        visitor.visit(this);
    }
    add(element) {
        if (this.isEmpty) {
            super.add(element);
        }
        else {
            for (let child of this.children()) {
                if (child.contains(element)) {
                    child.add(element);
                    break;
                }
            }
        }
    }
    *children() {
        yield this.upperLeft;
        yield this.upperRight;
        yield this.lowerLeft;
        yield this.lowerRight;
    }
    clear() {
        super.clear();
        for (let child of this.children()) {
            child.clear();
        }
    }
}
exports.QuadTreeNode = QuadTreeNode;
//# sourceMappingURL=QuadTreeNode.js.map