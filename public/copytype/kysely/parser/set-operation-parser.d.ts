import { Expression } from '../expression/expression.js';
import { SetOperator, SetOperationNode } from '../operation-node/set-operation-node.js';
export declare function parseSetOperation(operator: SetOperator, expression: Expression<any>, all: boolean): SetOperationNode;
