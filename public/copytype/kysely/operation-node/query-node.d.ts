import { InsertQueryNode } from './insert-query-node.js';
import { SelectQueryNode } from './select-query-node.js';
import { UpdateQueryNode } from './update-query-node.js';
import { DeleteQueryNode } from './delete-query-node.js';
import { JoinNode } from './join-node.js';
import { SelectionNode } from './selection-node.js';
import { OperationNode } from './operation-node.js';
export declare type QueryNode = SelectQueryNode | DeleteQueryNode | InsertQueryNode | UpdateQueryNode;
export declare type MutatingQueryNode = DeleteQueryNode | InsertQueryNode | UpdateQueryNode;
export declare type FilterableQueryNode = SelectQueryNode | DeleteQueryNode | UpdateQueryNode;
/**
 * @internal
 */
export declare const QueryNode: Readonly<{
    is(node: OperationNode): node is QueryNode;
    cloneWithWhere<T extends FilterableQueryNode>(node: T, operation: OperationNode): T;
    cloneWithOrWhere<T_1 extends FilterableQueryNode>(node: T_1, operation: OperationNode): T_1;
    cloneWithJoin<T_2 extends FilterableQueryNode>(node: T_2, join: JoinNode): T_2;
    cloneWithReturning<T_3 extends MutatingQueryNode>(node: T_3, selections: ReadonlyArray<SelectionNode>): T_3;
}>;
