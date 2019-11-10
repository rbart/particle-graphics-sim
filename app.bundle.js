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

/***/ "./app/datastructure/Collection.ts":
/*!*****************************************!*\
  !*** ./app/datastructure/Collection.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    constructor() {
        this.elements = [];
    }
}
exports.default = Collection;


/***/ }),

/***/ "./app/datastructure/QuadTreeBuilder.ts":
/*!**********************************************!*\
  !*** ./app/datastructure/QuadTreeBuilder.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const QuadTreeNode_1 = __webpack_require__(/*! ./QuadTreeNode */ "./app/datastructure/QuadTreeNode.ts");
const Rectangle_1 = __webpack_require__(/*! ../state/Rectangle */ "./app/state/Rectangle.ts");
class QuadTreeBuilder {
    constructor(collectionFactory, minNodeSize) {
        this.collectionFactory = collectionFactory;
        this.minNodeSize = minNodeSize;
    }
    build(bounds) {
        if (bounds.extents.length() >= this.minNodeSize) {
            let halfExtent = bounds.extents.multiply(0.5);
            let upperLeft = this.build(new Rectangle_1.default(bounds.origin, halfExtent));
            let upperRight = this.build(new Rectangle_1.default(bounds.origin.addX(halfExtent.x), halfExtent));
            let lowerLeft = this.build(new Rectangle_1.default(bounds.origin.addY(halfExtent.y), halfExtent));
            let lowerRight = this.build(new Rectangle_1.default(bounds.origin.add(halfExtent), halfExtent));
            return new QuadTreeNode_1.QuadTreeInnerNode(bounds, this.collectionFactory.createInstance(bounds), upperLeft, upperRight, lowerLeft, lowerRight);
        }
        else {
            return new QuadTreeNode_1.QuadTreeLeafNode(bounds, this.collectionFactory.createInstance(bounds));
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
    constructor(bounds, collection) {
        this.bounds = bounds;
        this.collection = collection;
        this.isEmpty = true;
        this.elements = collection.elements; // keep direct pointer for perf
    }
    accept(visitor) {
        visitor.visitLeaf(this);
    }
    add(element) {
        this.isEmpty = false;
        this.elements.push(element);
    }
    clear() {
        this.isEmpty = true;
        this.elements.length = 0;
    }
}
exports.QuadTreeLeafNode = QuadTreeLeafNode;
class QuadTreeInnerNode extends QuadTreeLeafNode {
    constructor(bounds, collection, upperLeft, upperRight, lowerLeft, lowerRight) {
        super(bounds, collection);
        this.bounds = bounds;
        this.collection = collection;
        this.upperLeft = upperLeft;
        this.upperRight = upperRight;
        this.lowerLeft = lowerLeft;
        this.lowerRight = lowerRight;
        this.allChildrenEmpty = true;
        this.children = [upperLeft, upperRight, lowerLeft, lowerRight];
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
            for (let child of this.children) {
                if (child.bounds.contains(element)) {
                    child.add(element);
                    break;
                }
            }
        }
    }
    clear() {
        if (!this.isEmpty) {
            super.clear();
        }
        if (!this.allChildrenEmpty) {
            for (let child of this.children) {
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
const Vector2d_1 = __webpack_require__(/*! ./state/Vector2d */ "./app/state/Vector2d.ts");
const Rectangle_1 = __webpack_require__(/*! ./state/Rectangle */ "./app/state/Rectangle.ts");
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
let ctx = c.getContext("2d");
let particles = [];
let particleBuilder = new ParticleBuilder_1.default(c.width, c.height);
for (var i = 0; i < 2000; i++) {
    let particle = particleBuilder.generateRandomParticle(0.3, 1.5, 1.5);
    particles.push(particle);
}
let bounds = new Rectangle_1.default(new Vector2d_1.default(0, 0), new Vector2d_1.default(c.width, c.height));
let renderer = RendererCollectionBuilder_1.default.createDefault(ctx, bounds, 0.7);
renderer.initialize();
let advancer = AdvancerCollectionBuilder_1.default.createDefault(bounds);
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
    constructor(pos, spd, mass, rad, hue) {
        this.pos = pos;
        this.spd = spd;
        this.mass = mass;
        this.rad = rad;
        this.hue = hue;
        this.hslColorString_memo = null;
    }
    position() {
        return this.pos;
    }
    hslColorString() {
        if (this.hslColorString_memo == null) {
            let colorAngle = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI);
            this.hslColorString_memo = `hsl(${colorAngle | 0},100%,50%)`;
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
        return new Particle_1.default(randomPosition, randomSpeed, radius, radius, this.getRndHue());
    }
    getRndHue() {
        let hueAngle = 360 * Math.random();
        let hueX = Math.cos(hueAngle);
        let hueY = Math.sin(hueAngle);
        return new Vector2d_1.default(hueX, hueY);
    }
}
exports.default = ParticleBuilder;


/***/ }),

/***/ "./app/state/ParticleCollection.ts":
/*!*****************************************!*\
  !*** ./app/state/ParticleCollection.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __webpack_require__(/*! ../datastructure/Collection */ "./app/datastructure/Collection.ts");
const Particle_1 = __webpack_require__(/*! ./Particle */ "./app/state/Particle.ts");
const Vector2d_1 = __webpack_require__(/*! ./Vector2d */ "./app/state/Vector2d.ts");
const Rectangle_1 = __webpack_require__(/*! ./Rectangle */ "./app/state/Rectangle.ts");
class ParticleCollectionFactory {
    constructor(bufferWidthConstant = ParticleCollectionFactory.defaultBufferWidthConstant) {
        this.bufferWidthConstant = bufferWidthConstant;
    }
    createInstance(bounds) {
        return new ParticleCollection(bounds, this.bufferWidthConstant);
    }
}
exports.ParticleCollectionFactory = ParticleCollectionFactory;
ParticleCollectionFactory.defaultBufferWidthConstant = (1 / 6);
class ParticleCollection extends Collection_1.default {
    constructor(bounds, bufferWidthConstant) {
        super();
        this.aggregate = new Particle_1.default(new Vector2d_1.default(0, 0), new Vector2d_1.default(0, 0), 0, 0, new Vector2d_1.default(0, 0));
        let bufferWidth = bounds.extents.length() * bufferWidthConstant;
        let paddedOrigin = new Vector2d_1.default(bounds.origin.x - bufferWidth, bounds.origin.y - bufferWidth);
        let paddedExtents = new Vector2d_1.default(bounds.extents.x + 2 * bufferWidth, bounds.extents.y + 2 * bufferWidth);
        this.paddedBounds = new Rectangle_1.default(paddedOrigin, paddedExtents);
    }
}
exports.default = ParticleCollection;


/***/ }),

