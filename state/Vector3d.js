"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector3d {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    multiply(scalar) {
        return new Vector3d(this.x * scalar, this.y * scalar, this.z * scalar);
    }
}
exports.default = Vector3d;
//# sourceMappingURL=Vector3d.js.map