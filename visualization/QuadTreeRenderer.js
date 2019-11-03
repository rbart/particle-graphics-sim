"use strict";
// import Particle from '../state/Particle'
// import Vector2d from '../state/Vector2d'
// import Renderer from './Renderer'
// import QuadTreeNode from '../datastructure/QuadTreeNode'
//
// export default class QuadTreeRenderer implements Renderer {
//   constructor(
//     readonly ctx: CanvasRenderingContext2D,
//     readonly width: number,
//     readonly height: number) { }
//
//   initialize() {
//     this.ctx.globalAlpha = 1;
//     this.ctx.fillStyle = "rgb(3,3,3)";
//     this.ctx.fillRect(0,0,this.width,this.height);
//   }
//
//   render(particles: Particle[]) {
//
//     let particleQuadTree = new QuadTreeNode<Particle>(new Vector2d(0,0), new Vector2d(this.width,this.height))
//
//     for (let particle of particles) {
//       particleQuadTree.add(particle)
//     }
//
//     this.ctx.lineWidth = 1
//     this.ctx.strokeStyle = "rgb(30,30,30)";
//     this.ctx.beginPath();
//     for (let node of particleQuadTree.allLeafNodes()) {
//       this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
//     }
//     this.ctx.stroke();
//   }
// }
//# sourceMappingURL=QuadTreeRenderer.js.map