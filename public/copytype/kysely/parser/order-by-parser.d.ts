import { Expression } from '../expression/expression.js';
import { OrderByItemNode } from '../operation-node/order-by-item-node.js';
import { ReferenceExpression } from './reference-parser.js';
export declare type OrderByDirection = 'asc' | 'desc';
export declare type OrderByExpression<DB, TB extends keyof DB, O> = ReferenceExpression<DB, TB> | (keyof O & string);
export declare type OrderByDirectionExpression = OrderByDirection | Expression<any>;
export declare function parseOrderBy(orderBy: OrderByExpression<any, any, any>, direction?: OrderByDirectionExpression): OrderByItemNode;
