import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { api } from "../services/api";
import { Billing, BillingModel } from "./Billing";
import { withSetPropAction } from "./helpers/withSetPropAction";
import billingService from "../services/billing.service";

export const BillingStoreModel = types
  .model("BillingStore")
  .props({
    billings: types.array(BillingModel),
    billing: types.maybe(BillingModel),
    fetching: false,
    saving: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async saveBilling(billing: Billing) {
      store.setProp("saving", true);
      const response = await billingService.save(billing);
      if (response.ok) {
        store.setProp("billing", response.data);
      } else {
        console.error(`Error saving billing: ${JSON.stringify(response)}`);
      }
      store.setProp("saving", false);
      return response
    },
  }))
  .views((store) => ({}))
  .actions((store) => ({}));

export interface BillingStore extends Instance<typeof BillingStoreModel> {}
export interface BillingStoreSnapshot
  extends SnapshotOut<typeof BillingStoreModel> {}
