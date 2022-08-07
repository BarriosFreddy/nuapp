import { configureStore } from '@reduxjs/toolkit'
/* import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers' */
import itemsReducer from '../features/items/itemsSlice'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  }
})
