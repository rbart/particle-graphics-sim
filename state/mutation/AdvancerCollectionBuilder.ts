import Advancer from "./Advancer"
import BasicAdvancer from './BasicAdvancer'
import WallBounceAdvancer from './WallBounceAdvancer'
import QuadTreeGravityAdvancer from './QuadTreeGravityAdvancer'
import AdvancerCollection from './AdvancerCollection'
import Rectangle from "../Rectangle"
import FixedGravityAdvancer from "./FixedGravityAdvancer"

export default class AdvancerCollectionBuilder {

  static createDefault(bounds: Rectangle): Advancer {

    let advancers: Advancer[] = [
      new WallBounceAdvancer(1, bounds),
      new QuadTreeGravityAdvancer(0.03, bounds),
      new BasicAdvancer(),
      new FixedGravityAdvancer(bounds.extents.multiply(0.5), 1, 0.04)
    ];

    return new AdvancerCollection(advancers)
  }
}
