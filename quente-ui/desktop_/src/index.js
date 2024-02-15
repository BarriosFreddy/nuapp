import React from 'react'
import 'react-app-polyfill/stable'
//import 'core-js'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
 /*  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, */
  <div>TESTING</div>
)