/***/ "./app/state/Rectangle.ts":
/*!********************************!*\
  !*** ./app/state/Rectangle.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Rectangle {
    constructor(origin, extents) {
        this.origin = origin;
        this.extents = extents;
    }
    contains(element) {
        let position = element.position();
        return position.x >= this.origin.x &&
            position.x < this.origin.x + this.extents.x &&
            position.y >= this.origin.y &&
            position.y < this.origin.y + this.extents.y;
    }
    toString() {
        return `Rectangle: {origin: ${this.origin}, extents: ${this.extents}}`;
    }
}
exports.default = Rectangle;


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
    multiplyMutate(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    divideMutate(scalar) {
        this.x /= scalar;
        this.y /= scalar;
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
    dotProduct(other) {
        return this.x * other.x + this.y * other.y;
    }
    cosineSimilarity(other) {
        return this.dotProduct(other) / (this.length() * other.length());
    }
    setEqualTo(other) {
        this.x = other.x;
        this.y = other.y;
    }
}
exports.default = Vector2d;


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
const QuadTreeGravityAdvancer_1 = __webpack_require__(/*! ./QuadTreeGravityAdvancer */ "./app/state/mutation/QuadTreeGravityAdvancer.ts");
const AdvancerCollection_1 = __webpack_require__(/*! ./AdvancerCollection */ "./app/state/mutation/AdvancerCollection.ts");
const FixedGravityAdvancer_1 = __webpack_require__(/*! ./FixedGravityAdvancer */ "./app/state/mutation/FixedGravityAdvancer.ts");
class AdvancerCollectionBuilder {
    static createDefault(bounds) {
        let advancers = [
            new WallBounceAdvancer_1.default(1, bounds),
            new QuadTreeGravityAdvancer_1.default(0.03, bounds),
            new BasicAdvancer_1.default(),
            new FixedGravityAdvancer_1.default(bounds.extents.multiply(0.5), 1, 0.04)
        ];
        return new AdvancerCollection_1.default(advancers);
    }
}
exports.default = AdvancerCollectionBuilder;


/***/ }),

/***/ "./app/state/mutation/ApplyColorGravityVisitor.ts":
/*!********************************************************!*\
  !*** ./app/state/mutation/ApplyColorGravityVisitor.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ApplyGravityVisitor_1 = __webpack_require__(/*! ./ApplyGravityVisitor */ "./app/state/mutation/ApplyGravityVisitor.ts");
