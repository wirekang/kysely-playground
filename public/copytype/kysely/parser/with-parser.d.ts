import { UpdateQueryBuilder } from '../query-builder/update-query-builder.js';
import { DeleteQueryBuilder } from '../query-builder/delete-query-builder.js';
import { InsertQueryBuilder } from '../query-builder/insert-query-builder.js';
import { CommonTableExpressionNode } from '../operation-node/common-table-expression-node.js';
import { QueryCreator } from '../query-creator.js';
import { Expression } from '../expression/expression.js';
export declare type CommonTableExpression<DB, CN extends string> = (creator: QueryCreator<DB>) => CommonTableExpressionOutput<DB, CN>;
export declare type RecursiveCommonTableExpression<DB, CN extends string> = (creator: QueryCreator<DB & Record<ExtractTableFromCommonTableExpressionName<CN>, ExtractRowFromCommonTableExpressionName<CN>>>) => CommonTableExpressionOutput<DB, CN>;
export declare type QueryCreatorWithCommonTableExpression<DB, CN extends string, CTE> = QueryCreator<DB & Record<ExtractTableFromCommonTableExpressionName<CN>, ExtractRowFromCommonTableExpression<CTE>>>;
declare type CommonTableExpressionOutput<DB, CN extends string> = Expression<ExtractRowFromCommonTableExpressionName<CN>> | InsertQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>> | UpdateQueryBuilder<DB, any, any, ExtractRowFromCommonTableExpressionName<CN>> | DeleteQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>>;
/**
 * Given a common CommonTableExpression CTE extracts the row type from it.
 *
 * For example a CTE `(db) => db.selectFrom('person').select(['id', 'first_name'])`
 * would result in `Pick<Person, 'id' | 'first_name'>`.
 */
declare type ExtractRowFromCommonTableExpression<CTE> = CTE extends (creator: QueryCreator<any>) => infer Q ? Q extends Expression<infer QO> ? QO : Q extends InsertQueryBuilder<any, any, infer QO> ? QO : Q extends UpdateQueryBuilder<any, any, any, infer QO> ? QO : Q extends DeleteQueryBuilder<any, any, infer QO> ? QO : never : never;
/**
 * Extracts 'person' from a string like 'person(id, first_name)'.
 */
declare type ExtractTableFromCommonTableExpressionName<CN extends string> = CN extends `${infer TB}(${string})` ? TB : CN;
/**
 * Parses a string like 'person(id, first_name)' into a type:
 *
 * {
 *   id: any,
 *   first_name: any
 * }
 *
 */
declare type ExtractRowFromCommonTableExpressionName<CN extends string> = CN extends `${string}(${infer CL})` ? {
    [C in ExtractColumnNamesFromColumnList<CL>]: any;
} : Record<string, any>;
/**
 * Parses a string like 'id, first_name' into a type 'id' | 'first_name'
 */
declare type ExtractColumnNamesFromColumnList<R extends string> = R extends `${infer C}, ${infer RS}` ? C | ExtractColumnNamesFromColumnList<RS> : R;
export declare function parseCommonTableExpression(name: string, expression: CommonTableExpression<any, any>): CommonTableExpressionNode;
export {};
