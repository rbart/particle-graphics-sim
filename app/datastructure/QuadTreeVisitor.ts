import { QuadTreeLeafNode, QuadTreeInnerNode, Collection } from './QuadTreeNode'
import HasPosition2d from '../state/HasPosition2d'

export default interface Visitor<TElement extends HasPosition2d, TCollection extends Collection<TElement>> {
  visit(node: QuadTreeInnerNode<TElement, TCollection>): void,
  visitLeaf(node: QuadTreeLeafNode<TElement, TCollection>): void
}
