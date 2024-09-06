import {Instance, SnapshotOut, types} from 'mobx-state-tree';

export const GlobalStateModel = types
  .model('GlobalStateStore')
  .props({
    headerShown: true,
  })
  .views(store => ({}))
  .actions(store => ({
    setHeaderShown(value: boolean) {
      store.headerShown = value;
    },
  }));

export interface GlobalState
  extends Instance<typeof GlobalStateModel> {}
export interface GlobalStateSnapshot
  extends SnapshotOut<typeof GlobalStateModel> {}
