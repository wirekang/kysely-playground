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

For advanced usage, you can set the result of `db.*.execute()` by setting `$playground.result`:

```ts
$playground.result = { rows: [{id:3},{id:4}] };
$playground.log(await db.selectFrom('person').select("id").execute())
// [{id:3},{id:4}]
```
[Playground Link](https://kyse.link/#cN4IgpgJglgLg9gJwM4gFyhgTwA5jSEAGhAEcBXMBTfAEmwBsBDTAcwTjIDsIA6BMJGXowABAF4RwEewDuSVCIDaUqBAUBmEQF9CkkaoUAWbQF1tAbgA6nOk1bsuvenBYAKRjMawREAEY8kMHowAGMYADF2AFtXSxBcZDhOOIBKAKDQmFiQVVSeMAAPULIYMFcUlKtOEB0QaEZgsPxsOCQYNgEiEABrTED6anQQLFx8GEYWLs5GKLxUEAAGHgAmAHYVmuIAC1UwABUcOZgECi0gA)


For more advanced usage, you can import esm module directly from url:  
```ts
// @ts-ignore
import isNumber from "https://esm.run/is-number@7.0.0/index.js"
```

[Playground Link](https://kyse.link/#cN4IgpgJglgLg9gJwM4gFyhgTwA5jSEAGhAEcBXMBTfAehoAIABGJAWigHMA7RMAHS5QAttkQx6UJADkyQgEaV6AMwRwh9PiAAWMGNiSo6YJEIB0CMlxqTWXWQoSMA7KYAMb61whgAHqYBWSJoA3AIAJNgANgCGmByqlhCmkXAcABSSMvKUaQDMAJSEEtL2OZrRmvn5oVwgAL7E0NGRYADGMPiiSDDxxkQgANaYSGCR1OggWLj4MNEc-VzRQnioIO4ATC7r9cRaUN4AKjgrMBZgdUA)



## API

You can embed the playground in your site. See [kysely.dev](https://kysely.dev/docs/examples/SELECT/a-single-column)

### URL Fragment

Set initial [State](https://github.com/wirekang/kysely-playground/tree/main/src/lib/state/state.ts) via url fragment.

```js
const state = {
  dialect: "postgres",
  editors: {
    type: "// type editor contents",
    query: "// query editor contents",
  },
}
const fragment = "r" + encodedURIComponent(JSON.stringify(state))
const url = "https://kyse.link" + fragment
```


### SearchParams

There are some extra flags mostly for iframe.
Note that when user opens a new tab by 'open-in-new-tab' button, all SearchParams are removed.

| key | value | description |
|--|--|--|
| open | any | show floating 'open-in-new-tab' button
| theme |  'light' \| 'dark'  | override theme
| nomore | any | hide 'More' button
| notheme | any | hide 'switch-theme' button
| nohotkey | any | disable all hotkeys


Example: `https://kyse.link?theme=dark&open=1&theme=dark`