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
const Vector2d_1 = __webpack_require__(/*! ./state/Vector2d */ "./app/state/Vector2d.ts");
const Rectangle_1 = __webpack_require__(/*! ./state/Rectangle */ "./app/state/Rectangle.ts");
const Configurations_1 = __webpack_require__(/*! ./state/Configurations */ "./app/state/Configurations.ts");
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
let bounds = new Rectangle_1.default(new Vector2d_1.default(0, 0), new Vector2d_1.default(c.width, c.height));
let configuration = Configurations_1.default.OrbitalSim3;
let particles = configuration.particleBuilder.generateParticles(bounds);
let renderer = configuration.getRenderer(bounds, ctx);
let advancer = configuration.getAdvancer(bounds);
let frameNumber = 0;
function framesPerSecondLogger() {
    let lastFrameReportTime = Date.now();
    return function () {
        let now = Date.now();
        let seconds = (now - lastFrameReportTime) / 1000;
        let fps = frameNumber / seconds;
        console.log("FPS: " + fps.toFixed(1));
        frameNumber = 0;
        lastFrameReportTime = now;
    };
}
setInterval(framesPerSecondLogger(), 2000);
renderer.initialize();
function drawFrame() {
    frameNumber++;
    advancer.advance(particles);
    requestAnimationFrame(drawFrame);
    renderer.render(particles);
}
requestAnimationFrame(drawFrame);


/***/ }),

/***/ "./app/state/Configurations.ts":
/*!*************************************!*\
  !*** ./app/state/Configurations.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FadeRenderer_1 = __webpack_require__(/*! ../visualization/FadeRenderer */ "./app/visualization/FadeRenderer.ts");
