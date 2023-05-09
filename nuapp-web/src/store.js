import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app.slice'
import { ApiService } from './ApiService'
import billingReducer from './modules/billing/reducers/billings.reducer'
import itemsReducer from './modules/billing/reducers/items.reducer'
import itemCategoriesReducer from './modules/billing/reducers/item-categories.reducer'

export default configureStore({
  reducer: {
    app: appReducer,
    billing: billingReducer,
    items: itemsReducer,
    itemCategories: itemCategoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: ApiService,
      },
    }),
})
