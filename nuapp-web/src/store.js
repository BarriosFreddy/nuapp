import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './app.slice'
import { ApiService } from './ApiService'
import billingReducer from './modules/billing/reducers/billings.reducer'
import itemsReducer from './modules/billing/reducers/items.reducer'
import itemCategoriesReducer from './modules/billing/reducers/item-categories.reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedAppReducer = persistReducer(persistConfig, appReducer)
const persistedBillingReducer = persistReducer(persistConfig, billingReducer)
const persistedItemsReducer = persistReducer(persistConfig, itemsReducer)

// To use with combineReducers for several reducers
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  //devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    app: persistedAppReducer,
    billing: persistedBillingReducer,
    items: persistedItemsReducer,
    itemCategories: itemCategoriesReducer,
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
