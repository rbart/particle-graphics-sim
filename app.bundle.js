/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/script.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/datastructure/QuadTreeBuilder.ts":
/*!**********************************************!*\
  !*** ./app/datastructure/QuadTreeBuilder.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ../state/Vector2d */ "./app/state/Vector2d.ts");
const QuadTreeNode_1 = __webpack_require__(/*! ./QuadTreeNode */ "./app/datastructure/QuadTreeNode.ts");
class QuadTreeBuilder {
    constructor(minNodeSize) {
        this.minNodeSize = minNodeSize;
    }
    // TODO just pass a rectangle
    build(extents) {
        return this.buildImpl(new Vector2d_1.default(0, 0), extents);
    }
    buildImpl(origin, extents) {
        if (extents.length() >= this.minNodeSize) {
            let halfExtent = extents.multiply(0.5);
            let upperLeft = this.buildImpl(origin, halfExtent);
            let upperRight = this.buildImpl(origin.addX(halfExtent.x), halfExtent);
            let lowerLeft = this.buildImpl(origin.addY(halfExtent.y), halfExtent);
            let lowerRight = this.buildImpl(origin.add(halfExtent), halfExtent);
            return new QuadTreeNode_1.QuadTreeInnerNode(origin, extents, upperLeft, upperRight, lowerLeft, lowerRight);
        }
        else {
            return new QuadTreeNode_1.QuadTreeLeafNode(origin, extents);
        }
    }
}
exports.default = QuadTreeBuilder;


/***/ }),

/***/ "./app/datastructure/QuadTreeNode.ts":
/*!*******************************************!*\
  !*** ./app/datastructure/QuadTreeNode.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
class QuadTreeInnerNode extends QuadTreeLeafNode {
    constructor(origin, extents, upperLeft, upperRight, lowerLeft, lowerRight) {
        super(origin, extents);
        this.origin = origin;
        this.extents = extents;
        this.upperLeft = upperLeft;
        this.upperRight = upperRight;
        this.lowerLeft = lowerLeft;
        this.lowerRight = lowerRight;
        this.allChildrenEmpty = true;
    }
    accept(visitor) {
        if (this.allChildrenEmpty) {
            visitor.visitLeaf(this);
        }
        else {
            visitor.visit(this);
        }
    }
    add(element) {
        if (this.isEmpty) {
            this.isEmpty = false;
            this.elements.push(element);
        }
        else if (this.allChildrenEmpty) {
            this.allChildrenEmpty = false;
            for (let priorElement of this.elements) {
                this.add(priorElement);
            }
            this.elements.length = 0;
            this.add(element);
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
        if (!this.isEmpty) {
            super.clear();
        }
        if (!this.allChildrenEmpty) {
            for (let child of this.children()) {
                child.clear();
            }
            this.allChildrenEmpty = true;
        }
    }
}
exports.QuadTreeInnerNode = QuadTreeInnerNode;


/***/ }),

/***/ "./app/script.ts":
/*!***********************!*\
  !*** ./app/script.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ParticleBuilder_1 = __webpack_require__(/*! ./state/ParticleBuilder */ "./app/state/ParticleBuilder.ts");
const AdvancerCollectionBuilder_1 = __webpack_require__(/*! ./state/mutation/AdvancerCollectionBuilder */ "./app/state/mutation/AdvancerCollectionBuilder.ts");
const RendererCollectionBuilder_1 = __webpack_require__(/*! ./visualization/RendererCollectionBuilder */ "./app/visualization/RendererCollectionBuilder.ts");
var c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
function fullscreen() {
    var el = document.getElementById('canvas');
    if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
    else {
        el.mozRequestFullScreen();
    }
}
c.addEventListener("click", fullscreen);
let ctx = c.getContext("2d"); //ctx_temp!;
let particles = [];
let particleBuilder = new ParticleBuilder_1.default(c.width, c.height);
for (var i = 0; i < 2000; i++) {
    let particle = particleBuilder.generateRandomParticle(0.5, 1, 1);
    particles.push(particle);
}
let renderer = RendererCollectionBuilder_1.default.createDefault(ctx, c.width, c.height, 0.8);
renderer.initialize();
let advancer = AdvancerCollectionBuilder_1.default.createDefault(c.width, c.height);
function frame() {
    advancer.advance(particles);
    renderer.render(particles);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


/***/ }),

