import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

const DateModel = types
  .model("DateModel")
  .props({
    date: 0,
    offset: 0,
  })

  const ItemModel = types
  .model("ItemModel")
  .props({
    code:            "",
    name:            "",
    price:           0,
    units:           0,
    measurementUnit: "",
    multiplicity:    0,
  })

  export const BillingModel = types
  .model("Billing")
  .props({
    createdAt:      types.maybe(DateModel),
    receivedAmount: 0,
    billAmount:     0,
    items:          types.array(ItemModel),
    creationDate:   "",
    clientId:       "",
  })
  .actions(withSetPropAction)
  .views((_) => ({
  }))

export interface Billing extends Instance<typeof BillingModel> {}
export interface BillingSnapshotOut extends SnapshotOut<typeof BillingModel> {}
export interface BillingSnapshotIn extends SnapshotIn<typeof BillingModel> {}
