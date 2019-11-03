"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasRenderer_1 = require("./CanvasRenderer");
class RendererBuilder {
    static createDefault(ctx, width, height, fadeRate) {
        return new CanvasRenderer_1.default(ctx, width, height, fadeRate);
    }
}
exports.default = RendererBuilder;
//# sourceMappingURL=RendererBuilder.js.map