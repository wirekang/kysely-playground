import { OperationNode } from './operation-node.js';
export interface OrderByItemNode extends OperationNode {
    readonly kind: 'OrderByItemNode';
    readonly orderBy: OperationNode;
    readonly direction?: OperationNode;
}
/**
 * @internal
 */
export declare const OrderByItemNode: Readonly<{
    is(node: OperationNode): node is OrderByItemNode;
    create(orderBy: OperationNode, direction?: OperationNode): OrderByItemNode;
}>;
