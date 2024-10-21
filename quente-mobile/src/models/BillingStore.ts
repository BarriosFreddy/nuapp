import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { api } from "../services/api";
import { Billing, BillingModel } from "./Billing";
import { withSetPropAction } from "./helpers/withSetPropAction";
import billingService from "../services/billing.service";

const billingsByDateModel = types.model("BillingsPerDay").props({
  billAmount: 0,
  createdAt: "",
});

export const BillingStoreModel = types
  .model("BillingStore")
  .props({
    billings: types.array(BillingModel),
    billing: types.maybe(BillingModel),
    fetching: false,
    saving: false,
    billingsByDate: types.array(billingsByDateModel),
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
      return response;
    },
    async getBillingsByDate(date: string) {
      store.setProp("fetching", true);
      const response = await billingService.getBillingsByDate(date);
      if (response.ok) {
        store.setProp("billingsByDate", response.data);
      } else {
        console.error(`Error fetching billing: ${JSON.stringify(response)}`);
      }
      store.setProp("fetching", false);
      return response;
    },
    async getBillings() {
      store.setProp("fetching", true);
      const response = await billingService.getBillings();
      if (response.ok) {
        store.setProp("billings", response.data);
      } else {
        console.error(`Error fetching billing: ${JSON.stringify(response)}`);
      }
      store.setProp("fetching", false);
      return response;
    },
  }))
  .views((store) => ({}))
  .actions((store) => ({}));

export interface BillingStore extends Instance<typeof BillingStoreModel> {}
export interface BillingStoreSnapshot
  extends SnapshotOut<typeof BillingStoreModel> {}

const data = [
  {
    billAmount: 90700,
    createdAt: "2024-10-10",
  },
  {
    billAmount: 82700,
    createdAt: "2024-10-11",
  },
  {
    billAmount: 220200,
    createdAt: "2024-10-12",
  },
  {
    billAmount: 230100,
    createdAt: "2024-10-13",
  },
  {
    billAmount: 175300,
    createdAt: "2024-10-14",
  },
  {
    billAmount: 110600,
    createdAt: "2024-10-15",
  },
  {
    billAmount: 134700,
    createdAt: "2024-10-16",
  },
  {
    billAmount: 117200,
    createdAt: "2024-10-17",
  },
  {
    billAmount: 138000,
    createdAt: "2024-10-18",
  },
  {
    billAmount: 69600,
    createdAt: "2024-10-19",
  },
  {
    billAmount: 120800,
    createdAt: "2024-10-20",
  },
];
