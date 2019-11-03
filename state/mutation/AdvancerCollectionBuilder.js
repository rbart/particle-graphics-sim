"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicAdvancer_1 = require("./BasicAdvancer");
const WallBounceAdvancer_1 = require("./WallBounceAdvancer");
const Vector2d_1 = require("../Vector2d");
const QuadTreeGravityAdvancer_1 = require("./QuadTreeGravityAdvancer");
const AdvancerCollection_1 = require("./AdvancerCollection");
class AdvancerCollectionBuilder {
    static createDefault(width, height) {
        let advancers = [
            new WallBounceAdvancer_1.default(0.8, width, height),
            new QuadTreeGravityAdvancer_1.default(0.08, new Vector2d_1.default(width, height)),
            //new GravityAdvancer(0.08),
            new BasicAdvancer_1.default()
        ];
        return new AdvancerCollection_1.default(advancers);
    }
}
exports.default = AdvancerCollectionBuilder;
//# sourceMappingURL=AdvancerCollectionBuilder.js.map