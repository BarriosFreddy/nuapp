import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "../../helpers/withSetPropAction";

const ValueModel = types.model("ValueModel").props({
  label: "",
  code: "",
});

export const InvEnumerationModel = types
  .model("InvEnumeration")
  .props({
    _id: "",
    createdAt: "",
    name: "",
    description: "",
    updatedAt: "",
    code: "",
    values: types.array(ValueModel),
  })
  .actions(withSetPropAction)
  .views((_) => ({}));

export interface InvEnumeration extends Instance<typeof InvEnumerationModel> {}
export interface InvEnumerationSnapshotOut
  extends SnapshotOut<typeof InvEnumerationModel> {}
export interface InvEnumerationSnapshotIn
  extends SnapshotIn<typeof InvEnumerationModel> {}
