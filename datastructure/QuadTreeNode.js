"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuadTreeNode {
    constructor(origin, extents, upperLeft = null, upperRight = null, lowerLeft = null, lowerRight = null) {
        this.origin = origin;
        this.extents = extents;
        this.upperLeft = upperLeft;
        this.upperRight = upperRight;
        this.lowerLeft = lowerLeft;
        this.lowerRight = lowerRight;
        this.elements = [];
        this.aggregate = null;
        this.isLeaf = upperLeft == null && upperRight == null && lowerLeft == null && lowerRight == null;
    }
    children() {
        if (this.isLeaf)
            return [];
        else
            return [this.upperLeft, this.upperRight, this.lowerLeft, this.lowerRight];
    }
    contains(element) {
        let position = element.position();
        return position.x >= this.origin.x &&
            position.x < this.origin.x + this.extents.x &&
            position.y >= this.origin.y &&
            position.y < this.origin.y + this.extents.y;
    }
}
exports.default = QuadTreeNode;
//# sourceMappingURL=QuadTreeNode.js.map