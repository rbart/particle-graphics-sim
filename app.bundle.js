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
        node.isEmpty = false;
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
        if (node.isEmpty) {
            node.aggregate = this.aggregator.aggregate(node.elements);
            return;
        }
        else if (node.isLeaf) {
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
        if (!node.isEmpty) {
            node.isEmpty = true;
            if (!node.isLeaf) {
                for (let child of node.children()) {
                    this.clearRecursive(child);
                }
            }
            node.elements = [];
            node.aggregate = null;
        }
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


/***/ }),

/***/ "./app/datastructure/QuadTreeNode.ts":
/*!*******************************************!*\
  !*** ./app/datastructure/QuadTreeNode.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        this.isEmpty = true;
        this.isLeaf = upperLeft == null && upperRight == null && lowerLeft == null && lowerRight == null;
        this.em = extents.length() / 5;
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
    containsMore(element) {
        let position = element.position();
        let num = this.em;
        return position.x >= this.origin.x - num &&
            position.x < this.origin.x + this.extents.x + num &&
            position.y >= this.origin.y - num &&
            position.y < this.origin.y + this.extents.y + num;
    }
}
exports.default = QuadTreeNode;


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
const RendererBuilder_1 = __webpack_require__(/*! ./visualization/RendererBuilder */ "./app/visualization/RendererBuilder.ts");
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
for (var i = 0; i < 5000; i++) {
    let particle = particleBuilder.generateRandomParticle(0.5, 1, 1);
    particles.push(particle);
}
let renderer = RendererBuilder_1.default.createDefault(ctx, c.width, c.height, 0.8);
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
    constructor(pos, spd, rad, color) {
        this.pos = pos;
        this.spd = spd;
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
        return new Particle_1.default(randomPosition, randomSpeed, radius, this.getRndColor());
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
            new QuadTreeGravityAdvancer_1.default(0.05, new Vector2d_1.default(width, height)),
            //new GravityAdvancer(0.05),
            new BasicAdvancer_1.default()
        ];
        return new AdvancerCollection_1.default(advancers);
    }
}
exports.default = AdvancerCollectionBuilder;


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

/***/ "./app/state/mutation/QuadTreeGravityAdvancer.ts":
/*!*******************************************************!*\
  !*** ./app/state/mutation/QuadTreeGravityAdvancer.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeBuilder_1 = __webpack_require__(/*! ../../datastructure/QuadTreeBuilder */ "./app/datastructure/QuadTreeBuilder.ts");
const QuadTreeBuilder_2 = __webpack_require__(/*! ../../datastructure/QuadTreeBuilder */ "./app/datastructure/QuadTreeBuilder.ts");
class QuadTreeGravityAdvancer {
    constructor(gravityCoef, extents) {
        this.gravityCoef = gravityCoef;
        this.extents = extents;
        let aggregator = new QuadTreeBuilder_2.ParticleAggregator();
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
            this.applyGravityRecursive(particle, this.quadTree.root);
        }
    }
    applyGravityRecursive(particle, node) {
        if (node.isEmpty)
            return;
        let contained = node.containsMore(particle);
        if (contained && node.isLeaf) {
            for (let other of node.elements) {
                if (other == particle)
                    continue;
                let diff = particle.pos.subtract(other.pos);
                let gravityStrength = 1.0 / (diff.lengthSquared()) * this.gravityCoef;
                let gravityVector = diff.multiply(gravityStrength);
                particle.spd.subtractMutate(gravityVector);
            }
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

/***/ "./app/visualization/CanvasRenderer.ts":
/*!*********************************************!*\
  !*** ./app/visualization/CanvasRenderer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CanvasRenderer {
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
    render(particles) {
        this.fade();
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
    fade() {
        let initialAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = this.fadeRate;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = initialAlpha;
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
class NullAggregate {
}
NullAggregate.instance = new NullAggregate();
class NullAggregator {
    aggregate(elements) { return NullAggregate.instance; }
    combine(aggregates) { return NullAggregate.instance; }
}
class QuadTreeRenderer {
    constructor(ctx, extents) {
        this.ctx = ctx;
        this.extents = extents;
        // TODO: don't create the quadtree at all here. We should reuse a single quadTree
        // throughout
        let minNodeSize = extents.length() / 40;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(new NullAggregator(), minNodeSize);
        this.quadTree = quadTreeBuilder.build(extents);
    }
    initialize() { }
    render(particles) {
        this.quadTree.clear();
        for (let particle of particles) {
            this.quadTree.add(particle);
        }
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = "rgb(30,30,30)";
        this.ctx.beginPath();
        this.renderRecursive(this.quadTree.root);
        this.ctx.stroke();
    }
    renderRecursive(node) {
        this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
        if (!node.isEmpty) {
            for (let child of node.children()) {
                this.renderRecursive(child);
            }
        }
    }
}
exports.default = QuadTreeRenderer;


/***/ }),

/***/ "./app/visualization/RendererBuilder.ts":
/*!**********************************************!*\
  !*** ./app/visualization/RendererBuilder.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CanvasRenderer_1 = __webpack_require__(/*! ./CanvasRenderer */ "./app/visualization/CanvasRenderer.ts");
const QuadTreeRenderer_1 = __webpack_require__(/*! ./QuadTreeRenderer */ "./app/visualization/QuadTreeRenderer.ts");
const Vector2d_1 = __webpack_require__(/*! ../state/Vector2d */ "./app/state/Vector2d.ts");
class RendererBuilder {
    static createDefault(ctx, width, height, fadeRate) {
        let canvasRenderer = new CanvasRenderer_1.default(ctx, width, height, fadeRate);
        let quadTreeRenderer = new QuadTreeRenderer_1.default(ctx, new Vector2d_1.default(width, height));
        let renderer = {
            initialize() {
                canvasRenderer.initialize();
                quadTreeRenderer.initialize();
            },
            render(elements) {
                canvasRenderer.render(elements);
                quadTreeRenderer.render(elements);
            }
        };
        return renderer;
    }
}
exports.default = RendererBuilder;


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map