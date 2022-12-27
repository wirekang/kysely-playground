import { ColumnUpdateNode } from '../operation-node/column-update-node.js';
import { UpdateKeys, UpdateType } from '../util/column-type.js';
import { ValueExpression } from './value-parser.js';
export declare type MutationObject<DB, TB extends keyof DB, TM extends keyof DB> = {
    [C in UpdateKeys<DB[TM]>]?: ValueExpression<DB, TB, UpdateType<DB[TM][C]>> | undefined;
};
export declare function parseUpdateObject(row: MutationObject<any, any, any>): ReadonlyArray<ColumnUpdateNode>;
