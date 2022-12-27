import { ColumnUpdateNode } from './column-update-node.js';
import { JoinNode } from './join-node.js';
import { OperationNode } from './operation-node.js';
import { PrimitiveValueListNode } from './primitive-value-list-node.js';
import { ReturningNode } from './returning-node.js';
import { ValueListNode } from './value-list-node.js';
import { WhereNode } from './where-node.js';
import { WithNode } from './with-node.js';
import { FromNode } from './from-node.js';
import { ExplainNode } from './explain-node.js';
export declare type UpdateValuesNode = ValueListNode | PrimitiveValueListNode;
export interface UpdateQueryNode extends OperationNode {
    readonly kind: 'UpdateQueryNode';
    readonly table: OperationNode;
    readonly from?: FromNode;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly where?: WhereNode;
    readonly updates?: ReadonlyArray<ColumnUpdateNode>;
    readonly returning?: ReturningNode;
    readonly with?: WithNode;
    readonly explain?: ExplainNode;
}
/**
 * @internal
 */
export declare const UpdateQueryNode: Readonly<{
    is(node: OperationNode): node is UpdateQueryNode;
    create(table: OperationNode, withNode?: WithNode): UpdateQueryNode;
    cloneWithFromItems(updateQuery: UpdateQueryNode, fromItems: ReadonlyArray<OperationNode>): UpdateQueryNode;
    cloneWithUpdates(updateQuery: UpdateQueryNode, updates: ReadonlyArray<ColumnUpdateNode>): UpdateQueryNode;
    cloneWithExplain(updateQuery: UpdateQueryNode, explain: ExplainNode): UpdateQueryNode;
}>;