class ApplyColorGravityVisitor extends ApplyGravityVisitor_1.default {
    constructor(particle, gravityCoef, frameNumber) {
        super(particle, gravityCoef);
        this.particle = particle;
        this.gravityCoef = gravityCoef;
        this.frameNumber = frameNumber;
    }
    apply(particles) {
        for (let other of particles) {
            if (other == this.particle)
                continue;
            let diff = this.particle.pos.subtract(other.pos);
            let colorCosine = this.particle.hue.cosineSimilarity(other.hue);
            let colorFactorCosine = Math.cos(this.frameNumber / 151);
            // this controls how much color controls gravity
            colorCosine = (colorFactorCosine + (1 - colorFactorCosine) * colorCosine);
            // this controls how often everything switches to negative
            let gravityPushPullCosine = Math.cos(this.frameNumber / 237);
            colorCosine *= -0.2 / (1.1 + gravityPushPullCosine) + 1;
            //let frameCosine = Math.cos(this.frameNumber / 300)
            //let frameCosine2 = Math.cos(this.frameNumber / 600)
            //colorCosine = frameCosine2 * (frameCosine + (1-frameCosine)*colorCosine)
            let gravityStrength = (colorCosine * other.mass * this.gravityCoef) / diff.lengthSquared();
            let gravityVector = diff.multiply(gravityStrength);
            if (gravityVector.length() > 20)
                gravityVector.multiplyMutate(20 / gravityVector.length());
            this.particle.spd.subtractMutate(gravityVector);
        }
    }
}
exports.default = ApplyColorGravityVisitor;


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
        let canApplyAggregate = !node.collection.paddedBounds.contains(this.particle);
        if (!canApplyAggregate) {
            for (let child of node.children) {
                child.accept(this);
            }
        }
        else {
            this.apply([node.collection.aggregate]);
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
            particle.spd.multiplyMutate(0.994);
            particle.pos.addMutate(particle.spd);
        }
    }
}
exports.default = BasicAdvancer;


/***/ }),

/***/ "./app/state/mutation/FixedGravityAdvancer.ts":
/*!****************************************************!*\
  !*** ./app/state/mutation/FixedGravityAdvancer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FixedGravityAdvancer {
    constructor(point, mass, gravityCoef) {
        this.point = point;
        this.mass = mass;
        this.gravityCoef = gravityCoef;
    }
    advance(particles) {
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i];
            let diff = p1.pos.subtract(this.point);
            let gravityStrength = this.mass / (diff.length()) * this.gravityCoef;
            let gravityVector = diff.multiply(gravityStrength);
            if (gravityVector.length() > 20)
                gravityVector.multiplyMutate(20 / gravityVector.length());
            p1.spd.subtractMutate(gravityVector);
        }
    }
}
exports.default = FixedGravityAdvancer;


/***/ }),

/***/ "./app/state/mutation/ParticleAggregationVisitor.ts":
/*!**********************************************************!*\
  !*** ./app/state/mutation/ParticleAggregationVisitor.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ../Vector2d */ "./app/state/Vector2d.ts");
