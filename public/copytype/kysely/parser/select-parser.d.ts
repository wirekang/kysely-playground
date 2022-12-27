import { AliasedSelectQueryBuilder, SelectQueryBuilder } from '../query-builder/select-query-builder.js';
import { SelectionNode } from '../operation-node/selection-node.js';
import { AnyAliasedColumn, AnyAliasedColumnWithTable, AnyColumn, AnyColumnWithTable, ExtractColumnType, ValueType } from '../util/type-utils.js';
import { DynamicReferenceBuilder } from '../dynamic/dynamic-reference-builder.js';
import { AliasedExpressionOrFactory } from './expression-parser.js';
import { Selectable, SelectType } from '../util/column-type.js';
import { AliasedExpression } from '../expression/expression.js';
export declare type SelectExpression<DB, TB extends keyof DB> = AnyAliasedColumnWithTable<DB, TB> | AnyAliasedColumn<DB, TB> | AnyColumnWithTable<DB, TB> | AnyColumn<DB, TB> | DynamicReferenceBuilder<any> | AliasedExpressionOrFactory<DB, TB>;
export declare type SelectExpressionOrList<DB, TB extends keyof DB> = SelectExpression<DB, TB> | ReadonlyArray<SelectExpression<DB, TB>>;
/**
 * Given a selection expression returns a query builder type that
 * has the selection.
 */
export declare type QueryBuilderWithSelection<DB, TB extends keyof DB, O, SE> = SelectQueryBuilder<DB, TB, O & Selection<DB, TB, SE>>;
/**
 * `selectAll` output query builder type.
 */
export declare type SelectAllQueryBuilder<DB, TB extends keyof DB, O, S extends keyof DB> = SelectQueryBuilder<DB, TB, O & AllSelection<DB, S>>;
export declare type Selection<DB, TB extends keyof DB, SE> = {
    [A in ExtractAliasFromSelectExpression<SE>]: SelectType<ExtractTypeFromSelectExpression<DB, TB, SE, A>>;
};
declare type ExtractAliasFromSelectExpression<SE> = SE extends string ? ExtractAliasFromStringSelectExpression<SE> : SE extends AliasedExpression<any, infer EA> ? EA : SE extends (qb: any) => AliasedExpression<any, infer EA> ? EA : SE extends DynamicReferenceBuilder<infer RA> ? ExtractAliasFromStringSelectExpression<RA> : never;
declare type ExtractAliasFromStringSelectExpression<SE extends string> = SE extends `${string}.${string}.${string} as ${infer A}` ? A : SE extends `${string}.${string} as ${infer A}` ? A : SE extends `${string} as ${infer A}` ? A : SE extends `${string}.${string}.${infer C}` ? C : SE extends `${string}.${infer C}` ? C : SE;
declare type ExtractTypeFromSelectExpression<DB, TB extends keyof DB, SE, A extends keyof any> = SE extends string ? ExtractTypeFromStringSelectExpression<DB, TB, SE, A> : SE extends AliasedSelectQueryBuilder<any, any, infer O, infer QA> ? QA extends A ? ValueType<O> : never : SE extends (qb: any) => AliasedSelectQueryBuilder<any, any, infer O, infer QA> ? QA extends A ? ValueType<O> : never : SE extends AliasedExpression<infer O, infer EA> ? EA extends A ? O : never : SE extends (qb: any) => AliasedExpression<infer O, infer EA> ? EA extends A ? O : never : SE extends DynamicReferenceBuilder<infer RA> ? A extends ExtractAliasFromStringSelectExpression<RA> ? ExtractTypeFromStringSelectExpression<DB, TB, RA, A> | undefined : never : never;
declare type ExtractTypeFromStringSelectExpression<DB, TB extends keyof DB, SE extends string, A extends keyof any> = SE extends `${infer SC}.${infer T}.${infer C} as ${infer RA}` ? RA extends A ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : never : SE extends `${infer T}.${infer C} as ${infer RA}` ? RA extends A ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : never : SE extends `${infer C} as ${infer RA}` ? RA extends A ? C extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, C> : never : never : SE extends `${infer SC}.${infer T}.${infer C}` ? C extends A ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : never : SE extends `${infer T}.${infer C}` ? C extends A ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : never : SE extends A ? SE extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, SE> : never : never;
declare type AllSelection<DB, TB extends keyof DB> = Selectable<{
    [C in AnyColumn<DB, TB>]: {
        [T in TB]: C extends keyof DB[T] ? DB[T][C] : never;
    }[TB];
}>;
export declare function parseSelectExpressionOrList(selection: SelectExpressionOrList<any, any>): SelectionNode[];
export declare function parseSelectAll(table?: string | string[]): SelectionNode[];
export {};
