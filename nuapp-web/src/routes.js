import { lazy } from 'react'

const Dashboard = lazy(() => import('./modules/core/views/dashboard/Dashboard'))

const Billing = lazy(() => import('./modules/billing/views/Billing'))
const BillingsHistorical = lazy(() => import('./modules/billing/views/BillingsHistorical'))
const Items = lazy(() => import('./modules/billing/views/items/Items'))
const ItemCategories = lazy(() => import('./modules/billing/views/categories/Categories'))

const Listings = lazy(() => import('./modules/core/views/Listings'))
const DataLoader = lazy(() => import('./modules/billing/views/data-loader/DataLoader'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/billing', name: 'Facturación', element: Billing },
  { path: '/billings', name: 'Historial de facturas', element: BillingsHistorical },
  { path: '/items', name: 'Items', element: Items },
  { path: '/listings', name: 'Listings', element: Listings },
  { path: '/data-loader', name: 'Cargador de datos', element: DataLoader },
  { path: '/item-categories', name: 'Categorias de items', element: ItemCategories },
]

export default routes
