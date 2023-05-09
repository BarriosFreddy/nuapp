import { lazy } from 'react'

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const Billing = lazy(() => import('./views/modules/billing/Billing'))
const BillingsHistorical = lazy(() => import('./views/modules/billing/BillingsHistorical'))
const Items = lazy(() => import('./views/modules/billing/items/Items'))
const Listings = lazy(() => import('./views/modules/settings/Listings'))
const Categories = lazy(() => import('./views/modules/settings/categories/Categories'))
const DataLoader = lazy(() => import('./views/modules/settings/data-loader/DataLoader'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/billing', name: 'Billing', element: Billing },
  { path: '/billings', name: 'BillingsHistorical', element: BillingsHistorical },
  { path: '/items', name: 'Items', element: Items },
  { path: '/listings', name: 'Listings', element: Listings },
  { path: '/data-loader', name: 'DataLoader', element: DataLoader },
  { path: '/categories', name: 'Categories', element: Categories },
]

export default routes
