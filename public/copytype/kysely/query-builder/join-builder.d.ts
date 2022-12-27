import { Expression } from '../expression/expression.js';
import { JoinNode } from '../operation-node/join-node.js';
import { OperationNodeSource } from '../operation-node/operation-node-source.js';
import { ComparisonOperatorExpression, OperandValueExpressionOrList } from '../parser/binary-operation-parser.js';
import { ReferenceExpression } from '../parser/reference-parser.js';
import { ExistsExpression } from '../parser/unary-operation-parser.js';
export declare class JoinBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: JoinBuilderProps);
    /**
     * Just like {@link WhereInterface.where} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.where} for documentation and examples.
     */
    on<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): JoinBuilder<DB, TB>;
    on(grouper: (qb: JoinBuilder<DB, TB>) => JoinBuilder<DB, TB>): JoinBuilder<DB, TB>;
    on(expression: Expression<any>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhere} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhere} for documentation and examples.
     */
    orOn<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): JoinBuilder<DB, TB>;
    orOn(grouper: (qb: JoinBuilder<DB, TB>) => JoinBuilder<DB, TB>): JoinBuilder<DB, TB>;
    orOn(expression: Expression<any>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */
    onRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhereRef} for documentation and examples.
     */
    orOnRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereExists} for documentation and examples.
     */
    onExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereNotExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereNotExists} for documentation and examples.
     */
    onNotExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhereExists} for documentation and examples.
     */
    orOnExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereNotExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhereNotExists} for documentation and examples.
     */
    orOnNotExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Adds `on true`.
     */
    onTrue(): JoinBuilder<DB, TB>;
    toOperationNode(): JoinNode;
}
export interface JoinBuilderProps {
    readonly joinNode: JoinNode;
}
