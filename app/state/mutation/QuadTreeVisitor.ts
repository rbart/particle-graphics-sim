import { QuadTreeLeafNode, QuadTreeInnerNode } from '../../datastructure/QuadTreeNode'
import HasPosition2d from '../HasPosition2d'

export default interface Visitor<TElement extends HasPosition2d> {
  visit(node: QuadTreeInnerNode<TElement>): void,
  visitLeaf(node: QuadTreeLeafNode<TElement>): void
}