const QuadTreeGravityAdvancer_1 = __webpack_require__(/*! ./mutation/QuadTreeGravityAdvancer */ "./app/state/mutation/QuadTreeGravityAdvancer.ts");
const WallBounceAdvancer_1 = __webpack_require__(/*! ./mutation/WallBounceAdvancer */ "./app/state/mutation/WallBounceAdvancer.ts");
const OscillatingColorGravityVisitor_1 = __webpack_require__(/*! ./mutation/OscillatingColorGravityVisitor */ "./app/state/mutation/OscillatingColorGravityVisitor.ts");
const BasicAdvancer_1 = __webpack_require__(/*! ./mutation/BasicAdvancer */ "./app/state/mutation/BasicAdvancer.ts");
const Vector2d_1 = __webpack_require__(/*! ./Vector2d */ "./app/state/Vector2d.ts");
const FixedGravityAdvancer_1 = __webpack_require__(/*! ./mutation/FixedGravityAdvancer */ "./app/state/mutation/FixedGravityAdvancer.ts");
const ParticleRenderer_1 = __webpack_require__(/*! ../visualization/ParticleRenderer */ "./app/visualization/ParticleRenderer.ts");
const AdvancerCollection_1 = __webpack_require__(/*! ./mutation/AdvancerCollection */ "./app/state/mutation/AdvancerCollection.ts");
const RendererCollection_1 = __webpack_require__(/*! ../visualization/RendererCollection */ "./app/visualization/RendererCollection.ts");
const ParticleBuilder_1 = __webpack_require__(/*! ./ParticleBuilder */ "./app/state/ParticleBuilder.ts");
const ApplyColorGravityVisitor_1 = __webpack_require__(/*! ./mutation/ApplyColorGravityVisitor */ "./app/state/mutation/ApplyColorGravityVisitor.ts");
const QuadTreeRenderer_1 = __webpack_require__(/*! ../visualization/QuadTreeRenderer */ "./app/visualization/QuadTreeRenderer.ts");
const ApplyGravityVisitor_1 = __webpack_require__(/*! ./mutation/ApplyGravityVisitor */ "./app/state/mutation/ApplyGravityVisitor.ts");
const RadialParticleBuilder_1 = __webpack_require__(/*! ./RadialParticleBuilder */ "./app/state/RadialParticleBuilder.ts");
const CyclingAdvancerCollection_1 = __webpack_require__(/*! ./mutation/CyclingAdvancerCollection */ "./app/state/mutation/CyclingAdvancerCollection.ts");
const LiteralParticleBuilder_1 = __webpack_require__(/*! ./LiteralParticleBuilder */ "./app/state/LiteralParticleBuilder.ts");
const FixedCircleRenderer_1 = __webpack_require__(/*! ../visualization/FixedCircleRenderer */ "./app/visualization/FixedCircleRenderer.ts");
let GRAVITY_COEF = 2.0;
class Configuration {
    constructor(particleBuilder, advancers, renderers) {
        this.particleBuilder = particleBuilder;
        this.advancers = advancers;
        this.renderers = renderers;
    }
    getAdvancer(bounds) {
        return new AdvancerCollection_1.default(this.advancers.map(adv => adv.createInstance(bounds)));
    }
    getRenderer(bounds, ctx) {
        return new RendererCollection_1.default(this.renderers.map(rend => rend.createInstance(bounds, ctx)));
    }
}
exports.Configuration = Configuration;
let colorAttract = [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(0.9),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitor_1.ApplyColorGravityVisitorFactory(2 * GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(0.985)
];
let colorRepel = [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(0.9),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitor_1.ApplyColorGravityVisitorFactory(-2 * GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(0.98)
];
let stdAttract = [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(0.9),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyGravityVisitor_1.ApplyGravityVisitorFactory(2 * GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(0.98)
];
let stdRepel = [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(0.9),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyGravityVisitor_1.ApplyGravityVisitorFactory(-2 * GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(0.98)
];
class Configurations {
}
exports.default = Configurations;
// Good config
Configurations.OrbitalSim = new Configuration(new LiteralParticleBuilder_1.CombinedParticuleBuilder([
    new RadialParticleBuilder_1.RadialParticleBuilder(3000, 100, 400, GRAVITY_COEF, 500, 0.5, 1.2),
]), [
    new BasicAdvancer_1.BasicAdvancerFactory(1),
    new FixedGravityAdvancer_1.FixedGravityAdvancerFactory(new Vector2d_1.default(0.5, 0.5), 500, GRAVITY_COEF, 20),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyGravityVisitor_1.ApplyGravityVisitorFactory(GRAVITY_COEF)),
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(.7)
], [
    new FadeRenderer_1.FadeRendererFactory(1),
    new ParticleRenderer_1.ParticleRendererFactory(),
    new FixedCircleRenderer_1.FixedCircleRendererFactory(new Vector2d_1.default(0.5, 0.5), 20)
]);
// fast, exhibits early standing wave effect
Configurations.OrbitalSim3 = new Configuration(new LiteralParticleBuilder_1.CombinedParticuleBuilder([
    new RadialParticleBuilder_1.RadialParticleBuilder(3000, 350, 350, GRAVITY_COEF, 500, 0.05, 1.2),
]), [
    new BasicAdvancer_1.BasicAdvancerFactory(1),
    new FixedGravityAdvancer_1.FixedGravityAdvancerFactory(new Vector2d_1.default(0.5, 0.5), 500, GRAVITY_COEF, 20),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitor_1.ApplyColorGravityVisitorFactory(GRAVITY_COEF)),
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(.7)
], [
    new FadeRenderer_1.FadeRendererFactory(1),
    new ParticleRenderer_1.ParticleRendererFactory(),
    new FixedCircleRenderer_1.FixedCircleRendererFactory(new Vector2d_1.default(0.5, 0.5), 20)
]);
// Slow - takes about 30 seconds to swap.
Configurations.SwappingMoons = new Configuration(new LiteralParticleBuilder_1.CombinedParticuleBuilder([
    new RadialParticleBuilder_1.RadialParticleBuilder(1, 200, 200, GRAVITY_COEF, 1000, 1, 3, 3.14, 3.14),
    new RadialParticleBuilder_1.RadialParticleBuilder(1, 210, 210, GRAVITY_COEF, 1000, 1, 3, 0, 0),
]), [
    new BasicAdvancer_1.BasicAdvancerFactory(1),
    new FixedGravityAdvancer_1.FixedGravityAdvancerFactory(new Vector2d_1.default(0.5, 0.5), 1000, GRAVITY_COEF, 20),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyGravityVisitor_1.ApplyGravityVisitorFactory(GRAVITY_COEF)),
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(.7)
], [
    new FadeRenderer_1.FadeRendererFactory(0.03),
    new ParticleRenderer_1.ParticleRendererFactory(),
    new FixedCircleRenderer_1.FixedCircleRendererFactory(new Vector2d_1.default(0.5, 0.5), 20)
]);
Configurations.OrbitalSim5 = new Configuration(new LiteralParticleBuilder_1.CombinedParticuleBuilder([
    new RadialParticleBuilder_1.RadialParticleBuilder(1, 300, 300, GRAVITY_COEF, 1000, 4, 10, 0, 0),
    new RadialParticleBuilder_1.RadialParticleBuilder(4000, 350, 350, GRAVITY_COEF, 1000, 0, 1) //, Math.PI*0.7, Math.PI*1.4),
]), [
    new BasicAdvancer_1.BasicAdvancerFactory(1),
    new FixedGravityAdvancer_1.FixedGravityAdvancerFactory(new Vector2d_1.default(0.5, 0.5), 1000, GRAVITY_COEF, 20),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyGravityVisitor_1.ApplyGravityVisitorFactory(GRAVITY_COEF)),
], [
    new FadeRenderer_1.FadeRendererFactory(0.3),
    new ParticleRenderer_1.ParticleRendererFactory(),
    new FixedCircleRenderer_1.FixedCircleRendererFactory(new Vector2d_1.default(0.5, 0.5), 20)
]);
Configurations.CyclingConfig = new Configuration(new ParticleBuilder_1.BasicParticleBuilder(3000, 1, 1, 1), [
    new CyclingAdvancerCollection_1.CyclingAdvancerCollectionFactory(6, [
        stdAttract, stdAttract,
        colorAttract, colorAttract, colorAttract, colorAttract,
        stdRepel,
        colorRepel,
    ])
], [
    new FadeRenderer_1.FadeRendererFactory(0.7),
    new QuadTreeRenderer_1.QuadTreeRendererFactory(0.1),
    new ParticleRenderer_1.ParticleRendererFactory()
]);
Configurations.RadialParticleGravityConfig = new Configuration(new RadialParticleBuilder_1.RadialParticleBuilder(2000, 120, 300, GRAVITY_COEF, 400), [
    new BasicAdvancer_1.BasicAdvancerFactory(1.0),
    new FixedGravityAdvancer_1.FixedGravityAdvancerFactory(new Vector2d_1.default(0.5, 0.5), 400, GRAVITY_COEF, 20),
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(1)
], [
    new FadeRenderer_1.FadeRendererFactory(0.7),
    new ParticleRenderer_1.ParticleRendererFactory()
]);
Configurations.SimpleGravityConfig = new Configuration(new ParticleBuilder_1.BasicParticleBuilder(2000, 1, 1.25, 1.25), [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(0.9),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyGravityVisitor_1.ApplyGravityVisitorFactory(GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(0.99),
], [
    new FadeRenderer_1.FadeRendererFactory(0.7),
    new ParticleRenderer_1.ParticleRendererFactory()
]);
Configurations.ColorGravityConfig = new Configuration(new ParticleBuilder_1.BasicParticleBuilder(2000, 1, 1.25, 1.25), [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(0.5),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitor_1.ApplyColorGravityVisitorFactory(GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(1.0)
], [
    new FadeRenderer_1.FadeRendererFactory(0.7),
    new ParticleRenderer_1.ParticleRendererFactory()
]);
Configurations.OscillatingColorGravityConfig = new Configuration(new ParticleBuilder_1.BasicParticleBuilder(2000, 1, 1.25, 1.25), [
    new WallBounceAdvancer_1.WallBounceAdvancerFactory(1.0),
    new QuadTreeGravityAdvancer_1.QuadTreeGravityAdvancerFactory(new OscillatingColorGravityVisitor_1.OscillatingColorGravityVisitorFactory(GRAVITY_COEF)),
    new BasicAdvancer_1.BasicAdvancerFactory(1.0)
], [
    new FadeRenderer_1.FadeRendererFactory(0.7),
    new ParticleRenderer_1.ParticleRendererFactory()
]);


/***/ }),

