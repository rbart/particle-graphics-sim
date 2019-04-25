import Vector2d from './Vector2d';
import { expect } from 'chai';
import 'mocha';

describe('Vector2d', () => {

  it('should store x and y coordinates', () => {
    let vector = new Vector2d(1, 2);
    expect(vector.x).to.equal(1);
    expect(vector.y).to.equal(2);
  });

  it('should calculate vector magnitude (length)', () => {
    let vector = new Vector2d(3, 4);
    expect(vector.length()).to.equal(5);
    expect(vector.lengthSquared()).to.equal(25);
  });

  it('should support addition', () => {
    let v1 = new Vector2d(3, 4);
    let v2 = new Vector2d(1, 2);
    v1.addMutate(v2);
    expect(v1.x).to.equal(4);
    expect(v1.y).to.equal(6);

    expect(v2.x).to.equal(1);
    expect(v2.y).to.equal(2);
  });

  it('should support subtraction', () => {
    let v1 = new Vector2d(3, 4)
    let v2 = new Vector2d(1, 2)
    let result = v1.subtract(v2)
    expect(v1.x).to.equal(3)
    expect(v1.y).to.equal(4)
    expect(v2.x).to.equal(1)
    expect(v2.y).to.equal(2)
    expect(result.x).to.equal(2)
    expect(result.y).to.equal(2)

    v1.subtractMutate(v2)
    expect(v1.x).to.equal(2)
    expect(v1.y).to.equal(2)
    expect(v2.x).to.equal(1)
    expect(v2.y).to.equal(2)
  });

  it('should support scalar multiplication', () => {
    let v1 = new Vector2d(3, 4)
    let result = v1.multiply(2.5)
    expect(v1.x).to.equal(3)
    expect(v1.y).to.equal(4)
    expect(result.x).to.equal(7.5)
    expect(result.y).to.equal(10)
  });
});
