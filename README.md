# [kysely-playground](https://kyse.link)

Playground for [Kysely](https://github.com/kysely-org/kysely).

| branch       | url                               |
|--------------|-----------------------------------|
| main(stable) | https://kyse.link                 |
| preview      | https://kysely-playground.web.app |

## Provides

1. Vscode-like experiences including type checking and auto suggestions.
2. Various versions of kysely (recent 20 versions).
3. Major dialects (postgres, mysql, sqlite).

## Purposes

1. Test stuffs quickly.
2. Create examples for issues, PR and Discord.


## Guide

 The playground has 3 editor: `schema`, `query` and `sql`.  

 Schema editor is the leftmost editor(in wide-enough screen).  
You can define `DB` interface to help checking types related database schema.  
You can import `type`s from `kysely`. (e.g. `import { Generated } from "kysely"` )  

You can hide the editor by clicking `Schema` checkbox on header of playground.  
If you want to let reader focus on building query not schema, hide the schema editor before share.  
The visibility of schema editor will be shared.  
(Type checking for schema still works even though it is hidden.)  

If you want to disable the type checking for schema, check out the [example](https://kyse.link/?p=b&i=haFkqHBvc3RncmVzoXamMC4yNC4yoXPZSmRlY2xhcmUgZ2xvYmFsIHsKICBpbnRlcmZhY2UgREIgewogICAgW2tleTogc3RyaW5nXTogYW55CiAgfQp9CgpleHBvcnQge30KoXHZK2t5c2VseQogIC5zZWxlY3RGcm9tKCJhc2RmIikKICAuc2VsZWN0QWxsKCmhY8M=).  
To prevent [2669 error](https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul),
you should specify `export {}` if you import nothing in schema editor.  

 The editor in the middle is the query editor.  
For now, you can't import a non-type thing. If you need something to be pre-defined, please issue it.  
These are pre-defined variables you can use to build query:  

`sql`: `import {sql} from "kysely"`  
`db`, `kysely`: an Kysely instance.  
`result`: just for backward-compatibility.  


 There are two ways to generate sql.

1. Normal way: call `kysely.execute*()`. [Playground Link](https://kyse.link/?p=b&i=haFkqHBvc3RncmVzoXamMC4yNC4yoXPZ6mltcG9ydCB7IEdlbmVyYXRlZCB9IGZyb20gJ2t5c2VseScKCmRlY2xhcmUgZ2xvYmFsIHsKICBpbnRlcmZhY2UgREIgewogICAgdXNlcjogVXNlclRhYmxlCiAgfQoKICBpbnRlcmZhY2UgVXNlclRhYmxlIHsKICAgIGlkOiBHZW5lcmF0ZWQ8c3RyaW5nPgogICAgZmlyc3RfbmFtZTogc3RyaW5nIHwgbnVsbAogICAgbGFzdF9uYW1lOiBzdHJpbmcKICAgIGNyZWF0ZWRfYXQ6IEdlbmVyYXRlZDxEYXRlPgogIH0KfaFx2X1jb25zdCByb3dzID0gYXdhaXQga3lzZWx5CiAgLnNlbGVjdEZyb20oInVzZXIiKQogIC5zZWxlY3QoWyJmaXJzdF9uYW1lIiwgImxhc3RfbmFtZSJdKQogIC53aGVyZSgiaWQiLCAiPSIsICIxIikKICAuZXhlY3V0ZSgpCqFjww==)  
2. Simple way: write expression in query editor. [Playground Link](https://kyse.link/?p=b&i=haFkqHBvc3RncmVzoXamMC4yNC4yoXPZSmRlY2xhcmUgZ2xvYmFsIHsKICBpbnRlcmZhY2UgREIgewogICAgW2tleTogc3RyaW5nXTogYW55CiAgfQp9CgpleHBvcnQge30KoXHZK2t5c2VseQogIC5zZWxlY3RGcm9tKCJhc2RmIikKICAuc2VsZWN0QWxsKCmhY8M=)  


 You can see the generated sql in the rightmost sql editor.  
By default, the playground will show you the generated sql string as-is(with parameter placeholders).  
You can generate sql with hard-coded parameter by turning on `More Options` -> `SQL Format` -> `inlineParameters`.  
It is useful when you copy-paste the sql into database cli or DataGrip.  