/***/ "./app/state/Particle.ts":
/*!*******************************!*\
  !*** ./app/state/Particle.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Particle {
    constructor(pos, spd, mass, rad, color) {
        this.pos = pos;
        this.spd = spd;
        this.mass = mass;
        this.rad = rad;
        this.color = color;
        this.hslColorString_memo = null;
    }
    position() {
        return this.pos;
    }
    hslColorString() {
        if (this.hslColorString_memo == null) {
            this.hslColorString_memo = `hsl(${this.color.x | 0},${this.color.y | 0}%,${this.color.z | 0}%)`;
        }
        return this.hslColorString_memo;
    }
}
exports.default = Particle;


/***/ }),

/***/ "./app/state/ParticleBuilder.ts":
/*!**************************************!*\
  !*** ./app/state/ParticleBuilder.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ./Vector2d */ "./app/state/Vector2d.ts");
const Vector3d_1 = __webpack_require__(/*! ./Vector3d */ "./app/state/Vector3d.ts");
const Particle_1 = __webpack_require__(/*! ./Particle */ "./app/state/Particle.ts");
class ParticleBuilder {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    generateRandomParticle(maxSpeed, minRadius, maxRadius) {
        let radius = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
        let randomPosition = new Vector2d_1.default(Math.floor(Math.random() * this.width - radius) + radius, Math.floor(Math.random() * this.height - radius) + radius);
        let randomSpeed = new Vector2d_1.default(Math.random() * maxSpeed * 2 - maxSpeed, Math.random() * maxSpeed * 2 - maxSpeed);
        return new Particle_1.default(randomPosition, randomSpeed, radius, radius, this.getRndColor());
    }
    getRndColor() {
        let hue = (360 * Math.random() | 0);
        return new Vector3d_1.default(hue, 100, 50);
    }
}
exports.default = ParticleBuilder;


/***/ }),

/***/ "./app/state/Vector2d.ts":
/*!*******************************!*\
  !*** ./app/state/Vector2d.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    position() {
        return this;
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


/***/ }),

/***/ "./app/state/Vector3d.ts":
/*!*******************************!*\
  !*** ./app/state/Vector3d.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ "./app/state/mutation/AdvancerCollection.ts":
/*!**************************************************!*\
  !*** ./app/state/mutation/AdvancerCollection.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ "./app/state/mutation/AdvancerCollectionBuilder.ts":
/*!*********************************************************!*\
  !*** ./app/state/mutation/AdvancerCollectionBuilder.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BasicAdvancer_1 = __webpack_require__(/*! ./BasicAdvancer */ "./app/state/mutation/BasicAdvancer.ts");
const WallBounceAdvancer_1 = __webpack_require__(/*! ./WallBounceAdvancer */ "./app/state/mutation/WallBounceAdvancer.ts");
const Vector2d_1 = __webpack_require__(/*! ../Vector2d */ "./app/state/Vector2d.ts");
const QuadTreeGravityAdvancer_1 = __webpack_require__(/*! ./QuadTreeGravityAdvancer */ "./app/state/mutation/QuadTreeGravityAdvancer.ts");
const AdvancerCollection_1 = __webpack_require__(/*! ./AdvancerCollection */ "./app/state/mutation/AdvancerCollection.ts");
class AdvancerCollectionBuilder {
    static createDefault(width, height) {
        let advancers = [
            new WallBounceAdvancer_1.default(0.5, width, height),
            new QuadTreeGravityAdvancer_1.default(0.01, new Vector2d_1.default(width, height)),
            //new GravityAdvancer(0.005),
            new BasicAdvancer_1.default()
        ];
        return new AdvancerCollection_1.default(advancers);
    }
}
exports.default = AdvancerCollectionBuilder;


