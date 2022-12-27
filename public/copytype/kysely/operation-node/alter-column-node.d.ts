import { OperationNode } from './operation-node.js';
import { ColumnNode } from './column-node.js';
import { DataTypeNode } from './data-type-node.js';
import { RawNode } from './raw-node.js';
export declare type AlterColumnNodeProps = Omit<AlterColumnNode, 'kind' | 'column'>;
export interface AlterColumnNode extends OperationNode {
    readonly kind: 'AlterColumnNode';
    readonly column: ColumnNode;
    readonly dataType?: DataTypeNode;
    readonly dataTypeExpression?: RawNode;
    readonly setDefault?: OperationNode;
    readonly dropDefault?: true;
    readonly setNotNull?: true;
    readonly dropNotNull?: true;
}
/**
 * @internal
 */
export declare const AlterColumnNode: Readonly<{
    is(node: OperationNode): node is AlterColumnNode;
    create(column: string): AlterColumnNode;
    cloneWith(node: AlterColumnNode, props: AlterColumnNodeProps): AlterColumnNode;
}>;
