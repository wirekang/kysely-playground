import { CreateIndexNode, IndexType } from '../operation-node/create-index-node.js';
import { OperationNodeSource } from '../operation-node/operation-node-source.js';
import { CompiledQuery } from '../query-compiler/compiled-query.js';
import { Compilable } from '../util/compilable.js';
import { QueryExecutor } from '../query-executor/query-executor.js';
import { QueryId } from '../util/query-id.js';
import { Expression } from '../expression/expression.js';
export declare class CreateIndexBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateIndexBuilderProps);
    /**
     * Makes the index unique.
     */
    unique(): CreateIndexBuilder;
    /**
     * Specifies the table for the index.
     */
    on(table: string): CreateIndexBuilder;
    /**
     * Specifies the column for the index.
     *
     * Also see the `expression` for specifying an arbitrary expression.
     */
    column(column: string): CreateIndexBuilder;
    /**
     * Specifies a list of columns for the index.
     *
     * Also see the `expression` for specifying an arbitrary expression.
     */
    columns(columns: string[]): CreateIndexBuilder;
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     */
    expression(expression: Expression<any>): CreateIndexBuilder;
    /**
     * Specifies the index type.
     */
    using(indexType: IndexType): CreateIndexBuilder;
    using(indexType: string): CreateIndexBuilder;
    toOperationNode(): CreateIndexNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
export interface CreateIndexBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly createIndexNode: CreateIndexNode;
}
