import { atom } from "recoil"

export const typescriptQueryState = atom({
  key: "typescriptQuery",
  default:
    "const rows = await kysely\n" + '  .selectFrom("user")\n' + '  .select(["id", "last_name"])\n' + "  .execute()\n",
})
