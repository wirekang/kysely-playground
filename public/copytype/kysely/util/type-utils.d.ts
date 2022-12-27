import { SelectQueryBuilder } from '../query-builder/select-query-builder.js';
import { InsertResult } from '../query-builder/insert-result.js';
import { DeleteResult } from '../query-builder/delete-result.js';
import { UpdateResult } from '../query-builder/update-result.js';
/**
 * Given an object type, extracts the union of all value types.
 */
export declare type ValueType<T> = T[keyof T];
/**
 * Given a database type and a union of table names in that db, returns
 * a union type with all possible column names.
 *
 * Example:
 *
 * ```ts
 * interface Person {
 *   id: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * interface Movie {
 *   stars: number
 * }
 *
 * interface Database {
 *   person: Person
 *   pet: Pet
 *   movie: Movie
 * }
 *
 * type Columns = AnyColumn<Database, 'person' | 'pet'>
 *
 * // Columns == 'id' | 'name' | 'species'
 * ```
 */
export declare type AnyColumn<DB, TB extends keyof DB> = {
    [T in TB]: keyof DB[T];
}[TB] & string;
/**
 * Extracts a column type.
 */
export declare type ExtractColumnType<DB, TB extends keyof DB, C> = {
    [T in TB]: C extends keyof DB[T] ? DB[T][C] : never;
}[TB];
/**
 * Given a database type and a union of table names in that db, returns
 * a union type with all possible `table`.`column` combinations.
 *
 * Example:
 *
 * ```ts
 * interface Person {
 *   id: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * interface Movie {
 *   stars: number
 * }
 *
 * interface Database {
 *   person: Person
 *   pet: Pet
 *   movie: Movie
 * }
 *
 * type Columns = AnyColumnWithTable<Database, 'person' | 'pet'>
 *
 * // Columns == 'person.id' | 'pet.name' | 'pet.species'
 * ```
 */
export declare type AnyColumnWithTable<DB, TB extends keyof DB> = {
    [T in TB]: T extends string ? keyof DB[T] extends string ? `${T}.${keyof DB[T]}` : never : never;
}[TB];
/**
 * Just like {@link AnyColumn} but with a ` as <string>` suffix.
 */
export declare type AnyAliasedColumn<DB, TB extends keyof DB> = {
    [T in TB]: T extends string ? keyof DB[T] extends string ? `${keyof DB[T]} as ${string}` : never : never;
}[TB];
/**
 * Just like {@link AnyColumnWithTable} but with a ` as <string>` suffix.
 */
export declare type AnyAliasedColumnWithTable<DB, TB extends keyof DB> = {
    [T in TB]: T extends string ? keyof DB[T] extends string ? `${T}.${keyof DB[T]} as ${string}` : never : never;
}[TB];
/**
 * Extracts the item type of an array.
 */
export declare type ArrayItemType<T> = T extends ReadonlyArray<infer I> ? I : never;
export declare type AnySelectQueryBuilder = SelectQueryBuilder<any, any, any>;
export declare type SingleResultType<O> = O extends InsertResult ? O : O extends DeleteResult ? O : O extends UpdateResult ? O : O | undefined;
export declare type UnknownRow = Record<string, unknown>;
export declare type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
/**
 * Takes all properties from T1 and merges all properties from T2
 * that don't exist in T1 as optional properties.
 *
 * Example:
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * type Merged = MergePartial<Person, Pet>
 *
 * // { name: string, age: number, species?: 'cat' | 'dog' }
 */
export declare type MergePartial<T1, T2> = T1 & Partial<Omit<T2, keyof T1>>;
export declare type IsNever<T> = [T] extends [never] ? true : false;
export declare type Equals<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false;
