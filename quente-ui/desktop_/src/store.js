import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ApiService } from './ApiService'
import appReducer from './app.slice'
import authReducer from './modules/core/reducers/auth.reducer'
import billingReducer from './modules/billing/reducers/billings.reducer'
import clientsReducer from '@quente/common/modules/client/reducers/clients.reducer'
import itemsReducer from '@quente/common/modules/inventory/reducers/items.reducer'
/* 
import itemCategoriesReducer from '@quente/common/modules/inventory/reducers/item-categories.reducer'
import kardexesReducer from '@quente/common/modules/inventory/reducers/kardexes.reducer'
import purchaseOrdersReducer from '@quente/common/modules/inventory/reducers/purchase-orders.reducer'
import invEnumerationsReducer from '@quente/common/modules/inventory/reducers/inv-enumerations.reducer'
 */
const persistedAuthReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['isLoggedIn', 'infoUser'],
  },
  authReducer,
)
const persistedBillingReducer = persistReducer(
  {
    key: 'billings',
    storage,
    whitelist: ['offline'],
  },
  billingReducer,
)
const persistedItemsReducer = persistReducer(
  {
    key: 'items',
    storage,
    whitelist: ['offline'],
  },
  itemsReducer,
)

// To use with combineReducers for several reducers
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  //devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    app: appReducer,
    auth: persistedAuthReducer,
    billing: persistedBillingReducer,
    items: persistedItemsReducer,
    clients: clientsReducer, 
    /*  
    itemCategories: itemCategoriesReducer,
    kardexes: kardexesReducer,
    purchaseOrders: purchaseOrdersReducer,
    invEnumerations: invEnumerationsReducer,
    */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: ApiService,
      },
    }),
})

export default store

export const persistor = persistStore(store)
