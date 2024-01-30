import React from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './scss/style.scss'
import { getInfoUser } from '@quente/common/modules/core/services/auth.service'
import Login from './views/pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'
import Page500 from './views/pages/page500/Page500'

const App = () => {
  const dispatch = useDispatch()
  dispatch(getInfoUser())

  const router = createHashRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <DefaultLayout />,
      errorElement: <Page500 />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
