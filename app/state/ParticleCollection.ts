import QuadTreeCollectionFactory from '../datastructure/QuadTreeCollectionFactory'
import Collection from '../datastructure/Collection'
import Particle from './Particle'
import Vector2d from './Vector2d'
import Vector3d from './Vector3d';
import HasPosition2d from './HasPosition2d';
import Rectangle from './Rectangle';

export class ParticleCollectionFactory implements QuadTreeCollectionFactory<ParticleCollection> {

  private static readonly defaultBufferWidthConstant: number = (1 / 6)

  constructor(private readonly bufferWidthConstant: number =
    ParticleCollectionFactory.defaultBufferWidthConstant) { }

  createInstance(bounds: Rectangle): ParticleCollection {
    return new ParticleCollection(bounds, this.bufferWidthConstant)
  }
}

export default class ParticleCollection extends Collection<Particle> {

  public readonly aggregate: Particle
  // paddedBounds: aggregate can safely be applied outside of this boundary
  public readonly paddedBounds: Rectangle

  constructor(bounds: Rectangle, bufferWidthConstant: number) {
    super();
    this.aggregate = new Particle(new Vector2d(0,0), new Vector2d(0,0), 0, 0, new Vector2d(0,0))
    let bufferWidth = bounds.extents.length() * bufferWidthConstant
    let paddedOrigin = new Vector2d(bounds.origin.x - bufferWidth, bounds.origin.y - bufferWidth)
    let paddedExtents = new Vector2d(bounds.extents.x + 2*bufferWidth, bounds.extents.y + 2*bufferWidth)
    this.paddedBounds = new Rectangle(paddedOrigin, paddedExtents)
  }
}
