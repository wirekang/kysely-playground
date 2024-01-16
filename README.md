# [Kysely Playground](https://kyse.link/)

| branch  | url                               |
|---------|-----------------------------------|
| main    | https://kyse.link                 |

Playground for [Kysely](https://github.com/kysely-org/kysely).

Provides vscode-like experiences including type checking and auto suggestions.  
Supports built-in dialects(postgres, mysql, sqlite), last 20 kysely versions.

You can test stuffs quickly, create issues with reproducing with playground.

## Guide

The playground has 3 editor: `schema`, `query` and `sql`.

Schema editor is the leftmost editor(in wide-enough screen).  
You can declare global scope interface `DB` to help checking types related database schema. 

You can hide the editor by clicking `Schema` checkbox on header of playground.  
If you want to let people focus on building query not schema, hide the schema editor before share.  
The visibility of schema editor will be shared together.  
(Type checking for schema still works even though it is hidden.)

If you want to disable the type checking for schema,
check out
[the example](https://kyse.link/?p=b&i=haFkqHBvc3RncmVzoXamMC4yNC4yoXPZSmRlY2xhcmUgZ2xvYmFsIHsKICBpbnRlcmZhY2UgREIgewogICAgW2tleTogc3RyaW5nXTogYW55CiAgfQp9CgpleHBvcnQge30KoXHZK2t5c2VseQogIC5zZWxlY3RGcm9tKCJhc2RmIikKICAuc2VsZWN0QWxsKCmhY8M=).

To
prevent [2669 error](https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul),
you should specify `export {}` if you import nothing in schema editor.

The editor in the middle is the query editor.

These are pre-defined variables you can use without import:

| variable | description                                             |
|----------|---------------------------------------------------------|
| `kysely` | an Kysely instance with DB interface from schema editor |
| `db`     | alias for kysely                                        |

You can see the generated sql in the rightmost sql editor.  
By default, the playground will show you the generated sql string as-is(with parameter placeholders).  
You can generate sql with hard-coded parameter by turning on `More Options` -> `SQL Format` -> `inlineParameters`.  
It is useful when you copy-paste the sql into database cli or DataGrip.  