/***/ "./app/state/LiteralParticleBuilder.ts":
/*!*********************************************!*\
  !*** ./app/state/LiteralParticleBuilder.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Particle_1 = __webpack_require__(/*! ./Particle */ "./app/state/Particle.ts");
class LiteralParticleBuilder {
    constructor(protoParticles) {
        this.protoParticles = protoParticles;
    }
    generateParticles(bounds) {
        let particles = [];
        for (let proto of this.protoParticles) {
            let pos = proto.pos.multiplyVector(bounds.extents).add(bounds.origin);
            let spd = proto.spd.multiplyVector(bounds.extents).add(bounds.origin);
            let particle = new Particle_1.default(pos, spd, proto.mass, proto.rad, proto.hue);
            particles.push(particle);
        }
        return particles;
    }
}
exports.LiteralParticleBuilder = LiteralParticleBuilder;
class CombinedParticuleBuilder {
    constructor(builders) {
        this.builders = builders;
    }
    generateParticles(bounds) {
        let particles = [];
        for (let builder of this.builders) {
            particles = particles.concat(builder.generateParticles(bounds));
        }
        return particles;
    }
}
exports.CombinedParticuleBuilder = CombinedParticuleBuilder;


/***/ }),

/***/ "./app/state/Particle.ts":
/*!*******************************!*\
  !*** ./app/state/Particle.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ./Vector2d */ "./app/state/Vector2d.ts");
