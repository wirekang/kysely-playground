import { BinaryOperationNode } from '../operation-node/binary-operation-node.js';
import { ComparisonOperator } from '../operation-node/operator-node.js';
import { ExtractTypeFromReferenceExpression, ReferenceExpression } from './reference-parser.js';
import { ValueExpression, ValueExpressionOrList } from './value-parser.js';
import { WhereInterface } from '../query-builder/where-interface.js';
import { HavingInterface } from '../query-builder/having-interface.js';
import { OperationNode } from '../operation-node/operation-node.js';
import { Expression } from '../expression/expression.js';
export declare type OperandValueExpression<DB, TB extends keyof DB, RE> = ValueExpression<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
export declare type OperandValueExpressionOrList<DB, TB extends keyof DB, RE> = ValueExpressionOrList<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
export declare type WhereGrouper<DB, TB extends keyof DB> = (qb: WhereInterface<DB, TB>) => WhereInterface<DB, TB>;
export declare type HavingGrouper<DB, TB extends keyof DB> = (qb: HavingInterface<DB, TB>) => HavingInterface<DB, TB>;
export declare type ComparisonOperatorExpression = ComparisonOperator | Expression<any>;
declare type FilterExpressionType = 'where' | 'having' | 'on';
export declare function parseWhere(args: any[]): OperationNode;
export declare function parseHaving(args: any[]): OperationNode;
export declare function parseOn(args: any[]): OperationNode;
export declare function parseReferentialFilter(leftOperand: ReferenceExpression<any, any>, operator: ComparisonOperatorExpression, rightOperand: ReferenceExpression<any, any>): BinaryOperationNode;
export declare function parseFilterExpression(type: FilterExpressionType, args: any[]): OperationNode;
export {};
