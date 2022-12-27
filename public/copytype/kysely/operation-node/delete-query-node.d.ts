import { FromNode } from './from-node.js';
import { JoinNode } from './join-node.js';
import { OperationNode } from './operation-node.js';
import { ReturningNode } from './returning-node.js';
import { WhereNode } from './where-node.js';
import { WithNode } from './with-node.js';
import { LimitNode } from './limit-node.js';
import { OrderByNode } from './order-by-node.js';
import { OrderByItemNode } from './order-by-item-node.js';
import { ExplainNode } from './explain-node.js';
export interface DeleteQueryNode extends OperationNode {
    readonly kind: 'DeleteQueryNode';
    readonly from: FromNode;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly where?: WhereNode;
    readonly returning?: ReturningNode;
    readonly with?: WithNode;
    readonly orderBy?: OrderByNode;
    readonly limit?: LimitNode;
    readonly explain?: ExplainNode;
}
/**
 * @internal
 */
export declare const DeleteQueryNode: Readonly<{
    is(node: OperationNode): node is DeleteQueryNode;
    create(fromItem: OperationNode, withNode?: WithNode): DeleteQueryNode;
    cloneWithOrderByItem(deleteNode: DeleteQueryNode, item: OrderByItemNode): DeleteQueryNode;
    cloneWithLimit(deleteNode: DeleteQueryNode, limit: LimitNode): DeleteQueryNode;
    cloneWithExplain(deleteNode: DeleteQueryNode, explain: ExplainNode): DeleteQueryNode;
}>;
