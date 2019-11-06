import { QuadTreeLeafNode, QuadTreeInnerNode, Collection } from '../../datastructure/QuadTreeNode'
import HasPosition2d from '../HasPosition2d'

export default interface Visitor<TElement extends HasPosition2d, TCollection extends Collection<TElement>> {
  visit(node: QuadTreeInnerNode<TElement, TCollection>): void,
  visitLeaf(node: QuadTreeLeafNode<TElement, TCollection>): void
}