class Particle {
    constructor(pos, spd, mass, rad, hue) {
        this.pos = pos;
        this.spd = spd;
        this.mass = mass;
        this.rad = rad;
        this.hue = hue;
        this.hslColorString_memo = null;
        this.colorSizeCacheKey_memo = null;
        this.lastPos = new Vector2d_1.default(pos.x, pos.y);
    }
    hslColorString() {
        if (this.hslColorString_memo == null) {
            let colorAngle = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI);
            this.hslColorString_memo = `hsl(${colorAngle | 0},100%,50%)`;
        }
        return this.hslColorString_memo;
    }
    colorSizeCacheKey() {
        if (this.colorSizeCacheKey_memo == null) {
            let colorAngle = Math.atan2(this.hue.y, this.hue.x) * (180 / Math.PI);
            this.colorSizeCacheKey_memo = `${(this.rad + 0.5) * 2 | 0}_${colorAngle / 5 | 0}`;
        }
        return this.colorSizeCacheKey_memo;
    }
    position() {
        return this.pos;
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
class BasicParticleBuilder {
    constructor(numParticles, maxSpeed, minMass, maxMass) {
        this.numParticles = numParticles;
        this.maxSpeed = maxSpeed;
        this.minMass = minMass;
        this.maxMass = maxMass;
    }
    generateParticles(bounds) {
        let particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            particles.push(this.generateParticle(bounds));
        }
        return particles;
    }
    generateParticle(bounds) {
        let mass = Math.floor(Math.random() * (this.maxMass - this.minMass)) + this.minMass;
        let radius = Math.max(Math.sqrt(mass), 1);
        let randomPosition = bounds.origin.add(new Vector2d_1.default(Math.floor(Math.random() * bounds.extents.x - radius) + radius, Math.floor(Math.random() * bounds.extents.y - radius) + radius));
        let randomSpeed = new Vector2d_1.default(Math.random() * this.maxSpeed * 2 - this.maxSpeed, Math.random() * this.maxSpeed * 2 - this.maxSpeed);
        return new Particle_1.default(randomPosition, randomSpeed, mass, radius, this.getRndHue());
    }
    getRndHue() {
        let hueAngle = 360 * Math.random();
        let hueX = Math.cos(hueAngle);
        let hueY = Math.sin(hueAngle);
        return new Vector2d_1.default(hueX, hueY);
    }
}
exports.BasicParticleBuilder = BasicParticleBuilder;


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
ParticleCollectionFactory.defaultBufferWidthConstant = (1 / 7);
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

/***/ "./app/state/RadialParticleBuilder.ts":
/*!********************************************!*\
  !*** ./app/state/RadialParticleBuilder.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ./Vector2d */ "./app/state/Vector2d.ts");
