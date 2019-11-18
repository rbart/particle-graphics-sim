import { QuadTreeInnerNode, QuadTreeLeafNode, QuadTreeNode } from "../../datastructure/QuadTreeNode"
import Particle from "../Particle"
import QuadTreeVisitor from "../../datastructure/QuadTreeVisitor"
import ParticleCollection from "../ParticleCollection"
import Vector2d from "../Vector2d"

export default class ParticleAggregationVisitor implements QuadTreeVisitor<Particle, ParticleCollection> {

  visit(node: QuadTreeInnerNode<Particle, ParticleCollection>): void {
    if (node.isEmpty) {
      return
    }
    let childAggregates: Particle[] = []
    for (let child of node.children) {
      if (!child.isEmpty) {
        child.accept(this)
        childAggregates.push(child.collection.aggregate)
      }
    }
    this.aggregate(childAggregates, node)
  }

  visitLeaf(node: QuadTreeLeafNode<Particle, ParticleCollection>): void {
    if (node.isEmpty) return
    this.aggregate(node.elements, node)
  }

  private aggregate(particles: Particle[], node: QuadTreeNode<Particle, ParticleCollection>): void {
    let aggregate = node.collection.aggregate
    if (particles.length == 1) {
      let particle = particles[0]
      aggregate.pos.setEqualTo(particle.pos)
      aggregate.hue.setEqualTo(particle.hue)
      aggregate.mass = particle.mass
      aggregate.rad = particle.rad
    }
    else {
      let totalMass = 0
      let totalRad = 0
      let avgPos = new Vector2d(0,0)
      let avgHue = new Vector2d(0,0)
      for (let particle of particles) {
        totalMass += particle.mass
        avgPos.addMutate(particle.pos.multiply(particle.mass))
        avgHue.addMutate(particle.hue.multiply(particle.mass))
      }
      avgPos.divideMutate(totalMass)
      avgHue.divideMutate(avgHue.length())
      aggregate.pos.setEqualTo(avgPos)
      aggregate.hue.setEqualTo(avgHue)
      aggregate.mass = totalMass
      aggregate.rad = Math.sqrt(totalMass)
    }
  }
}
