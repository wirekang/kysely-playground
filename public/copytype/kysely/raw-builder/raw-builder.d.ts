import { QueryResult } from '../driver/database-connection.js';
import { AliasNode } from '../operation-node/alias-node.js';
import { RawNode } from '../operation-node/raw-node.js';
import { KyselyPlugin } from '../plugin/kysely-plugin.js';
import { QueryExecutorProvider } from '../query-executor/query-executor-provider.js';
import { QueryId } from '../util/query-id.js';
import { AliasedExpression, Expression } from '../expression/expression.js';
/**
 * An instance of this class can be used to create raw SQL snippets or queries.
 *
 * You shouldn't need to create `RawBuilder` instances directly. Instead you should
 * use the {@link sql} template tag.
 */
export declare class RawBuilder<O> implements Expression<O> {
    #private;
    constructor(props: RawBuilderProps);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): O | undefined;
    /**
     * Returns an aliased version of the SQL expression.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```ts
     * select concat(first_name, ' ', last_name) as "full_name"
     * from "person"
     * ```
     *
     * You can also pass in a raw SQL snippet but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```ts
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: A): AliasedRawBuilder<O, A>;
    as<A extends string = never>(alias: Expression<any>): AliasedRawBuilder<O, A>;
    /**
     * Change the output type of the raw expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `RawBuilder` with a new output type.
     */
    castTo<T>(): RawBuilder<T>;
    /**
     * Adds a plugin for this SQL snippet.
     */
    withPlugin(plugin: KyselyPlugin): RawBuilder<O>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): RawNode;
    execute(executorProvider: QueryExecutorProvider): Promise<QueryResult<O>>;
}
export declare function isRawBuilder(obj: unknown): obj is RawBuilder<unknown>;
/**
 * {@link RawBuilder} with an alias. The result of calling {@link RawBuilder.as}.
 */
export declare class AliasedRawBuilder<O = unknown, A extends string = never> implements AliasedExpression<O, A> {
    #private;
    constructor(rawBuilder: RawBuilder<O>, alias: A | Expression<any>);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<O>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
export interface RawBuilderProps {
    readonly queryId: QueryId;
    readonly rawNode: RawNode;
    readonly plugins?: ReadonlyArray<KyselyPlugin>;
}
