import { ExpressionOrFactory } from './expression-parser.js';
import { OperationNode } from '../operation-node/operation-node.js';
export declare type ValueExpression<DB, TB extends keyof DB, V> = V | ExpressionOrFactory<DB, TB, V>;
export declare type ValueExpressionOrList<DB, TB extends keyof DB, V> = ValueExpression<DB, TB, V> | ReadonlyArray<ValueExpression<DB, TB, V>>;
export declare function parseValueExpressionOrList(arg: ValueExpressionOrList<any, any, unknown>): OperationNode;
export declare function parseValueExpression(exp: ValueExpression<any, any, unknown>): OperationNode;
