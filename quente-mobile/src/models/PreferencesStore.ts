import {Instance, SnapshotOut, types} from 'mobx-state-tree';

export const PreferencesStoreModel = types
  .model('PreferencesStore')
  .props({
    mode: types.maybe(types.string),
  })
  .views(store => ({}))
  .actions(store => ({
    setMode(value?: string) {
      store.mode = value;
    },
  }));

export interface PreferencesStore
  extends Instance<typeof PreferencesStoreModel> {}
export interface PreferencesStoreSnapshot
  extends SnapshotOut<typeof PreferencesStoreModel> {}