class ParticleAggregationVisitor {
    visit(node) {
        if (node.isEmpty) {
            return;
        }
        let childAggregates = [];
        for (let child of node.children) {
            if (!child.isEmpty) {
                child.accept(this);
                childAggregates.push(child.collection.aggregate);
            }
        }
        this.aggregate(childAggregates, node);
    }
    visitLeaf(node) {
        if (node.isEmpty)
            return;
        this.aggregate(node.elements, node);
    }
    aggregate(particles, node) {
        let aggregate = node.collection.aggregate;
        if (particles.length == 1) {
            let particle = particles[0];
            aggregate.pos.setEqualTo(particle.pos);
            aggregate.hue.setEqualTo(particle.hue);
            aggregate.mass = particle.mass;
        }
        else {
            let totalMass = 0;
            let avgPos = new Vector2d_1.default(0, 0);
            let avgHue = new Vector2d_1.default(0, 0);
            for (let particle of particles) {
                totalMass += particle.mass;
                avgPos.addMutate(particle.pos.multiply(particle.mass));
                avgHue.addMutate(particle.hue.multiply(particle.mass));
            }
            avgPos.divideMutate(totalMass);
            avgHue.divideMutate(avgHue.length());
            aggregate.pos.setEqualTo(avgPos);
            aggregate.hue.setEqualTo(avgHue);
            aggregate.mass = totalMass;
        }
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
const ParticleCollection_1 = __webpack_require__(/*! ../ParticleCollection */ "./app/state/ParticleCollection.ts");
const ApplyColorGravityVisitor_1 = __webpack_require__(/*! ./ApplyColorGravityVisitor */ "./app/state/mutation/ApplyColorGravityVisitor.ts");
class QuadTreeGravityAdvancer {
    constructor(gravityCoef, bounds, minNodeSizeFactor = QuadTreeGravityAdvancer.defaultMinNodeSizeFactor) {
        this.gravityCoef = gravityCoef;
        this.bounds = bounds;
        this.frame = 0;
        let minNodeSize = bounds.extents.length() * minNodeSizeFactor;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(new ParticleCollection_1.ParticleCollectionFactory(), minNodeSize);
        this.quadTree = quadTreeBuilder.build(bounds);
        this.particleAggregator = new ParticleAggregationVisitor_1.default();
    }
    advance(particles) {
        this.frame++;
        if (this.frame % 100 == 0) {
            console.log("Frame: " + this.frame + " Cos: " + Math.cos(this.frame / 500));
        }
        this.quadTree.clear();
        for (let particle of particles) {
            this.quadTree.add(particle);
        }
        this.quadTree.accept(this.particleAggregator);
        for (let particle of particles) {
            let gravityVisitor = this.getGravityVisitor(particle);
            this.quadTree.accept(gravityVisitor);
        }
    }
    getGravityVisitor(particle) {
        return new ApplyColorGravityVisitor_1.default(particle, this.gravityCoef, this.frame);
        //return new ApplyGravityVisitor(particle, this.gravityCoef)
        // if (this.frame % 1000 > 500) {
        //   return new ApplyGravityVisitor(particle, this.gravityCoef)
        // } else {
        //   return new ApplyColorGravityVisitor(particle, this.gravityCoef, this.frame)
        // }
    }
}
exports.default = QuadTreeGravityAdvancer;
QuadTreeGravityAdvancer.defaultMinNodeSizeFactor = (1 / 200);


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
    constructor(bounceCoef, bounds) {
        this.bounceCoef = bounceCoef;
        this.bounds = bounds;
        this.origin = bounds.origin;
        this.outer = bounds.origin.add(bounds.extents);
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
        return (particle.pos.x > this.outer.x - particle.rad && particle.spd.x > 0);
    }
    belowMinX(particle) {
        return (particle.pos.x < particle.rad + this.origin.x && particle.spd.x < 0);
    }
    aboveMaxY(particle) {
        return (particle.pos.y > this.outer.y - particle.rad && particle.spd.y > 0);
    }
    belowMinY(particle) {
        return (particle.pos.y < particle.rad + this.origin.y && particle.spd.y < 0);
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
    constructor(ctx, bounds, fadeRate) {
        this.ctx = ctx;
        this.bounds = bounds;
        this.fadeRate = fadeRate;
    }
    initialize() {
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "rgb(3,3,3)";
        this.ctx.fillRect(this.bounds.origin.x, this.bounds.origin.y, this.bounds.extents.x, this.bounds.extents.y);
    }
    render(_) {
        let initialAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = this.fadeRate;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.bounds.origin.x, this.bounds.origin.y, this.bounds.extents.x, this.bounds.extents.y);
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
    constructor(ctx, rectangle) {
        this.ctx = ctx;
        this.rectangle = rectangle;
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
        // TODO: particles could remember their own lastpos.
        this.ctx.moveTo(particle.pos.x, particle.pos.y);
        let spdVect = particle.spd;
        let lengthSquared = spdVect.lengthSquared();
        if (lengthSquared < 6) {
            let shortage = 6 / lengthSquared;
            spdVect = spdVect.multiply(Math.sqrt(shortage));
        }
        let lastPos = particle.pos.subtract(spdVect);
        this.ctx.lineTo(lastPos.x, lastPos.y);
    }
}
exports.default = CanvasRenderer;


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
const FadeRenderer_1 = __webpack_require__(/*! ./FadeRenderer */ "./app/visualization/FadeRenderer.ts");
const RendererCollection_1 = __webpack_require__(/*! ./RendererCollection */ "./app/visualization/RendererCollection.ts");
class RendererCollectionBuilder {
    static createDefault(ctx, bounds, fadeRate) {
        return new RendererCollection_1.default([
            new FadeRenderer_1.default(ctx, bounds, fadeRate),
            new ParticleRenderer_1.default(ctx, bounds)
        ]);
    }
}
exports.default = RendererCollectionBuilder;


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map