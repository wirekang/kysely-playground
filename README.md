# [Kysely Playground](https://wirekang.github.io/kysely-playground)

Playground for [Kysely](https://github.com/koskimas/kysely). You can test how kysely builds sql query, with full-typescript supports, in a various version.

## Guide

There are some pre-defined global variables/types. You can not import another variable or type for now. If you want another type or variables to include, please issue it.

### ```let result: Compilable<any>```

Playground calls `result.compile()` and show its result. You should always set `result`.

### ```interface DB{}```

Database schema for `kysely` and `db`.
It is empty by default, so type errors are occurred when you type table name or column name.([example](https://wirekang.github.io/kysely-playground/#eyJkaWFsZWN0IjoibXlzcWwiLCJ0cyI6InJlc3VsdCA9IGt5c2VseS5zZWxlY3RGcm9tKFwiVGFibGVcIikuc2VsZWN0KFtcImMxXCIsIFwiYzJcIl0pXG4ifQ==))
You can re-defined `DB` via [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
If you want to hide the type errors, [make DB any](https://wirekang.github.io/kysely-playground/#eyJkaWFsZWN0IjoibXlzcWwiLCJ0cyI6ImludGVyZmFjZSBEQiB7XG4gIFt4OiBzdHJpbmddOiBhbnlcbn1cblxucmVzdWx0ID0ga3lzZWx5XG4gIC5zZWxlY3RGcm9tKFwicGVyc29uXCIpXG4gIC5zZWxlY3QoW1wiZmlyc3RfbmFtZVwiLCBcImxhc3RfbmFtZVwiXSlcbiAgLndoZXJlKFwiaWRcIiwgXCI+XCIsIDIzNClcbiJ9)

### ```const kysely: Kysely<DB>```

[Kysely](https://koskimas.github.io/kysely/classes/Kysely.html) instance.

### ```const db: Kysely<DB>```

Alias of `kysely`



### ```const sql```
  [Sql](https://kysely-org.github.io/kysely/interfaces/Sql.html) instance.

### ```type Generated<T>```
### ```type ColumnType<Select,Insert,Update>```