const Particle_1 = __webpack_require__(/*! ./Particle */ "./app/state/Particle.ts");
class RadialParticleBuilder {
    constructor(numParticles, minRadius, maxRadius, g, mass, particleMass = 0, particleRadius = 1, startRad = 0, endRad = Math.PI * 2) {
        this.numParticles = numParticles;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        this.g = g;
        this.mass = mass;
        this.particleMass = particleMass;
        this.particleRadius = particleRadius;
        this.startRad = startRad;
        this.endRad = endRad;
    }
    generateParticles(bounds) {
        let particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            particles.push(this.generateParticle(bounds));
        }
        return particles;
    }
    generateParticle(bounds) {
        let mass = this.particleMass;
        let radius = this.particleRadius;
        let randomAngle = this.startRad + (Math.random() * (this.endRad - this.startRad));
        let randomVector = new Vector2d_1.default(Math.cos(randomAngle), Math.sin(randomAngle));
        let randomRadius = (Math.random() * (this.maxRadius - this.minRadius)) + this.minRadius;
        let boundsCenter = bounds.origin.add(bounds.extents.multiply(0.5));
        let randomPosition = randomVector
            .multiply(randomRadius)
            .add(boundsCenter);
        // let denom = randomRadius
        // let speed = 10*Math.sqrt((this.g * this.mass) / denom)// https://en.wikipedia.org/wiki/Circular_orbit#Velocity
        //let speedAngle = randomAngle + (Math.PI/2)
        //let speedUnitVector = new Vector2d(Math.cos(speedAngle), Math.sin(speedAngle))
        let speed = Math.sqrt((this.g * this.mass) / randomRadius);
        let speedVector = new Vector2d_1.default(-randomVector.y, randomVector.x).multiply(speed);
        return new Particle_1.default(randomPosition, speedVector, mass, radius, this.getRndHue(randomAngle));
    }
    getRndHue(angle) {
        //let hueAngle = 1//Math.PI * 2 * Math.random()
        let hueX = Math.cos(angle);
        let hueY = Math.sin(angle);
        return new Vector2d_1.default(hueX, hueY);
    }
}
exports.RadialParticleBuilder = RadialParticleBuilder;


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
    multiplyVector(other) {
        return new Vector2d(this.x * other.x, this.y * other.y);
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
class AdvancerCollection {
    constructor(advancers) {
        this.advancers = advancers;
    }
    advance(particles) {
        this.advancers.forEach(advancer => advancer.advance(particles));
    }
}
exports.default = AdvancerCollection;


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
    constructor(particle, gravityCoef) {
        super(particle, gravityCoef);
        this.particle = particle;
        this.gravityCoef = gravityCoef;
    }
    applyGravityFrom(other) {
        let gravityVector = this.particle.pos.subtract(other.pos);
        let length = gravityVector.length();
        let colorCosine = this.particle.hue.cosineSimilarity(other.hue);
        let radSum = this.particle.rad + other.rad;
        if (length < radSum)
            return;
        let gravityStrength = (colorCosine * other.mass * this.gravityCoef) / (gravityVector.lengthSquared());
        gravityStrength = Math.min(10, gravityStrength);
        gravityVector.multiplyMutate(gravityStrength / length);
        this.particle.spd.subtractMutate(gravityVector);
    }
}
exports.default = ApplyColorGravityVisitor;
class ApplyColorGravityVisitorFactory {
    constructor(gravityCoef) {
        this.gravityCoef = gravityCoef;
    }
    createInstance(particle) {
        return new ApplyColorGravityVisitor(particle, this.gravityCoef);
    }
}
exports.ApplyColorGravityVisitorFactory = ApplyColorGravityVisitorFactory;


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
            this.applyGravityFrom(other);
        }
    }
    applyGravityFrom(other) {
        let gravityVector = this.particle.pos.subtract(other.pos);
        let length = gravityVector.length();
        let radSum = this.particle.rad + other.rad;
        let gravityStrength = (other.mass * this.gravityCoef) / (gravityVector.lengthSquared());
        if (length < radSum) {
            // pseudo https://en.wikipedia.org/wiki/Shell_theorem
            let ratio = length / radSum;
            gravityStrength *= (ratio * ratio);
        }
        gravityStrength = Math.min(20, gravityStrength);
        gravityVector.multiplyMutate(gravityStrength / length);
        this.particle.spd.subtractMutate(gravityVector);
    }
}
exports.default = ApplyGravityVisitor;
class ApplyGravityVisitorFactory {
    constructor(gravityCoef) {
        this.gravityCoef = gravityCoef;
    }
    createInstance(particle) {
        return new ApplyGravityVisitor(particle, this.gravityCoef);
    }
}
exports.ApplyGravityVisitorFactory = ApplyGravityVisitorFactory;


/***/ }),

/***/ "./app/state/mutation/BasicAdvancer.ts":
/*!*********************************************!*\
  !*** ./app/state/mutation/BasicAdvancer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BasicAdvancerFactory {
    constructor(dragCoef) {
        this.dragCoef = dragCoef;
    }
    createInstance(_) {
        return new BasicAdvancer(this.dragCoef);
    }
}
exports.BasicAdvancerFactory = BasicAdvancerFactory;
class BasicAdvancer {
    constructor(dragCoef) {
        this.dragCoef = dragCoef;
    }
    advance(particles) {
        for (let particle of particles) {
            particle.spd.multiplyMutate(this.dragCoef);
            particle.pos.addMutate(particle.spd);
        }
    }
}
exports.default = BasicAdvancer;


/***/ }),

