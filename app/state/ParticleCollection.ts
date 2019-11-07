import QuadTreeCollectionFactory from '../datastructure/QuadTreeCollectionFactory'
import { Collection } from '../datastructure/QuadTreeNode'
import Particle from './Particle'
import Vector2d from './Vector2d'
import Vector3d from './Vector3d';
import HasPosition2d from './HasPosition2d';

export class ParticleCollectionFactory implements QuadTreeCollectionFactory<ParticleCollection> {

  private static readonly defaultBufferWidthConstant: number = (1 / 6)

  constructor(private readonly bufferWidthConstant: number =
    ParticleCollectionFactory.defaultBufferWidthConstant) { }

  createInstance(origin: Vector2d, extents: Vector2d): ParticleCollection {
    return new ParticleCollection(origin, extents, this.bufferWidthConstant)
  }
}

export default class ParticleCollection extends Collection<Particle> {

  public readonly aggregate: Particle;
  private readonly bufferOrigin: Vector2d
  private readonly bufferExtents: Vector2d

  constructor(origin: Vector2d, extents: Vector2d, bufferWidthConstant: number) {
    super();
    this.aggregate = new Particle(new Vector2d(0,0), new Vector2d(0,0), 0, 0, new Vector3d(0,0,0))
    let bufferWidth = extents.length() * bufferWidthConstant
    this.bufferOrigin = new Vector2d(origin.x - bufferWidth, origin.y - bufferWidth)//origin.subtract(bufferWidth)
    this.bufferExtents = new Vector2d(extents.x + 2*bufferWidth, extents.y + 2*bufferWidth)
  }

  canApplyAggregate(element: HasPosition2d): boolean {
    let position = element.position()
    let contains =
      position.x >= this.bufferOrigin.x &&
      position.x < this.bufferOrigin.x + this.bufferExtents.x &&
      position.y >= this.bufferOrigin.y &&
      position.y < this.bufferOrigin.y + this.bufferExtents.y
    return !contains
  }
}
