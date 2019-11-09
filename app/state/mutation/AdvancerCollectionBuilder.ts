import Advancer from "./Advancer"
import BasicAdvancer from './BasicAdvancer'
import WallBounceAdvancer from './WallBounceAdvancer'
import QuadTreeGravityAdvancer from './QuadTreeGravityAdvancer'
import AdvancerCollection from './AdvancerCollection'
import Rectangle from "../Rectangle"

export default class AdvancerCollectionBuilder {

  static createDefault(bounds: Rectangle): Advancer {

    let advancers: Advancer[] = [
      new WallBounceAdvancer(0.5, bounds),
      new QuadTreeGravityAdvancer(0.02, bounds),
      new BasicAdvancer(),
    ];

    return new AdvancerCollection(advancers)
  }
}
