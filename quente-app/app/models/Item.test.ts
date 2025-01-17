import { ItemModel } from "./Item"

test("can be created", () => {
  const instance = ItemModel.create({})

  expect(instance).toBeTruthy()
})

