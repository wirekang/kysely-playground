# [Kysely Playground](https://kyse.link/)


Playground for [Kysely](https://github.com/kysely-org/kysely),
with vscode-like experiences including type checking and auto suggestions.
Supports built-in dialects, various versions and unrealeased branches.

## Guide

There are three panels in playground. From left to right, `type-editor`, `query-editor` and `result`.

In `type-editor` you can declare any kind of typescript types.
For Kysely's type-safety and autocompletion to work, `Database` type must be declared with `export`.
If you don't familiar with Kysely, checkout [the official guide](https://kysely.dev/docs/getting-started#types) for more information about database types.

In `query-editor` you can write the query.
`db` is pre-defined Kysely instance with `Database` type from `type-editor`.
You can import any other types from `type-editor`: `import {..} from "type-editor"`. 
Result of executions will be displayed in `result`.

For advanced usage, you can import esm module directly from url:  
```ts
// @ts-ignore
import isNumber from "https://esm.run/is-number@7.0.0/index.js"
```



## API

### Set states

`<origin>#r<encoded>`

`<encoded>` = `encodeURIComponent(JSON.strinify(<state>))`


`<state>` = [Type Definition](https://github.com/wirekang/kysely-playground/tree/main/src/lib/state/state.ts)

Example: `https://kyse.link#r%7Beditors%3A%7Btype%3A%22%22%2Cquery%3A%22%22%7D%7D`

### Override theme

`<origin>?theme=light`

`<origin>?theme=dark`
