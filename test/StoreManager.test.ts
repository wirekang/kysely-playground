import { expect, test } from "vitest"
import { StoreManager } from "src/lib/store/StoreManager"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { State } from "src/lib/state/types/State"

const storeManager = new StoreManager()

type LoadSamples = { state: State; value: string }[]
const BASE64_LOAD: LoadSamples = [
  {
    value:
      "eyJlbmFibGVTY2hlbWEiOnRydWUsImRpYWxlY3QiOiJwb3N0Z3JlcyIsImt5c2VseVZlcnNpb24iOiIwLjIzLjAiLCJ0cyI6InJlc3VsdCA9IGt5c2VseVxuICAuc2VsZWN0RnJvbShcInBlcnNvblwiKVxuICAuc2VsZWN0KFtcImZpcnN0X25hbWVcIiwgXCJsYXN0X25hbWVcIl0pXG4gIC53aGVyZShcImlkXCIsIFwiPlwiLCAyMzQpIn0=",
    state: {
      dialect: "postgres",
      kyselyVersion: "0.23.0",
      ts:
        "result = kysely\n" +
        '  .selectFrom("person")\n' +
        '  .select(["first_name", "last_name"])\n' +
        '  .where("id", ">", 234)',
    },
  },
  {
    value:
      "eyJlbmFibGVTY2hlbWEiOnRydWUsImRpYWxlY3QiOiJteXNxbCIsImt5c2VseVZlcnNpb24iOiIwLjI0LjAiLCJ0cyI6ImltcG9ydCB7IEV4cHJlc3Npb25CdWlsZGVyIH0gZnJvbSAna3lzZWx5J1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBEQiB7XG4gICAgdXNlcjogVXNlclxuICB9XG59XG5cbmludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IHN0cmluZ1xuICBmaXJzdF9uYW1lOiBzdHJpbmcgfCBudWxsXG4gIGxhc3RfbmFtZTogc3RyaW5nXG59XG5cbnJlc3VsdCA9IGt5c2VseVxuICAuc2VsZWN0RnJvbSgndXNlcicpXG4gIC5zZWxlY3QoWydmaXJzdF9uYW1lJywgJ2xhc3RfbmFtZSddKVxuICAud2hlcmUoc2VsZWN0TmFtZXMpXG5cbmZ1bmN0aW9uIHNlbGVjdE5hbWVzKHsgYW5kLCBjbXByIH06IEV4cHJlc3Npb25CdWlsZGVyPERCLCAndXNlcic+KSB7XG4gIHJldHVybiBhbmQoW1xuICAgIGNtcHIoJ2ZpcnN0X25hbWUnLCAnPScsICdmb28nKSxcbiAgICBjbXByKCdsYXN0X25hbWUnLCAnPScsICdiYXInKSxcbiAgXSlcbn0ifQ==",
    state: {
      dialect: "mysql",
      kyselyVersion: "0.24.0",
      ts:
        "import { ExpressionBuilder } from 'kysely'\n" +
        "\n" +
        "declare global {\n" +
        "  interface DB {\n" +
        "    user: User\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "interface User {\n" +
        "  id: string\n" +
        "  first_name: string | null\n" +
        "  last_name: string\n" +
        "}\n" +
        "\n" +
        "result = kysely\n" +
        "  .selectFrom('user')\n" +
        "  .select(['first_name', 'last_name'])\n" +
        "  .where(selectNames)\n" +
        "\n" +
        "function selectNames({ and, cmpr }: ExpressionBuilder<DB, 'user'>) {\n" +
        "  return and([\n" +
        "    cmpr('first_name', '=', 'foo'),\n" +
        "    cmpr('last_name', '=', 'bar'),\n" +
        "  ])\n" +
        "}",
    },
  },
]

const LEGACY_FIREBASE_LOAD: LoadSamples = [
  {
    value: "-NLp3n_P5fyeQKMQda8n",
    state: {
      ts:
        "interface DB {\n" +
        "  user: UserTable\n" +
        "}\n" +
        "\n" +
        "interface UserTable {\n" +
        "  id: Generated<string>\n" +
        "  first_name: string | null\n" +
        "  last_name: string | null\n" +
        "  created_at: Generated<Date>\n" +
        "}\n" +
        "\n" +
        "result = kysely\n" +
        '  .selectFrom("user")\n' +
        "  .selectAll()\n" +
        '  .orderBy("created_at")',
      kyselyVersion: "0.23.3",
      dialect: "mysql",
    },
  },
]

test("load Base64", testLoads(StoreProviderId.Base64, BASE64_LOAD))
test("load LegacyFirebase", testLoads(StoreProviderId.LegacyFirebase, LEGACY_FIREBASE_LOAD))

function testLoads(providerId: StoreProviderId, loads: LoadSamples) {
  return async () => {
    const pairs = await Promise.all(
      loads.map(async (d) => {
        return [await storeManager.load(providerId, d.value), d.state]
      })
    )
    pairs.forEach((pair) => {
      expect(pair[0]).toStrictEqual(pair[1])
    })
  }
}

const BIDIRECTIONAL: State[] = [
  {
    dialect: "sqlite",
    kyselyVersion: "0.23.0",
    ts:
      "interface DB {\n" +
      "  user: UserTable\n" +
      "}\n" +
      "\n" +
      "interface UserTable {\n" +
      "  id: Generated<string>\n" +
      "  first_name: string | null\n" +
      "  last_name: string | null\n" +
      "  created_at: Generated<Date>\n" +
      "}\n" +
      "\n" +
      "result = kysely\n" +
      '  .selectFrom("user")\n' +
      "  .selectAll()\n" +
      '  .orderBy("created_at") 안녕하세요. \t\r\n ☑️☑️☑️',
  },
]

function testBi(providerId: StoreProviderId) {
  return async () => {
    await Promise.all(
      BIDIRECTIONAL.map(async (input) => {
        const id = await storeManager.save(providerId, input)
        const output = await storeManager.load(providerId, id)
        expect(input).toStrictEqual(output)
      })
    )
  }
}

test("MsgPackBase64 save->load", testBi(StoreProviderId.MsgPackBase64))
test("MsgPackFirestore save->load", testBi(StoreProviderId.MsgPackFirestore))