/***/ "./app/state/mutation/CyclingAdvancerCollection.ts":
/*!*********************************************************!*\
  !*** ./app/state/mutation/CyclingAdvancerCollection.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CyclingAdvancerCollectionFactory {
    constructor(cycleSeconds, advancerFactories) {
        this.cycleSeconds = cycleSeconds;
        this.advancerFactories = advancerFactories;
    }
    createInstance(bounds) {
        let advancers = this.advancerFactories.map(a => a.map(aa => aa.createInstance(bounds)));
        return new CyclingAdvancerCollection(this.cycleSeconds, advancers);
    }
}
exports.CyclingAdvancerCollectionFactory = CyclingAdvancerCollectionFactory;
class CyclingAdvancerCollection {
    constructor(cycleSeconds, advancers) {
        this.cycleSeconds = cycleSeconds;
        this.advancers = advancers;
        this.startTime = Date.now();
    }
    advance(particles) {
        let currentTime = Date.now();
        let elapsedMs = currentTime - this.startTime;
        let elapsedSeconds = elapsedMs / 1000.0;
        let elapsedCycles = elapsedSeconds / this.cycleSeconds;
        let cycleNumber = (elapsedCycles | 0) % this.advancers.length;
        this.advancers[cycleNumber].forEach(adv => adv.advance(particles));
    }
}
exports.default = CyclingAdvancerCollection;


/***/ }),

/***/ "./app/state/mutation/FixedGravityAdvancer.ts":
/*!****************************************************!*\
  !*** ./app/state/mutation/FixedGravityAdvancer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ../Vector2d */ "./app/state/Vector2d.ts");
class FixedGravityAdvancerFactory {
    constructor(point, mass, gravityCoef, radius) {
        this.point = point;
        this.mass = mass;
        this.gravityCoef = gravityCoef;
        this.radius = radius;
    }
    createInstance(bounds) {
        return new FixedGravityAdvancer(bounds, this.point, this.mass, this.gravityCoef, this.radius);
    }
}
exports.FixedGravityAdvancerFactory = FixedGravityAdvancerFactory;
class FixedGravityAdvancer {
    constructor(bounds, point, mass, gravityCoef, radius) {
        this.mass = mass;
        this.gravityCoef = gravityCoef;
        this.radius = radius;
        let scaledPoint = new Vector2d_1.default(bounds.extents.x * point.x, bounds.extents.y * point.y);
        this.point = bounds.origin.add(scaledPoint);
        this.effectiveRadius = Math.sqrt(Math.abs(mass));
    }
    advance(particles) {
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i];
            let gravityVector = p1.pos.subtract(this.point);
            let length = gravityVector.length();
            if (length < this.radius) {
                particles.splice(i, 1);
                i--;
                continue;
            }
            let gravityStrength = (this.mass * this.gravityCoef) / gravityVector.lengthSquared();
            gravityStrength = Math.min(20, gravityStrength);
            gravityVector.multiplyMutate(gravityStrength / length);
            p1.spd.subtractMutate(gravityVector);
        }
    }
}
exports.default = FixedGravityAdvancer;


/***/ }),

/***/ "./app/state/mutation/OscillatingColorGravityVisitor.ts":
/*!**************************************************************!*\
  !*** ./app/state/mutation/OscillatingColorGravityVisitor.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ApplyColorGravityVisitor_1 = __webpack_require__(/*! ./ApplyColorGravityVisitor */ "./app/state/mutation/ApplyColorGravityVisitor.ts");
