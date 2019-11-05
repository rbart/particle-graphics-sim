"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasRenderer_1 = require("./CanvasRenderer");
class RendererBuilder {
    static createDefault(ctx, width, height, fadeRate) {
        let canvasRenderer = new CanvasRenderer_1.default(ctx, width, height, fadeRate);
        //let quadTreeRenderer = new QuadTreeRenderer(ctx, new Vector2d(width, height))
        let renderer = {
            initialize() {
                canvasRenderer.initialize();
                //quadTreeRenderer.initialize()
            },
            render(elements) {
                canvasRenderer.render(elements);
                //quadTreeRenderer.render(elements)
            }
        };
        return renderer;
    }
}
exports.default = RendererBuilder;
//# sourceMappingURL=RendererBuilder.js.map