import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'
import Renderer from './Renderer'
import QuadTreeBuilder  from '../datastructure/QuadTreeBuilder'
import { QuadTreeNode, QuadTreeInnerNode, QuadTreeLeafNode } from '../datastructure/QuadTreeNode'
import QuadTreeVisitor from '../state/mutation/QuadTreeVisitor'

export default class QuadTreeRenderer implements Renderer {

  private quadTree: QuadTreeNode<Particle>

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly extents: Vector2d)  {
    // TODO: don't create the quadtree at all here. We should reuse a single quadTree
    // throughout
    let minNodeSize = extents.length() / 40
    let quadTreeBuilder = new QuadTreeBuilder<Particle>(minNodeSize)
    this.quadTree = quadTreeBuilder.build(extents)
  }


  initialize() { }

  render(particles: Particle[]) {

    this.quadTree.clear()

    for (let particle of particles) {
      this.quadTree.add(particle)
    }

    this.ctx.lineWidth = 0.5
    this.ctx.strokeStyle = "rgb(30,30,30)";
    this.ctx.beginPath();

    let renderingVisitor = new RenderingVisitor(this.ctx)

    this.quadTree.accept(renderingVisitor)

    this.ctx.stroke();
  }
}

class RenderingVisitor implements QuadTreeVisitor<Particle> {

  constructor(readonly ctx: CanvasRenderingContext2D) {}

  visit(node: QuadTreeInnerNode<Particle>): void {
    if (!node.isEmpty) {
      this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
      for (let child of node.children()) {
        child.accept(this)
      }
    }
  }

  visitLeaf(node: QuadTreeLeafNode<Particle>): void {
    if (!node.isEmpty) {
      this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
    }
  }
}
