import { Expression } from '../expression/expression.js';
import { OperationNode } from '../operation-node/operation-node.js';
export declare type DefaultValueExpression = unknown | Expression<unknown>;
export declare function parseDefaultValueExpression(value: DefaultValueExpression): OperationNode;
