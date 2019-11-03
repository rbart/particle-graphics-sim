"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(other) {
        return this.x == other.x && this.y == other.y;
    }
    addX(x) {
        return new Vector2d(this.x + x, this.y);
    }
    addY(y) {
        return new Vector2d(this.x, this.y + y);
    }
    add(other) {
        return new Vector2d(this.x + other.x, this.y + other.y);
    }
    addMutate(other) {
        this.x += other.x;
        this.y += other.y;
    }
    subtract(other) {
        return new Vector2d(this.x - other.x, this.y - other.y);
    }
    subtractMutate(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    multiply(scalar) {
        return new Vector2d(this.x * scalar, this.y * scalar);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    toString() {
        return `Vector2d: {x: ${this.x}, y: ${this.y}}`;
    }
}
exports.default = Vector2d;
//# sourceMappingURL=Vector2d.js.map