import { atom } from "recoil"

export const typescriptQueryState = atom({
  key: "typescriptQuery",
  default:
    "const rows = await kysely\n" +
    '  .selectFrom("user")\n' +
    '  .select(["first_name", "last_name"])\n' +
    '  .where("id", "=", "1")\n' +
    "  .execute()\n",
})