/***/ }),

/***/ "./app/state/mutation/ApplyGravityVisitor.ts":
/*!***************************************************!*\
  !*** ./app/state/mutation/ApplyGravityVisitor.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ApplyGravityVisitor {
    constructor(particle, gravityCoef) {
        this.particle = particle;
        this.gravityCoef = gravityCoef;
    }
    visit(node) {
        if (node.isEmpty)
            return;
        let canApplyAggregate = this.canApplyAggregate(node);
        if (!canApplyAggregate) {
            for (let child of node.children()) {
                child.accept(this);
            }
        }
        else {
            this.apply([node.aggregate]);
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
            let gravityStrength = other.mass / (diff.lengthSquared()) * this.gravityCoef;
            let gravityVector = diff.multiply(gravityStrength);
            this.particle.spd.subtractMutate(gravityVector);
        }
    }
    canApplyAggregate(node) {
        let position = this.particle.position();
        let bufferWidth = Math.max(node.extents.x, node.extents.y) / 4;
        let contains = position.x >= node.origin.x - bufferWidth &&
            position.x < node.origin.x + node.extents.x + bufferWidth &&
            position.y >= node.origin.y - bufferWidth &&
            position.y < node.origin.y + node.extents.y + bufferWidth;
        return !contains;
    }
}
exports.default = ApplyGravityVisitor;


/***/ }),

/***/ "./app/state/mutation/BasicAdvancer.ts":
/*!*********************************************!*\
  !*** ./app/state/mutation/BasicAdvancer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BasicAdvancer {
    advance(particles) {
        for (let particle of particles) {
            particle.pos.addMutate(particle.spd);
        }
    }
}
exports.default = BasicAdvancer;


/***/ }),

/***/ "./app/state/mutation/ParticleAggregationVisitor.ts":
/*!**********************************************************!*\
  !*** ./app/state/mutation/ParticleAggregationVisitor.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Particle_1 = __webpack_require__(/*! ../Particle */ "./app/state/Particle.ts");
const Vector2d_1 = __webpack_require__(/*! ../Vector2d */ "./app/state/Vector2d.ts");
const Vector3d_1 = __webpack_require__(/*! ../Vector3d */ "./app/state/Vector3d.ts");
class ParticleAggregationVisitor {
    visit(node) {
        if (node.isEmpty) {
            return;
        }
        let childAggregates = [];
        for (let child of node.children()) {
            if (!child.isEmpty) {
                child.accept(this);
                childAggregates.push(child.aggregate);
            }
        }
        node.aggregate = this.aggregate(childAggregates);
    }
    visitLeaf(node) {
        if (node.isEmpty)
            return;
        node.aggregate = this.aggregate(node.elements);
    }
    aggregate(particles) {
        let totalMass = 0;
        let sumX = 0;
        let sumY = 0;
        for (let particle of particles) {
            totalMass += particle.mass;
            sumX += particle.pos.x * particle.mass;
            sumY += particle.pos.y * particle.mass;
        }
        let avgX = totalMass == 0 ? 0 : sumX / totalMass;
        let avgY = totalMass == 0 ? 0 : sumY / totalMass;
        // TODO aggregate all the fields properly
        return new Particle_1.default(new Vector2d_1.default(avgX, avgY), new Vector2d_1.default(0, 0), totalMass, totalMass, new Vector3d_1.default(0, 0, 0));
    }
}
exports.default = ParticleAggregationVisitor;


/***/ }),

