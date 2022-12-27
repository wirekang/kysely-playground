import { AlterColumnNode } from '../operation-node/alter-column-node.js';
import { ColumnDataType } from '../operation-node/data-type-node.js';
import { OperationNodeSource } from '../operation-node/operation-node-source.js';
import { DefaultValueExpression } from '../parser/default-value-parser.js';
export declare class AlterColumnBuilder {
    protected readonly alterColumnNode: AlterColumnNode;
    constructor(alterColumnNode: AlterColumnNode);
    setDataType(dataType: ColumnDataType): AlteredColumnBuilder;
    setDefault(value: DefaultValueExpression): AlteredColumnBuilder;
    dropDefault(): AlteredColumnBuilder;
    setNotNull(): AlteredColumnBuilder;
    dropNotNull(): AlteredColumnBuilder;
}
/**
 * Allows us to force consumers to do something, anything, when altering a column.
 *
 * Basically, deny the following:
 *
 * ```ts
 * db.schema.alterTable('person').alterColumn('age', (ac) => ac)
 * ```
 *
 * Which would now throw a compilation error, instead of a runtime error.
 */
export declare class AlteredColumnBuilder extends AlterColumnBuilder implements OperationNodeSource {
    toOperationNode(): AlterColumnNode;
}
export declare type AlterColumnBuilderCallback = (builder: AlterColumnBuilder) => AlteredColumnBuilder;
