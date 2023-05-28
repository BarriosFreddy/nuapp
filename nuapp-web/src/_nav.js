import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilPuzzle,
  cilSpeedometer,
  cilDollar,
  cilHome,
  cilMoney,
  cilChartLine,
  cilHistory,
  cilSquare,
  cilSitemap,
  cilCloudUpload,
  cilSync,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

let _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    roles: ['ADMIN', 'SELLER'],
  },
  {
    component: CNavGroup,
    name: 'Punto de venta',
    to: '/billing',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    roles: ['ADMIN', 'SELLER'],
    items: [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/billing/dashboard',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
        roles: ['ADMIN'],
      },
      {
        component: CNavItem,
        name: 'Facturación',
        to: '/billing',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
        roles: ['ADMIN', 'SELLER'],
      },
      {
        component: CNavItem,
        name: 'Historial de facturas',
        to: '/billings',
        icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
        roles: ['ADMIN', 'SELLER'],
      },
      {
        component: CNavItem,
        name: 'Items',
        to: '/billing/items',
        icon: <CIcon icon={cilSquare} customClassName="nav-icon" />,
        roles: ['ADMIN'],
      },
      {
        component: CNavItem,
        name: 'Categorias de items',
        to: '/billing/item-categories',
        icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
        roles: ['ADMIN'],
      },
      {
        component: CNavItem,
        name: 'Migrador de datos',
        to: '/billing/data-loader',
        icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
        roles: ['ADMIN'],
      },
      {
        component: CNavItem,
        name: 'Sincronizador',
        to: '/billing/synchronizer',
        icon: <CIcon icon={cilSync} customClassName="nav-icon" />,
        roles: ['ADMIN'],
      },
    ],
  },
]

if (process.env.NODE_ENV === 'development') {
  _nav = _nav.concat([
    {
      component: CNavItem,
      name: 'Docs',
      href: 'https://coreui.io/react/docs/templates/installation/',
      icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
  ])
}

export default _nav
