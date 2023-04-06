# [Kysely Playground](https://wirekang.github.io/kysely-playground)

Playground for [Kysely](https://github.com/koskimas/kysely).  
You can test how kysely builds sql query, with type hinting, in a various version.

## Pre-defined types and variables

### ```result: Compilable<any>```

Playground calls `result.compile()` and show its result.  
You should set `result` if you want to show generated sql.
```ts
result = kysely.selectFrom('user').selectAll()
```

### ```interface DB{}```

Database schema for `kysely` and `db`.

It is empty by default, so type errors are occurred when you type table name or column name.  
If you want to hide the errors, uncheck the `schema` checkbox.

You can re-defined `DB` via [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
Checkout [Declare Db Schema](#declaring-schema) for more information.

### ```kysely: Kysely<DB>```, ```db: Kysely<DB>```

[Kysely](https://koskimas.github.io/kysely/classes/Kysely.html) instance.

### ```sql: Sql```
  [Sql](https://kysely-org.github.io/kysely/interfaces/Sql.html) instance.

### ```type Generated<T>```
### ```type ColumnType<Select,Insert,Update>```

## Declaring schema

### Disable

If you don't want to show type errors in string literal, uncheck `schema` checkbox.  
It will make `interface DB` to any, so type checking for schema will be disabled.

### Without `import`

If you don't use `import` statement, you can declare `DB` in normal way.
```ts
interface DB {
    user: {}
}

result = kysely.selectFrom('user').selectAll()
```

### With `import`

If you want to use `import` statement, you should wrap your `DB` with `declare global`
```ts
import { foo } from 'bar';

declare global {
    interface DB {
        user: {}
    }
}

// do something with foo

result = kysely.selectFrom('user').selectAll()

```
