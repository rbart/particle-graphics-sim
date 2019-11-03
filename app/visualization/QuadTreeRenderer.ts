// import Particle from '../state/Particle'
// import Vector2d from '../state/Vector2d'
// import Renderer from './Renderer'
// import QuadTreeNode from '../datastructure/QuadTreeNode'
// import { QuadTree, Aggregate, Aggregator } from '../datastructure/QuadTreeBuilder'
// import QuadTreeBuilder  from '../datastructure/QuadTreeBuilder'
//
// class NullAggregator implements Aggregator<Particle, NullAggregate> {
//   private nullParticle = new Particle(new Vector2d(0,0), new Vector2d)
//   aggregate(elements: Particle[]): Particle { return NullAggregate.instance }
// }
//
// export default class QuadTreeRenderer implements Renderer {
//
//   private quadTree: QuadTree<Particle, NullAggregator>
//
//   constructor(
//     readonly ctx: CanvasRenderingContext2D,
//     readonly extents: Vector2d)  {
//     // TODO: don't create the quadtree at all here. We should reuse a single quadTree
//     // throughout
//     let minNodeSize = extents.length() / 40
//     let quadTreeBuilder = new QuadTreeBuilder<Particle, NullAggregate, NullAggregator>(
//       new NullAggregator(), minNodeSize)
//     this.quadTree = quadTreeBuilder.build(extents)
//   }
//
//
//   initialize() { }
//
//   render(particles: Particle[]) {
//
//     this.quadTree.clear()
//
//     for (let particle of particles) {
//       this.quadTree.add(particle)
//     }
//
//     this.ctx.lineWidth = 0.5
//     this.ctx.strokeStyle = "rgb(30,30,30)";
//     this.ctx.beginPath();
//     this.renderRecursive(this.quadTree.root)
//     this.ctx.stroke();
//   }
//
//   private renderRecursive(node: QuadTreeNode<Particle, NullAggregate>) {
//     this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
//     if (!node.isEmpty) {
//       for (let child of node.children()) {
//         this.renderRecursive(child)
//       }
//     }
//   }
// }
