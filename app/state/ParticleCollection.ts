import { Collection } from '../datastructure/QuadTreeNode'
import Particle from './Particle'
import Vector2d from './Vector2d'
import Vector3d from './Vector3d';
import { Factory } from '../datastructure/QuadTreeBuilder';

export default class ParticleCollection extends Collection<Particle> {

  // TODO make this readonly
  public aggregate: Particle;

  constructor() {
    super();
    this.aggregate = new Particle(new Vector2d(0,0), new Vector2d(0,0), 0, 0, new Vector3d(0,0,0))
  }
}
