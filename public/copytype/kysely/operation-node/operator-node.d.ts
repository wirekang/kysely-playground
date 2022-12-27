import { OperationNode } from './operation-node.js';
export declare const COMPARISON_OPERATORS: readonly ["=", "==", "!=", "<>", ">", ">=", "<", "<=", "in", "not in", "is", "is not", "like", "not like", "ilike", "not ilike", "@>", "<@", "?", "?&", "!<", "!>", "<=>", "!~", "~", "~*", "!~*", "&&", "||", "@@", "@@@", "!!", "<->"];
export declare const UNARY_FILTER_OPERATORS: readonly ["exists", "not exists"];
export declare type ComparisonOperator = typeof COMPARISON_OPERATORS[number];
export declare type UnaryFilterOperator = typeof UNARY_FILTER_OPERATORS[number];
export declare type Operator = ComparisonOperator | UnaryFilterOperator;
export interface OperatorNode extends OperationNode {
    readonly kind: 'OperatorNode';
    readonly operator: Operator;
}
/**
 * @internal
 */
export declare const OperatorNode: Readonly<{
    is(node: OperationNode): node is OperatorNode;
    create(operator: Operator): OperatorNode;
}>;
