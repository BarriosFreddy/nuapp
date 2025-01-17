import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { formatDate } from "../utils/formatDate";
import { translate } from "../i18n";

const ExpirationControlModel = types.model("ExpirationControl").props({
  lot: "",
  expirationDate: "",
  lotUnits: 0,
});

const PricesRatioModel = types.model("PricesRatio").props({
  measurementUnit: "",
  price: 0,
  cost: 0,
  hash: "",
  main: "",
  multiplicity: 0,
});

export const ItemModel = types
  .model("Item")
  .props({
    _id: "",
    code: "",
    name: "",
    description: "",
    laboratory: "",
    categoryId: "",
    reorderPoint: 0,
    pricesRatio: types.array(PricesRatioModel),
    expirationControl: types.array(ExpirationControlModel),
    sku: "",
  })
  .actions(withSetPropAction)
  .views((_) => ({}));

  export const ItemDTOModel = types
  .model("Item")
  .props({
    _id: "",
    code: "",
    name: "",
    price: "",
    data: "",
  })
  .actions(withSetPropAction)
  .views((_) => ({}));

export interface Item extends Instance<typeof ItemModel> {}
export interface PricesRatio extends Instance<typeof PricesRatioModel> {}
export interface ItemDTO extends Instance<typeof ItemDTOModel> {}
export interface ItemSnapshotOut extends SnapshotOut<typeof ItemModel> {}
export interface ItemSnapshotIn extends SnapshotIn<typeof ItemModel> {}