class OscillatingColorGravityVisitor extends ApplyColorGravityVisitor_1.default {
    constructor(particle, gravityCoef) {
        super(particle, gravityCoef);
        this.particle = particle;
        this.gravityCoef = gravityCoef;
        // TODO make these constants configurable, get time externally somehow.
        let frameNumber = Date.now() / 30;
        this.colorFactorCosine = Math.cos(frameNumber / 302);
        this.gravityPushPullCosine = Math.cos(frameNumber / 517);
        this.gravityPushPullCosine = -0.2 / (1.1 + this.gravityPushPullCosine) + 1;
    }
    applyGravityFrom(other) {
        let gravityVector = this.particle.pos.subtract(other.pos);
        let colorCosine = this.particle.hue.cosineSimilarity(other.hue);
        colorCosine = (this.colorFactorCosine + (1 - this.colorFactorCosine) * colorCosine);
        colorCosine *= this.gravityPushPullCosine;
        let radSum = this.particle.rad + other.rad;
        let gravityStrength = (colorCosine * other.mass * this.gravityCoef) / (gravityVector.lengthSquared() + radSum);
        gravityStrength = Math.min(10, gravityStrength);
        gravityVector.multiplyMutate(gravityStrength / gravityVector.length());
        this.particle.spd.subtractMutate(gravityVector);
    }
}
exports.default = OscillatingColorGravityVisitor;
class OscillatingColorGravityVisitorFactory {
    constructor(gravityCoef) {
        this.gravityCoef = gravityCoef;
    }
    createInstance(particle) {
        return new OscillatingColorGravityVisitor(particle, this.gravityCoef);
    }
}
exports.OscillatingColorGravityVisitorFactory = OscillatingColorGravityVisitorFactory;


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
            aggregate.rad = particle.rad;
        }
        else {
            let totalMass = 0;
            let totalRad = 0;
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
            aggregate.rad = Math.sqrt(totalMass);
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
class QuadTreeGravityAdvancer {
    constructor(bounds, gravityVisitorFactory, minNodeSizeFactor) {
        this.bounds = bounds;
        this.gravityVisitorFactory = gravityVisitorFactory;
        let minNodeSize = bounds.extents.length() * minNodeSizeFactor;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(new ParticleCollection_1.ParticleCollectionFactory(), minNodeSize);
        this.quadTree = quadTreeBuilder.build(bounds);
        this.particleAggregator = new ParticleAggregationVisitor_1.default();
    }
    advance(particles) {
        this.quadTree.clear();
        for (let particle of particles) {
            if (particle.mass == 0)
                continue;
            this.quadTree.add(particle);
        }
        this.quadTree.accept(this.particleAggregator);
        for (let particle of particles) {
            let gravityVisitor = this.gravityVisitorFactory.createInstance(particle);
            this.quadTree.accept(gravityVisitor);
        }
    }
}
exports.default = QuadTreeGravityAdvancer;
class QuadTreeGravityAdvancerFactory {
    constructor(gravityVisitorFactory, minNodeSizeFactor = QuadTreeGravityAdvancerFactory.defaultMinNodeSizeFactor) {
        this.gravityVisitorFactory = gravityVisitorFactory;
        this.minNodeSizeFactor = minNodeSizeFactor;
    }
    createInstance(bounds) {
        return new QuadTreeGravityAdvancer(bounds, this.gravityVisitorFactory, this.minNodeSizeFactor);
    }
}
exports.QuadTreeGravityAdvancerFactory = QuadTreeGravityAdvancerFactory;
QuadTreeGravityAdvancerFactory.defaultMinNodeSizeFactor = (1 / 200);


/***/ }),

/***/ "./app/state/mutation/WallBounceAdvancer.ts":
/*!**************************************************!*\
  !*** ./app/state/mutation/WallBounceAdvancer.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WallBounceAdvancerFactory {
    constructor(bounceCoef) {
        this.bounceCoef = bounceCoef;
    }
    createInstance(bounds) {
        return new WallBounceAdvancer(bounds, this.bounceCoef);
    }
}
exports.WallBounceAdvancerFactory = WallBounceAdvancerFactory;
class WallBounceAdvancer {
    constructor(bounds, bounceCoef) {
        this.bounds = bounds;
        this.bounceCoef = bounceCoef;
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
class FadeRendererFactory {
    constructor(fadeRate) {
        this.fadeRate = fadeRate;
    }
    createInstance(bounds, ctx) {
        return new FadeRenderer(ctx, bounds, this.fadeRate);
    }
}
exports.FadeRendererFactory = FadeRendererFactory;
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

/***/ "./app/visualization/FixedCircleRenderer.ts":
/*!**************************************************!*\
  !*** ./app/visualization/FixedCircleRenderer.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(/*! ../state/Vector2d */ "./app/state/Vector2d.ts");
class FixedCircleRendererFactory {
    constructor(point, radius) {
        this.point = point;
        this.radius = radius;
    }
    createInstance(bounds, ctx) {
        return new FixedCircleRenderer(ctx, this.point, this.radius, bounds);
    }
}
exports.FixedCircleRendererFactory = FixedCircleRendererFactory;
class FixedCircleRenderer {
    constructor(ctx, point, radius, bounds) {
        this.ctx = ctx;
        this.radius = radius;
        this.bounds = bounds;
        let scaledPoint = new Vector2d_1.default(bounds.extents.x * point.x, bounds.extents.y * point.y);
        this.point = bounds.origin.add(scaledPoint);
        this.gradient = ctx.createRadialGradient(this.point.x, this.point.y, 0, //this.radius / 2,
        this.point.x, this.point.y, this.radius);
        this.gradient.addColorStop(0, 'black');
        this.gradient.addColorStop(0.25, 'rgb(200,200,200)');
        this.gradient.addColorStop(1, 'transparent'); //grd.addColorStop(1,'transparent');
    }
    initialize() { }
    render(_) {
        this.ctx.beginPath();
        this.ctx.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.gradient;
        this.ctx.fill();
    }
}
exports.default = FixedCircleRenderer;


