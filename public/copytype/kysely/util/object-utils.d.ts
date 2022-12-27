export declare function isEmpty(obj: ArrayLike<unknown> | string | object): boolean;
export declare function isUndefined(obj: unknown): obj is undefined;
export declare function isString(obj: unknown): obj is string;
export declare function isNumber(obj: unknown): obj is number;
export declare function isBoolean(obj: unknown): obj is boolean;
export declare function isNull(obj: unknown): obj is null;
export declare function isDate(obj: unknown): obj is Date;
export declare function isBigInt(obj: unknown): obj is BigInt;
export declare function isBuffer(obj: unknown): obj is {
    length: number;
};
export declare function isFunction(obj: unknown): obj is Function;
export declare function isObject(obj: unknown): obj is Record<string, unknown>;
export declare function isArrayBufferOrView(obj: unknown): obj is ArrayBuffer | ArrayBufferView;
export declare function getLast<T>(arr: ArrayLike<T>): T | undefined;
export declare function freeze<T>(obj: T): Readonly<T>;
export declare function asArray<T>(arg: T | T[]): T[];
export declare function asReadonlyArray<T>(arg: T | ReadonlyArray<T>): ReadonlyArray<T>;
export declare function isReadonlyArray(arg: unknown): arg is ReadonlyArray<unknown>;
export declare function noop<T>(obj: T): T;
export declare function compare(obj1: unknown, obj2: unknown): boolean;
