import React from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './scss/style.scss'
import { getInfoUser } from './modules/core/services/auth.service'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
//const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()
  dispatch(getInfoUser())

  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <React.Suspense fallback={loading}>
          <Login />
        </React.Suspense>
      ),
    },
    {
      path: '/register',
      element: (
        <React.Suspense fallback={loading}>
          <Register />
        </React.Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <React.Suspense fallback={loading}>
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