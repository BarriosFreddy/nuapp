import { lazy } from 'react'

const Home = lazy(() => import('./modules/core/views/home/Home'))

const Dashboard = lazy(() => import('./modules/billing/views/dashboard/Dashboard'))
const Billing = lazy(() => import('./modules/billing/views/Billing'))
const BillingsHistorical = lazy(() => import('./modules/billing/views/BillingsHistorical'))
const Items = lazy(() => import('./modules/billing/views/items/Items'))
const ItemCategories = lazy(() => import('./modules/billing/views/item-categories/ItemCategories'))

const DataLoader = lazy(() => import('./modules/billing/views/data-loader/DataLoader'))
const Synchronizer = lazy(() => import('./modules/core/views/synchronizer/Synchronizer'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', element: Home },
  { path: '/billing', name: 'Facturación', element: Billing },
  { path: '/billings', name: 'Historial de facturas', element: BillingsHistorical },
  { path: '/billing-dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/billing-items', name: 'Items', element: Items },
  { path: '/billing-data-loader', name: 'Cargador de datos', element: DataLoader },
  { path: '/billing-item-categories', name: 'Categorias de items', element: ItemCategories },
  { path: '/billing-synchronizer', name: 'Sinchronizer', element: Synchronizer },
]

export default routes
