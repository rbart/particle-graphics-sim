import Advancer from "./Advancer"
import BasicAdvancer from './BasicAdvancer'
import WallBounceAdvancer from './WallBounceAdvancer'
import GravityAdvancer from './GravityAdvancer'
import QuadTreeGravityAdvancer from './QuadTreeGravityAdvancer'
import AdvancerCollection from './AdvancerCollection'
import Vector2d from '../../state/Vector2d'

export default class AdvancerCollectionBuilder {

  static createDefault(width: number, height: number): Advancer {

    let advancers: Advancer[] = [
      new WallBounceAdvancer(0.9, width, height),
      new GravityAdvancer(0.02),
      //new QuadTreeGravityAdvancer(0.09, new Vector2d(width, height)),
      new BasicAdvancer()
    ];

    return new AdvancerCollection(advancers)
  }
}
