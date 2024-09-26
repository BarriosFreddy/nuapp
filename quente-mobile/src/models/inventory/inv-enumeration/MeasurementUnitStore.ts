import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "../../helpers/withSetPropAction";
import { InvEnumeration, InvEnumerationModel } from "./InvEnumeration";
import invEnumerationService from "../../../services/invEnumeration.service";

const CODE_UDM = "UDM";

export const MeasurementUnitStoreModel = types
  .model("MeasurementUnitStore")
  .props({
    measurementUnits: types.maybe(InvEnumerationModel),
    fetching: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async findAll() {
      store.setProp("fetching", true);
      const response = await invEnumerationService.findByCode(CODE_UDM);
      if (response.ok) {
        store.setProp("measurementUnits", response.data);
      } else {
        console.error(`Error fetching : ${JSON.stringify(response)}`);
      }
      store.setProp("fetching", false);
      return response;
    },
  }))
  .views((store) => ({
    get measurementUnitsFormatted() {
      return store.measurementUnits
        ? store.measurementUnits.values?.map(({ label, code }) => ({
            title: label,
            value: code,
          }))
        : [];
    },
  }))
  .actions((store) => ({}));

export interface MeasurementUnitStore
  extends Instance<typeof MeasurementUnitStoreModel> {}
export interface MeasurementUnitStoreSnapshot
  extends SnapshotOut<typeof MeasurementUnitStoreModel> {}
