import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app.slice'
import { ApiService } from './ApiService'

export default configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: ApiService,
      },
    }),
})
