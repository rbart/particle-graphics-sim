import Advancer from "./Advancer";
import Rectangle from "../Rectangle";

export default interface AdvancerFactory {
  createInstance(bounds: Rectangle): Advancer
}
