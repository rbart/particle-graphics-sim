import { QuadTreeInnerNode, QuadTreeLeafNode, QuadTreeNode } from "../../datastructure/QuadTreeNode"
import Particle from "../Particle"
import QuadTreeVisitor from "./QuadTreeVisitor"
import ParticleCollection from "../ParticleCollection"

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
    //if (particles.length == 1) return particles[0]
    let totalMass = 0
    let sumX = 0
    let sumY = 0
    for (let particle of particles) {
      totalMass += particle.mass
      sumX += particle.pos.x * particle.mass
      sumY += particle.pos.y * particle.mass
    }
    let avgX = totalMass == 0 ? 0 : sumX / totalMass
    let avgY = totalMass == 0 ? 0 : sumY / totalMass

    let aggregate = node.collection.aggregate
    aggregate.pos.x = avgX
    aggregate.pos.y = avgY
    aggregate.mass = totalMass
  }
}
