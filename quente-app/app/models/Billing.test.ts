import { BillingModel } from "./Billing"

test("can be created", () => {
  const instance = BillingModel.create({})

  expect(instance).toBeTruthy()
})

