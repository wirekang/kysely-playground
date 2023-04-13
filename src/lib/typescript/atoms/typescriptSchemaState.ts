import { atom } from "recoil"

export const typescriptSchemaState = atom({
  key: "typescriptSchema",
  default:
    "import { Generated } from 'kysely'\n" +
    "\n" +
    "declare global {\n" +
    "  interface DB {\n" +
    "    user: UserTable\n" +
    "  }\n" +
    "\n" +
    "  interface UserTable {\n" +
    "    id: Generated<string>\n" +
    "    first_name: string | null\n" +
    "    last_name: string\n" +
    "    created_at: Generated<Date>\n" +
    "  }\n" +
    "}",
})
