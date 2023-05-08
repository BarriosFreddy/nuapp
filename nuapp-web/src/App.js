import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './scss/style.scss'
import axios from 'axios'
import { CSpinner } from '@coreui/react'
import { setInfoUser, setIsLoggedIn } from './app.slice'

/* const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
) */

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
//const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      try {
        const { data, status } = await axios({
          url: `http://localhost:3001/auth/info-user`,
          method: 'GET',
          withCredentials: true,
        })
        if (status === 403) return false
        dispatch(setIsLoggedIn(!!data))
        dispatch(setInfoUser(data))
      } catch (e) {}
    })()
  })

  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <React.Suspense fallback={<CSpinner color="primary" />}>
          <Login />
        </React.Suspense>
      ),
    },
    {
      path: '/register',
      element: (
        <React.Suspense fallback={<CSpinner color="primary" />}>
          <Register />
        </React.Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <React.Suspense fallback={<CSpinner color="primary" />}>
          <DefaultLayout />
        </React.Suspense>
      ),
      errorElement: <Page500 />,
      /*     children: [{ path: 'dashboard', name: 'Dashboard', element: <Dashboard /> }], */
    },
  ])

  return <RouterProvider router={router} />
}

export default App
