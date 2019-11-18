import Renderer, { RendererFactory } from "../visualization/Renderer";
import AdvancerFactory from "./mutation/AdvancerFactory";
import { FadeRendererFactory } from "../visualization/FadeRenderer";
import { QuadTreeGravityAdvancerFactory } from "./mutation/QuadTreeGravityAdvancer";
import { WallBounceAdvancerFactory } from "./mutation/WallBounceAdvancer";
import { OscillatingColorGravityVisitorFactory } from "./mutation/OscillatingColorGravityVisitor";
import { BasicAdvancerFactory } from "./mutation/BasicAdvancer";
import Vector2d from "./Vector2d";
import { FixedGravityAdvancerFactory } from "./mutation/FixedGravityAdvancer";
import { ParticleRendererFactory } from "../visualization/ParticleRenderer";
import Rectangle from "./Rectangle";
import Advancer from "./mutation/Advancer";
import AdvancerCollection from "./mutation/AdvancerCollection";
import RendererCollection from "../visualization/RendererCollection";
import ParticleBuilder, { BasicParticleBuilder } from "./ParticleBuilder";
import { ApplyColorGravityVisitorFactory } from "./mutation/ApplyColorGravityVisitor";
import { QuadTreeRendererFactory } from "../visualization/QuadTreeRenderer";
import { ApplyGravityVisitorFactory } from "./mutation/ApplyGravityVisitor";
import { RadialParticleBuilder } from "./RadialParticleBuilder";
import { GravityAdvancerFactory } from "./mutation/GravityAdvancer";

let GRAVITY_COEF = 2.0

export class Configuration {
  constructor(
    public readonly particleBuilder: ParticleBuilder,
    private readonly advancers: AdvancerFactory[],
    private readonly renderers: RendererFactory[]) { }

  getAdvancer(bounds: Rectangle): Advancer {
    return new AdvancerCollection(this.advancers.map(adv => adv.createInstance(bounds)))
  }

  getRenderer(bounds: Rectangle, ctx: CanvasRenderingContext2D): Renderer {
    return new RendererCollection(this.renderers.map(rend => rend.createInstance(bounds, ctx)))
  }
}

export default class Configurations {

  public static RadialParticleGravityConfig = new Configuration(
    new RadialParticleBuilder(2000, 120, 300, GRAVITY_COEF, 200),
    [
      new BasicAdvancerFactory(1.0),
      new FixedGravityAdvancerFactory(new Vector2d(0.5, 0.5), 200, GRAVITY_COEF),
      new QuadTreeGravityAdvancerFactory(new ApplyGravityVisitorFactory(GRAVITY_COEF)),
      new WallBounceAdvancerFactory(1)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory()
    ]
  )

  public static SimpleGravityConfig = new Configuration(
    new BasicParticleBuilder(2000, 1, 1.25, 1.25),
    [
      new WallBounceAdvancerFactory(0.9),
      new QuadTreeGravityAdvancerFactory(new ApplyGravityVisitorFactory(GRAVITY_COEF)),
      new BasicAdvancerFactory(0.99),
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory()
    ]
  )

  public static ColorGravityConfig = new Configuration(
    new BasicParticleBuilder(2000, 1, 1.25, 1.25),
    [
      new WallBounceAdvancerFactory(0.5),
      new QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitorFactory(GRAVITY_COEF)),
      new BasicAdvancerFactory(1.0)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory()
    ]
  )

  public static OscillatingColorGravityConfig = new Configuration(
    new BasicParticleBuilder(2000, 1, 1.25, 1.25),
    [
      new WallBounceAdvancerFactory(1.0),
      new QuadTreeGravityAdvancerFactory(new OscillatingColorGravityVisitorFactory(GRAVITY_COEF)),
      new BasicAdvancerFactory(1.0)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory()
    ]
  )
}