/***/ }),

/***/ "./app/visualization/ParticleRenderer.ts":
/*!***********************************************!*\
  !*** ./app/visualization/ParticleRenderer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ParticleRendererFactory {
    createInstance(_, ctx) {
        return new ParticleRenderer(ctx);
    }
}
exports.ParticleRendererFactory = ParticleRendererFactory;
class ParticleRenderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.circleCanvasCache = new Map();
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
            if (particle.rad > 1.5) {
                let circleCanvas = this.getOrCreateCircleCanvas(particle);
                let radPlus1 = particle.rad + 1;
                this.ctx.drawImage(circleCanvas, particle.pos.x - radPlus1, particle.pos.y - radPlus1);
                if (particle.spd.lengthSquared() > 1) {
                    this.ctx.drawImage(circleCanvas, particle.lastPos.x - radPlus1, particle.lastPos.y - radPlus1);
                }
            }
            particle.lastPos.setEqualTo(particle.pos);
        }
    }
    getOrCreateCircleCanvas(particle) {
        if (!this.circleCanvasCache.has(particle.colorSizeCacheKey())) {
            let canvas = this.initializeCircleCanvas(particle);
            this.circleCanvasCache.set(particle.colorSizeCacheKey(), canvas);
        }
        return this.circleCanvasCache.get(particle.colorSizeCacheKey());
    }
    initializeCircleCanvas(particle) {
        let canvas = new OffscreenCanvas(particle.rad * 2 + 2, particle.rad * 2 + 2);
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(particle.rad + 1, particle.rad + 1, particle.rad, 0, Math.PI * 2);
        ctx.fillStyle = particle.hslColorString();
        ctx.fill();
        return canvas;
    }
    drawPathLine(particle) {
        this.ctx.moveTo(particle.pos.x, particle.pos.y);
        let spdVect = particle.spd;
        let lengthSquared = spdVect.lengthSquared();
        if (particle.rad < 1.5 && lengthSquared < 6) {
            let shortage = 6 / lengthSquared;
            spdVect = spdVect.multiply(Math.sqrt(shortage));
        }
        let lastPos = particle.pos.subtract(spdVect);
        this.ctx.lineTo(lastPos.x, lastPos.y);
    }
}
exports.default = ParticleRenderer;


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
const ParticleCollection_1 = __webpack_require__(/*! ../state/ParticleCollection */ "./app/state/ParticleCollection.ts");
class QuadTreeRendererFactory {
    constructor(opacity) {
        this.opacity = opacity;
    }
    createInstance(bounds, ctx) {
        return new QuadTreeRenderer(bounds, ctx, this.opacity);
    }
}
exports.QuadTreeRendererFactory = QuadTreeRendererFactory;
class QuadTreeRenderer {
    constructor(bounds, ctx, opacity) {
        this.bounds = bounds;
        this.ctx = ctx;
        this.opacity = opacity;
        // TODO: don't create the quadtree at all here. We should reuse a single quadTree
        // throughout
        let minNodeSize = bounds.extents.length() / 80;
        let quadTreeBuilder = new QuadTreeBuilder_1.default(new ParticleCollection_1.ParticleCollectionFactory(), minNodeSize);
        this.quadTree = quadTreeBuilder.build(bounds);
    }
    initialize() { }
    render(particles) {
        this.quadTree.clear();
        for (let particle of particles) {
            this.quadTree.add(particle);
        }
        let initialAlpha = this.ctx.globalAlpha;
        this.ctx.lineWidth = 0.5;
        this.ctx.globalAlpha = this.opacity;
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
            this.drawRect(node.bounds);
            for (let child of node.children) {
                child.accept(this);
            }
        }
    }
    visitLeaf(node) {
        if (!node.isEmpty) {
            this.drawRect(node.bounds);
        }
    }
    drawRect(rectangle) {
        this.ctx.rect(rectangle.origin.x, rectangle.origin.y, rectangle.extents.x, rectangle.extents.y);
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


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map