/***/ "./app/state/mutation/QuadTreeGravityAdvancer.ts":
/*!*******************************************************!*\
  !*** ./app/state/mutation/QuadTreeGravityAdvancer.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeBuilder_1 = __webpack_require__(/*! ../../datastructure/QuadTreeBuilder */ "./app/datastructure/QuadTreeBuilder.ts");
const ParticleAggregationVisitor_1 = __webpack_require__(/*! ./ParticleAggregationVisitor */ "./app/state/mutation/ParticleAggregationVisitor.ts");
const ApplyGravityVisitor_1 = __webpack_require__(/*! ./ApplyGravityVisitor */ "./app/state/mutation/ApplyGravityVisitor.ts");
class QuadTreeGravityAdvancer {
    constructor(gravityCoef, extents) {
        this.gravityCoef = gravityCoef;
        this.extents = extents;
        // TODO: move this into a builder and/or constants file.
        let minNodeSize = extents.length() / 80;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(minNodeSize);
        this.quadTree = quadTreeBuilder.build(extents);
        this.particleAggregator = new ParticleAggregationVisitor_1.default();
    }
    advance(particles) {
        this.quadTree.clear();
        for (let particle of particles) {
            this.quadTree.add(particle);
        }
        this.quadTree.accept(this.particleAggregator);
        for (let particle of particles) {
            let gravityVisitor = new ApplyGravityVisitor_1.default(particle, this.gravityCoef);
            this.quadTree.accept(gravityVisitor);
        }
    }
}
exports.default = QuadTreeGravityAdvancer;


/***/ }),

/***/ "./app/state/mutation/WallBounceAdvancer.ts":
/*!**************************************************!*\
  !*** ./app/state/mutation/WallBounceAdvancer.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WallBounceAdvancer {
    constructor(bounceCoef, width, height) {
        this.bounceCoef = bounceCoef;
        this.width = width;
        this.height = height;
    }
    advance(particles) {
        for (let particle of particles) {
            if (this.belowMinX(particle) || this.aboveMaxX(particle)) {
                this.invertSpdX(particle);
            }
            if (this.aboveMaxY(particle) || this.belowMinY(particle)) {
                this.invertSpdY(particle);
            }
        }
    }
    invertSpdX(particle) {
        particle.spd.x *= -this.bounceCoef;
    }
    invertSpdY(particle) {
        particle.spd.y *= -this.bounceCoef;
    }
    aboveMaxX(particle) {
        return (particle.pos.x > this.width - particle.rad && particle.spd.x > 0);
    }
    belowMinX(particle) {
        return (particle.pos.x < particle.rad && particle.spd.x < 0);
    }
    aboveMaxY(particle) {
        return (particle.pos.y > this.height - particle.rad && particle.spd.y > 0);
    }
    belowMinY(particle) {
        return (particle.pos.y < particle.rad && particle.spd.y < 0);
    }
}
exports.default = WallBounceAdvancer;


/***/ }),

/***/ "./app/visualization/FadeRenderer.ts":
/*!*******************************************!*\
  !*** ./app/visualization/FadeRenderer.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FadeRenderer {
    constructor(ctx, width, height, fadeRate) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.fadeRate = fadeRate;
    }
    initialize() {
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "rgb(3,3,3)";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    render(_) {
        let initialAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = this.fadeRate;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = initialAlpha;
    }
}
exports.default = FadeRenderer;


/***/ }),

/***/ "./app/visualization/ParticleRenderer.ts":
/*!***********************************************!*\
  !*** ./app/visualization/ParticleRenderer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CanvasRenderer {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }
    initialize() { }
    render(particles) {
        for (let particle of particles) {
            this.ctx.strokeStyle = particle.hslColorString();
            this.ctx.lineWidth = particle.rad * 2;
            this.ctx.beginPath();
            if (particle.spd.x != 0 || particle.spd.y != 0) {
                this.drawPathLine(particle);
            }
            this.ctx.stroke();
        }
    }
    drawPathLine(particle) {
        this.ctx.moveTo(particle.pos.x, particle.pos.y);
        let spdVect = particle.spd;
        let lastPos = particle.pos.subtract(spdVect);
        while (spdVect.lengthSquared() < 4) {
            spdVect = spdVect.multiply(2);
            lastPos = particle.pos.subtract(spdVect);
        }
        this.ctx.lineTo(lastPos.x, lastPos.y);
    }
}
exports.default = CanvasRenderer;


/***/ }),

