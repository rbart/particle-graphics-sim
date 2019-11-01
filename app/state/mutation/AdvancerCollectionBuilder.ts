import Advancer from "./Advancer"
import BasicAdvancer from './BasicAdvancer'
import WallBounceAdvancer from './WallBounceAdvancer'
import GravityAdvancer from './GravityAdvancer'
import Vector2d from '../Vector2d'
import QuadTreeGravityAdvancer from './QuadTreeGravityAdvancer'
import AdvancerCollection from './AdvancerCollection'

export default class AdvancerCollectionBuilder {

  static createDefault(width: number, height: number): Advancer {

    let advancers: Advancer[] = [
      new WallBounceAdvancer(0.8, width, height),
      new QuadTreeGravityAdvancer(0.001, new Vector2d(width, height)),
      //new GravityAdvancer(0.08),
      new BasicAdvancer()
    ];

    return new AdvancerCollection(advancers)
  }
}
