import { QuadTreeInnerNode, QuadTreeLeafNode } from "../../datastructure/QuadTreeNode"
import Particle from "../Particle"
import Vector2d from "../Vector2d"
import Vector3d from "../Vector3d"
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
    node.collection.aggregate = this.aggregate(childAggregates)
  }

  visitLeaf(node: QuadTreeLeafNode<Particle, ParticleCollection>): void {
    if (node.isEmpty) return
    node.collection.aggregate = this.aggregate(node.elements)
  }

  private aggregate(particles: Particle[]): Particle {
    if (particles.length == 1) return particles[0]
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
    // TODO aggregate all the fields properly
    return new Particle(new Vector2d(avgX, avgY), new Vector2d(0, 0), totalMass, totalMass, new Vector3d(0, 0, 0))
  }
}
