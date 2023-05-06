import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Billing = React.lazy(() => import('./views/modules/billing/Billing'))
const BillingsHistorical = React.lazy(() => import('./views/modules/billing/BillingsHistorical'))
const Items = React.lazy(() => import('./views/modules/billing/items/Items'))
const Listings = React.lazy(() => import('./views/modules/settings/Listings'))
const Categories = React.lazy(() => import('./views/modules/settings/categories/Categories'))
const DataLoader = React.lazy(() => import('./views/modules/settings/data-loader/DataLoader'))

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
