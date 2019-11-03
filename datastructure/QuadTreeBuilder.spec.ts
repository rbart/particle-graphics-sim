import QuadTreeNode from './QuadTreeNode'
import QuadTreeBuilder from './QuadTreeBuilder'
import { Aggregator, Aggregate } from './QuadTreeBuilder'
import Vector2d from '../state/Vector2d'
import HasPosition2d from '../state/HasPosition2d'
import { expect } from 'chai';

class TestElement implements HasPosition2d {

  pos: Vector2d

  constructor(x: number, y: number) {
    this.pos = new Vector2d(x, y)
  }

  position(): Vector2d {
    return this.pos
  }
}

class TestAggregator implements Aggregator<TestElement, TestAggregate> {
  aggregate(elements: TestElement[]): TestAggregate {
    return new TestAggregate(elements.map(e => e.pos.length()).reduce((a,b)=>a+b,0))
  }
  combine(aggregates: TestAggregate[]): TestAggregate {
    return new TestAggregate(aggregates.map(a => a.val).reduce((a,b) => a+b))
  }
}

class TestAggregate implements Aggregate<TestElement> {
  constructor(public val: number) { }
}

describe('QuadTreeBuilder', () => {

  let extents: Vector2d = new Vector2d(10, 10)

  it('should build a simple quadtree', () => {
    let builder = new QuadTreeBuilder<TestElement, TestAggregate, TestAggregator>(new TestAggregator(), extents.length());
    let quadTree = builder.build(extents)
    var nodesCount = 0
    var elementsCount = 0
    let countNodes = (node: QuadTreeNode<TestElement, TestAggregate>) => {
      elementsCount += node.elements.length
      nodesCount++
      for (let child of node.children()) {
        countNodes(child)
      }
    }
    let testElement = new TestElement(2, 2)
    quadTree.add(testElement)
    countNodes(quadTree.root)
    expect(nodesCount).to.equal(5);
    expect(elementsCount).to.equal(1);
  });

  it('should build a large quadtree', () => {
    let testExtents: Vector2d = new Vector2d(1920, 1080)
    let builder = new QuadTreeBuilder<TestElement, TestAggregate, TestAggregator>(
      new TestAggregator(), 5);
    let quadTree = builder.build(testExtents)
    var nodesCount = 0
    let countNodes = (node: QuadTreeNode<TestElement, TestAggregate>) => {
      nodesCount++
      for (let child of node.children()) {
        countNodes(child)
      }
    }
    countNodes(quadTree.root)
    expect(nodesCount).to.equal(349525);
  });

  it('should compute a simple aggregate', () => {
    let builder = new QuadTreeBuilder<TestElement, TestAggregate, TestAggregator>(new TestAggregator(), extents.length());
    let quadTree = builder.build(extents)
    let testElements = [
      new TestElement(3, 4)
    ]
    for (let element of testElements) {
      quadTree.add(element)
    }
    quadTree.computeAggregates()
    expect(quadTree.root.aggregate!.val).to.equal(5);
  });

  it('should compute a nontrivial aggregate', () => {
    let builder = new QuadTreeBuilder<TestElement, TestAggregate, TestAggregator>(new TestAggregator(), extents.length());
    let quadTree = builder.build(extents)
    let testElements = [
      new TestElement(1, 0), // length 1
      new TestElement(3, 4), // length 5
      new TestElement(0, 2), // length 2
      new TestElement(4, 3) // length 5
    ]
    for (let element of testElements) {
      quadTree.add(element)
    }
    quadTree.computeAggregates()
    expect(quadTree.root.aggregate!.val).to.equal(13);
  });
});
