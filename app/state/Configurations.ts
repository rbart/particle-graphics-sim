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

  public static SimpleGravityConfig = new Configuration(
    new BasicParticleBuilder(2000, 1, 1.25, 1.25),
    [
      new WallBounceAdvancerFactory(0.9),
      new QuadTreeGravityAdvancerFactory(new ApplyGravityVisitorFactory(0.03)),
      new BasicAdvancerFactory(1)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory(),
      new QuadTreeRendererFactory()
    ]
  )

  public static VariableMassGravityConfig = new Configuration(
    new BasicParticleBuilder(1000, 1, 1, 4),
    [
      new WallBounceAdvancerFactory(0.9),
      new QuadTreeGravityAdvancerFactory(new ApplyGravityVisitorFactory(0.01)),
      new BasicAdvancerFactory(1)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory(),
      new QuadTreeRendererFactory()
    ]
  )

  public static ColorGravityConfig = new Configuration(
    new BasicParticleBuilder(2000, 1, 1.25, 1.25),
    [
      new WallBounceAdvancerFactory(0.6),
      new QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitorFactory(0.03)),
      new BasicAdvancerFactory(1),
      new FixedGravityAdvancerFactory(new Vector2d(0.5, 0.5), 1, 0.04)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory()
    ]
  )

  public static ColorDragGravityConfig = new Configuration(
    new BasicParticleBuilder(2000, 1, 1.25, 1.25),
    [
      new WallBounceAdvancerFactory(1),
      new QuadTreeGravityAdvancerFactory(new ApplyColorGravityVisitorFactory(0.03)),
      new BasicAdvancerFactory(0.95),
      new FixedGravityAdvancerFactory(new Vector2d(0.5, 0.5), 1, 0.04)
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
      new QuadTreeGravityAdvancerFactory(new OscillatingColorGravityVisitorFactory(0.03)),
      new BasicAdvancerFactory(0.995),
      new FixedGravityAdvancerFactory(new Vector2d(0.5, 0.5), 1, 0.04)
    ],
    [
      new FadeRendererFactory(0.7),
      new ParticleRendererFactory()
    ]
  )
}
