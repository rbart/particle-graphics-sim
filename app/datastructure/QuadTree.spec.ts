import { QuadTreeLeafNode } from './QuadTree';
import Vector2d from '../state/Vector2d'
import HasPosition2d from '../state/HasPosition2d'
import { expect } from 'chai';
import 'mocha';

class TestElement implements HasPosition2d {

  pos: Vector2d

  constructor(x: number, y: number) {
    this.pos = new Vector2d(x, y)
  }

  position(): Vector2d {
    return this.pos
  }
}

describe('QuadTreeLeafNode', () => {

  let extents: Vector2d = new Vector2d(10, 10)
  let origin: Vector2d = new Vector2d(0, 0)

  it('should support adding an element', () => {
    let node = new QuadTreeLeafNode<TestElement>(origin, extents);
    let testElement = new TestElement(2, 2)
    node.add(testElement)
    let actualElements = [...node]
    expect(actualElements.length).to.equal(1);
    expect(actualElements[0]).to.equal(testElement);
  });

  it('should support adding multiple elements from the same location', () => {
    let node = new QuadTreeLeafNode<TestElement>(origin, extents);
    let testElement = new TestElement(2, 2)
    node.add(testElement)
    node.add(testElement)
    node.add(testElement)
    let actualElements = [...node]
    expect(actualElements.length).to.equal(3);
    actualElements.forEach(el => expect(el).to.equal(testElement))
  });
});
