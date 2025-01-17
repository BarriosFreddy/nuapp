import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { EpisodeStoreModel } from "./EpisodeStore"
import { ItemStoreModel } from "./ItemStore"
import { MeasurementUnitStoreModel } from "./inv-enumeration/MeasurementUnitStore"
import { BillingStoreModel } from "./BillingStore"
import { UserAccountModel } from "./UserAccontStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  itemStore: types.optional(ItemStoreModel, {}),
  measurementUnitStore: types.optional(MeasurementUnitStoreModel, {}),
  billingStore: types.optional(BillingStoreModel, {}),
  userAccountStore: types.optional(UserAccountModel, {}),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
