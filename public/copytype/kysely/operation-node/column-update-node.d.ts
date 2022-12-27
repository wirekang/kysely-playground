import { ColumnNode } from './column-node.js';
import { OperationNode } from './operation-node.js';
export interface ColumnUpdateNode extends OperationNode {
    readonly kind: 'ColumnUpdateNode';
    readonly column: ColumnNode;
    readonly value: OperationNode;
}
/**
 * @internal
 */
export declare const ColumnUpdateNode: Readonly<{
    is(node: OperationNode): node is ColumnUpdateNode;
    create(column: ColumnNode, value: OperationNode): ColumnUpdateNode;
}>;
