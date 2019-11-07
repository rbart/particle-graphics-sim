import Particle from '../state/Particle'
import Vector2d from '../state/Vector2d'
import Renderer from './Renderer'
import QuadTreeBuilder  from '../datastructure/QuadTreeBuilder'
import { QuadTreeNode, QuadTreeInnerNode, QuadTreeLeafNode } from '../datastructure/QuadTreeNode'
import QuadTreeVisitor from '../datastructure/QuadTreeVisitor'
import ParticleCollection, { ParticleCollectionFactory } from '../state/ParticleCollection'

export default class QuadTreeRenderer implements Renderer {

  private quadTree: QuadTreeNode<Particle, ParticleCollection>

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly extents: Vector2d)  {
    // TODO: don't create the quadtree at all here. We should reuse a single quadTree
    // throughout
    let minNodeSize = extents.length() / 80
    let quadTreeBuilder = new QuadTreeBuilder<Particle, ParticleCollection>(
      new ParticleCollectionFactory(), minNodeSize)
    this.quadTree = quadTreeBuilder.build(extents)
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
      this.drawRect(node)
      for (let child of node.children) {
        child.accept(this)
      }
    }
  }

  visitLeaf(node: QuadTreeLeafNode<Particle, ParticleCollection>): void {
    if (!node.isEmpty) {
      this.drawRect(node)
    }
  }

  private drawRect(node: QuadTreeNode<Particle, ParticleCollection>): void {
    this.ctx.rect(node.origin.x, node.origin.y, node.extents.x, node.extents.y);
  }
}
