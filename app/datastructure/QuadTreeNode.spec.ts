import QuadTreeLeafNode from './QuadTreeNode';
import Vector2d from '../state/Vector2d'
import HasPosition2d from '../state/HasPosition2d'
import { expect } from 'chai';
//import 'mocha';

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
    let actualElements = node.elements!
    expect(actualElements.length).to.equal(1);
    expect(actualElements[0]).to.equal(testElement);
  });

  it('should support adding multiple elements from the same location', () => {
    let node = new QuadTreeLeafNode<TestElement>(origin, extents);
    let testElement = new TestElement(2, 2)
    node.add(testElement)
    node.add(testElement)
    node.add(testElement)
    let actualElements = node.elements!
    expect(node.isLeaf).to.be.true
    expect(actualElements.length).to.equal(3);
    actualElements.forEach(el => expect(el).to.equal(testElement))
  });

  it('should return an internal node when adding multiple elements', () => {
    let node = new QuadTreeLeafNode<TestElement>(origin, extents);
    let element1 = new TestElement(2, 2)
    let element2 = new TestElement(3, 3)
    node.add(element1)
    node.add(element2)

    let actualElements = node.elements!
    expect(node.isLeaf).to.be.false
    expect(actualElements.length).to.equal(2);
    expect(actualElements[0]).to.equal(element1);
    expect(actualElements[1]).to.equal(element2);
  });
});
