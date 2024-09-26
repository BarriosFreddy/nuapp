import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {AuthenticationStoreModel} from './AuthenticationStore';
import {EpisodeStoreModel} from './EpisodeStore';
import {PreferencesStoreModel} from './PreferencesStore';
import ViewMode from '../shared/enums/ViewMode';
import { GlobalStateModel } from './GlobalStateStore';
import { UserAccountModel } from './UserAccontStore';
import { ItemStoreModel } from './ItemStore';
import { BillingStoreModel } from './BillingStore';
import { MeasurementUnitStoreModel } from './inventory/inv-enumeration/MeasurementUnitStore';


/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  preferencesStore: types.optional(PreferencesStoreModel, { mode: ViewMode.PASSENGER}),
  globalState: types.optional(GlobalStateModel, {}),
  userAccountStore: types.optional(UserAccountModel, {}),
  itemStore: types.optional(ItemStoreModel, {}),
  billingStore: types.optional(BillingStoreModel, {}),
  measurementUnitStore: types.optional(MeasurementUnitStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
