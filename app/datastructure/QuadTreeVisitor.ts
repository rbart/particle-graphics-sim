import { QuadTreeLeafNode, QuadTreeInnerNode } from './QuadTreeNode'
import HasPosition2d from '../state/HasPosition2d'

export default interface Visitor<TElement extends HasPosition2d> {
  visit(node: QuadTreeInnerNode<TElement>): void
  visitLeaf(node: QuadTreeLeafNode<TElement>): void
}
