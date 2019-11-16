import Particle from '../state/Particle'
import Renderer, { RendererFactory } from './Renderer'
import QuadTreeBuilder  from '../datastructure/QuadTreeBuilder'
import { QuadTreeNode, QuadTreeInnerNode, QuadTreeLeafNode } from '../datastructure/QuadTreeNode'
import QuadTreeVisitor from '../datastructure/QuadTreeVisitor'
import ParticleCollection, { ParticleCollectionFactory } from '../state/ParticleCollection'
import Rectangle from '../state/Rectangle'

export class QuadTreeRendererFactory implements RendererFactory {
  createInstance(bounds: Rectangle, ctx: CanvasRenderingContext2D): Renderer {
    return new QuadTreeRenderer(bounds, ctx)
  }
}

export default class QuadTreeRenderer implements Renderer {

  private quadTree: QuadTreeNode<Particle, ParticleCollection>

  constructor(
    readonly bounds: Rectangle,
    readonly ctx: CanvasRenderingContext2D)  {
    // TODO: don't create the quadtree at all here. We should reuse a single quadTree
    // throughout
    let minNodeSize = bounds.extents.length() / 80
    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleCollection>(
      new ParticleCollectionFactory(), minNodeSize)
    this.quadTree = quadTreeBuilder.build(bounds)
  }

  initialize() { }

  render(particles: Particle[]) {

    this.quadTree.clear()

    for (let particle of particles) {
      this.quadTree.add(particle)
    }

    let initialAlpha = this.ctx.globalAlpha;
    this.ctx.lineWidth = 0.5
    this.ctx.globalAlpha = 0.2
    this.ctx.strokeStyle = "rgb(100,100,100)";
    this.ctx.beginPath();

    let renderingVisitor = new RenderingVisitor(this.ctx)

    this.quadTree.accept(renderingVisitor)

    this.ctx.stroke();
    this.ctx.globalAlpha = initialAlpha
  }
}

class RenderingVisitor implements QuadTreeVisitor<Particle, ParticleCollection> {

  constructor(readonly ctx: CanvasRenderingContext2D) {}

  visit(node: QuadTreeInnerNode<Particle, ParticleCollection>): void {
    if (!node.isEmpty) {
      this.drawRect(node.bounds)
      for (let child of node.children) {
        child.accept(this)
      }
    }
  }

  visitLeaf(node: QuadTreeLeafNode<Particle, ParticleCollection>): void {
    if (!node.isEmpty) {
      this.drawRect(node.bounds)
    }
  }

  private drawRect(rectangle: Rectangle): void {
    this.ctx.rect(rectangle.origin.x, rectangle.origin.y, rectangle.extents.x, rectangle.extents.y);
  }
}
