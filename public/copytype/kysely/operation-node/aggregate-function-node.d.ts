import { OperationNode } from './operation-node.js';
import { OverNode } from './over-node.js';
import { SimpleReferenceExpressionNode } from './simple-reference-expression-node.js';
import { WhereNode } from './where-node.js';
declare type AggregateFunction = 'avg' | 'count' | 'max' | 'min' | 'sum';
export interface AggregateFunctionNode extends OperationNode {
    readonly kind: 'AggregateFunctionNode';
    readonly func: AggregateFunction;
    readonly column: SimpleReferenceExpressionNode;
    readonly distinct?: boolean;
    readonly filter?: WhereNode;
    readonly over?: OverNode;
}
/**
 * @internal
 */
export declare const AggregateFunctionNode: Readonly<{
    is(node: OperationNode): node is AggregateFunctionNode;
    create(aggregateFunction: AggregateFunction, column: SimpleReferenceExpressionNode): AggregateFunctionNode;
    cloneWithDistinct(aggregateFunctionNode: AggregateFunctionNode): AggregateFunctionNode;
    cloneWithFilter(aggregateFunctionNode: AggregateFunctionNode, filter: OperationNode): AggregateFunctionNode;
    cloneWithOrFilter(aggregateFunctionNode: AggregateFunctionNode, filter: OperationNode): AggregateFunctionNode;
    cloneWithOver(aggregateFunctionNode: AggregateFunctionNode, over?: OverNode): AggregateFunctionNode;
}>;
export {};
