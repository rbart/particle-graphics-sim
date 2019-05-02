import Advancer from "./Advancer"
import BasicAdvancer from './BasicAdvancer'
import WallBounceAdvancer from './WallBounceAdvancer'
import GravityAdvancer from './GravityAdvancer'
import AdvancerCollection from './AdvancerCollection'

export default class AdvancerCollectionBuilder {

  static createDefault(width: number, height: number): Advancer {

    let advancers: Advancer[] = [
      new WallBounceAdvancer(0.8, width, height),
      new GravityAdvancer(0.08),
      new BasicAdvancer()
    ];

    return new AdvancerCollection(advancers)
  }
}
