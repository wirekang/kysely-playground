import { CommonTableExpressionNameNode } from './common-table-expression-name-node.js';
import { OperationNode } from './operation-node.js';
export interface CommonTableExpressionNode extends OperationNode {
    readonly kind: 'CommonTableExpressionNode';
    readonly name: CommonTableExpressionNameNode;
    readonly expression: OperationNode;
}
/**
 * @internal
 */
export declare const CommonTableExpressionNode: Readonly<{
    is(node: OperationNode): node is CommonTableExpressionNode;
    create(name: CommonTableExpressionNameNode, expression: OperationNode): CommonTableExpressionNode;
}>;
