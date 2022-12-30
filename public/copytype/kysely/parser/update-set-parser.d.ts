import { ColumnUpdateNode } from '../operation-node/column-update-node.js';
import { UpdateKeys, UpdateType } from '../util/column-type.js';
import { ValueExpression } from './value-parser.js';
export declare type UpdateObject<DB, TB extends keyof DB, UT extends keyof DB> = {
    [C in UpdateKeys<DB[UT]>]?: ValueExpression<DB, TB, UpdateType<DB[UT][C]>> | undefined;
};
export declare function parseUpdateObject(update: UpdateObject<any, any, any>): ReadonlyArray<ColumnUpdateNode>;
