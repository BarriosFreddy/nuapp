import { BillingModel } from "../../src/models/Billing";

const data = {
  createdAt: {
    date: 1708001616045,
    offset: -18000000,
  },
  receivedAmount: 28000,
  billAmount: 28000,
  items: [
    {
      code: "1111",
      name: "X",
      price: 100000,
      units: 1,
      measurementUnit: "CAJA",
      multiplicity: 1,
    },
  ],
  creationDate: "2024-02-15",
  clientId: "65ac390a0276b80f5712a96c",
};
const billing = BillingModel.create(data);

test("Make sure that the price is the same", () => {
  expect(billing.billAmount).toBe(28000);
});
