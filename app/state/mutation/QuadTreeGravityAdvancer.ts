import Advancer from './Advancer'
import Particle from '../Particle'
import QuadTree from '../../datastructure/QuadTree'
import Vector2d from '../Vector2d'

export default class QuadTreeGravityAdvancer implements Advancer {

  constructor(readonly gravityCoef: number, readonly extents: Vector2d) { }

  advance(particles: Particle[]): void {

    let particleQuadTree = new QuadTree<Particle>(new Vector2d(0,0), this.extents)

    for (let particle of particles) {
      particleQuadTree.add(particle)
    }

    let gravityMemo = new Map()

    for (let particle of particles) {
      for (let node of particleQuadTree.allNonIntersectingNodes(particle.pos)) {
        if (!gravityMemo.has(node)) {
          let total_node_mass = 0
          let sumX = 0
          let sumY = 0
          for (let node_particle of node) {
            total_node_mass += 1
            sumX += node_particle.pos.x
            sumY += node_particle.pos.y
          }
          let avgX = sumX / total_node_mass
          let avgY = sumY / total_node_mass
          gravityMemo.set(node, { pos: new Vector2d(avgX, avgY), mass: total_node_mass })
        }

        let memo = gravityMemo.get(node)

        let diff = particle.pos.subtract(memo.pos);
        let gravityStrength = memo.mass * 1.0/(diff.lengthSquared()) * this.gravityCoef;
        let gravityVector = diff.multiply(gravityStrength);
        particle.spd.subtractMutate(gravityVector)
      }
    }
  }
}
