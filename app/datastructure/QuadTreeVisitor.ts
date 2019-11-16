import { QuadTreeLeafNode, QuadTreeInnerNode } from './QuadTreeNode'
import HasPosition2d from '../state/HasPosition2d'
import Collection from './Collection'

export default interface QuadTreeVisitor<TElement extends HasPosition2d, TCollection extends Collection<TElement>> {
  visit(node: QuadTreeInnerNode<TElement, TCollection>): void,
  visitLeaf(node: QuadTreeLeafNode<TElement, TCollection>): void
}
