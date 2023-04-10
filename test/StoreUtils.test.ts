import { StoreUtils } from "src/lib/store/StoreUtils"
import { expect, test } from "vitest"
import { StateConstants } from "src/lib/state/StateConstants"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

test("makeState", () => {
  expect(StoreUtils.makeShareableState({})).toStrictEqual(StateConstants.DEFAULT_SHAREABLE_STATE)
  expect(StoreUtils.makeShareableState({ dialect: "asdf" as any })).toStrictEqual(
    StateConstants.DEFAULT_SHAREABLE_STATE
  )
  expect(
    StoreUtils.makeShareableState({
      wrongValueAsKey: "",
    } as any)
  ).toStrictEqual(StateConstants.DEFAULT_SHAREABLE_STATE)
  expect(
    StoreUtils.makeShareableState({
      kyselyVersion: "0.42.1",
      dialect: "sqlite",
      ts: "\n\n\nQqqqqqqqqqqq\r\nj안녕하세요.\t",
    })
  ).toStrictEqual({
    kyselyVersion: "0.42.1",
    dialect: "sqlite",
    ts: "\n\n\nQqqqqqqqqqqq\r\nj안녕하세요.\t",
  })
})

test("associateProviders", () => {
  const providers = StoreUtils.associateProviders()
  Object.keys(StoreProviderId).forEach((key) => {
    const providerId = (StoreProviderId as any)[key]
    const provider = (providers as any)[providerId]
    expect(provider).toBeTypeOf("object")
    expect(provider.id).eq(providerId)
  })
})
