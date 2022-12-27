import { UnaryOperationNode } from '../operation-node/unary-operation-node.js';
import { ExpressionOrFactory } from './expression-parser.js';
export declare type ExistsExpression<DB, TB extends keyof DB> = ExpressionOrFactory<DB, TB, any>;
export declare function parseExists(arg: ExistsExpression<any, any>): UnaryOperationNode;
export declare function parseNotExists(arg: ExistsExpression<any, any>): UnaryOperationNode;
