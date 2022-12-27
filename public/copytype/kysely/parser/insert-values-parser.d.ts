import { ColumnNode } from '../operation-node/column-node.js';
import { ValueExpression } from './value-parser.js';
import { ValuesNode } from '../operation-node/values-node.js';
import { NonNullableInsertKeys, NullableInsertKeys, InsertType } from '../util/column-type.js';
export declare type InsertObject<DB, TB extends keyof DB> = {
    [C in NonNullableInsertKeys<DB[TB]>]: ValueExpression<DB, TB, InsertType<DB[TB][C]>>;
} & {
    [C in NullableInsertKeys<DB[TB]>]?: ValueExpression<DB, TB, InsertType<DB[TB][C]>> | undefined;
};
export declare type InsertObjectOrList<DB, TB extends keyof DB> = InsertObject<DB, TB> | ReadonlyArray<InsertObject<DB, TB>>;
export declare function parseInsertObjectOrList(args: InsertObjectOrList<any, any>): [ReadonlyArray<ColumnNode>, ValuesNode];
