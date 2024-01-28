# [Kysely Playground](https://kyse.link/)

| branch  | url                               |
|---------|-----------------------------------|
| main    | https://kyse.link                 |

Playground for [Kysely](https://github.com/kysely-org/kysely).

REWRITING


TODO
 * TypescriptUtils.format -> Formatter  
    Formatter = format codes regardless of language(sql,ts).  
    Formatter has its own mutable state.  
    main will mutate the state by "settings" feature.

 * embeded detecting  
     open-in-new-window button
    
 * mobile read-only
 
 * tests

## API

### Set states

`<origin>#r<encoded>`

`<encoded>` = `encodeURIComponent(JSON.strinify(<state>))`


`<state>` = [Type Definition](https://github.com/wirekang/kysely-playground/tree/main/src/lib/state/state.ts)

Example: `https://kyse.link#r%7Beditors%3A%7Btype%3A%22%22%2Cquery%3A%22%22%7D%7D`

### Override theme

`<origin>?theme=light`

`<origin>?theme=dark`
