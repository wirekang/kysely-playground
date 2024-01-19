## Features

* Save
  
  Sync current state with url
  optional steps:
  * format before save
  * exclude version state before save
  * exclude view state before save
  * shorten link after save


## UI
```txt
-------------------------------------------------------
                         Header
-------------------------------------------------------
|                  |                   |              |
|                  |                   |              |
|                  |                   |              |
| Type Editor View | Query Editor View |  Result View |
|                  |                   |              |
|                  |                   |              |
|                  |                   |              |
|                  |                   |              |
-------------------------------------------------------
```

```txt
-------------------------------
            Header
-------------------------------

       Type Editor View

-------------------------------

       Query Editor View

-------------------------------

          Result View

-------------------------------
```

### Header
```txt
------------------------------------------------------------------------
[<version>] [<dialect>] [View] [Settings]                        [Github]
------------------------------------------------------------------------
```

version: dropdown. (`master(commitId)`, `0.27.2`, `0.27.1`,...)

dialect: dropdown. (`postgres`, `mysql` ...)

View: click to cycle view modes: (type-query-result -> query-result -> query)

Github: link to repository

Settings: click to toggle settings window:

```txt
------------------------------------------------------------------------
[<version>] [<dialect>] [View] [Settings]                        [Github]
------------------------------------------------------------------------
| prettier                          |
|  <prettier options>               |
|  ...                              |
| sql-formatter                     |
|   <sql formatter options>         |
|  ...                              |
|                                   |
-------------------------------------
```

#### In Iframe
```txt
------------------------------------------------------------------------
[<version>] [<dialect>] [View] [Settings]             [Open in a new tab icon]
------------------------------------------------------------------------
```


#### On small screen
```txt
-------------------------------------------
[<version>] [<dialect>] [View] [Github]
-------------------------------------------
```



## Type System

### Drop Global

#### Before
```ts
// playground internal type file
declare global {
  interface DB {}
  declare const kysely:Kysely<DB>
}
```

```ts
// schema editor
declare global {
  interface DB {
  // expand DB types
}
}
```

#### After

```ts
// type editor
export type DB = { // readonly line
  // declare table types
} // readonly line


// query editor
import { Kysely } from "kysely" // hidden line 
import type { DB } from "./type-editor" // hidden line
declare const kysely: Kysely<DB>  // hidden line
const db = kysely;

kysely.selectFrom(...)
```