/***/ "./app/visualization/QuadTreeRenderer.ts":
/*!***********************************************!*\
  !*** ./app/visualization/QuadTreeRenderer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeBuilder_1 = __webpack_require__(/*! ../datastructure/QuadTreeBuilder */ "./app/datastructure/QuadTreeBuilder.ts");
class QuadTreeRenderer {
    constructor(ctx, extents) {
        this.ctx = ctx;
        this.extents = extents;
        // TODO: don't create the quadtree at all here. We should reuse a single quadTree
        // throughout
        let minNodeSize = extents.length() / 80;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(minNodeSize);
        this.quadTree = quadTreeBuilder.build(extents);
    }
    initialize() { }
    render(particles) {
        this.quadTree.clear();
        for (let particle of particles) {
            this.quadTree.add(particle);
        }
        let initialAlpha = this.ctx.globalAlpha;
        this.ctx.lineWidth = 0.5;
        this.ctx.globalAlpha = 0.2;
        this.ctx.strokeStyle = "rgb(100,100,100)";
        this.ctx.beginPath();
        let renderingVisitor = new RenderingVisitor(this.ctx);
        this.quadTree.accept(renderingVisitor);
        this.ctx.stroke();
        this.ctx.globalAlpha = initialAlpha;
    }
}
exports.default = QuadTreeRenderer;
class RenderingVisitor {
    constructor(ctx) {
        this.ctx = ctx;
    }
    visit(node) {
        if (!node.isEmpty) {
            this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
            for (let child of node.children()) {
                child.accept(this);
            }
        }
    }
    visitLeaf(node) {
        if (!node.isEmpty) {
            this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
        }
    }
}


/***/ }),

/***/ "./app/visualization/RendererCollection.ts":
/*!*************************************************!*\
  !*** ./app/visualization/RendererCollection.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RendererCollection {
    constructor(renderers) {
        this.renderers = renderers;
    }
    initialize() {
        for (let renderer of this.renderers) {
            renderer.initialize();
        }
    }
    render(particles) {
        for (let renderer of this.renderers) {
            renderer.render(particles);
        }
    }
}
exports.default = RendererCollection;


/***/ }),

/***/ "./app/visualization/RendererCollectionBuilder.ts":
/*!********************************************************!*\
  !*** ./app/visualization/RendererCollectionBuilder.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ParticleRenderer_1 = __webpack_require__(/*! ./ParticleRenderer */ "./app/visualization/ParticleRenderer.ts");
const QuadTreeRenderer_1 = __webpack_require__(/*! ./QuadTreeRenderer */ "./app/visualization/QuadTreeRenderer.ts");
const FadeRenderer_1 = __webpack_require__(/*! ./FadeRenderer */ "./app/visualization/FadeRenderer.ts");
const Vector2d_1 = __webpack_require__(/*! ../state/Vector2d */ "./app/state/Vector2d.ts");
const RendererCollection_1 = __webpack_require__(/*! ./RendererCollection */ "./app/visualization/RendererCollection.ts");
class RendererCollectionBuilder {
    static createDefault(ctx, width, height, fadeRate) {
        return new RendererCollection_1.default([
            new FadeRenderer_1.default(ctx, width, height, fadeRate),
            new ParticleRenderer_1.default(ctx, width, height),
            new QuadTreeRenderer_1.default(ctx, new Vector2d_1.default(width, height))
        ]);
    }
}
exports.default = RendererCollectionBuilder;


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map