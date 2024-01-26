# [Kysely Playground](https://kyse.link/)

| branch  | url                               |
|---------|-----------------------------------|
| main    | https://kyse.link                 |

Playground for [Kysely](https://github.com/kysely-org/kysely).

REWRITING


TODO
 * main should not know about "playground" event.  
    Executer should handle "playground" window.  
    Executer.execute() returns array of events with its own type.  
    Executer should catch the error during `dynamicImport` and return as its own type.

 * TypescriptUtils.format -> Formatter  
    Formatter = format codes regardless of language(sql,ts).  
    Formatter has its own mutable state.  
    main will mutate the state by "settings" feature.

 * hide header lines

 * embeded detecting  
     open-in-new-window button
    
 * tests

## API

`<url>` = `https://kyse.link`

### Set states

`<url>#r<encoded>`

`<encoded>` = `encodeURIComponent(JSON.strinify(<state>))`


`<state>` = [Type Definition](https://github.com/wirekang/kysely-playground/tree/main/src/lib/state/state.ts)

Example:

`https://kyse.link#r%7Beditors%3A%7Btype%3A%22%22%2Cquery%3A%22%22%7D%7D`

### Override theme

`<url>?theme=light`

`<url>?theme=right`
