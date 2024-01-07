import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChartLine,
  cilDollar,
  cilHistory,
  cilHome,
  cilInbox,
  cilMenu,
  cilSitemap,
} from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { setSidebarShow } from './../app.slice'
import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.app.sidebarShow)
  const { organization } = useSelector((state) => state.auth.infoUser) ?? {}

  return (
    <CHeader position="sticky" className="mb-1">
      <CContainer>
        {/* <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderBrand to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          {organization?.name}
        </CHeaderBrand>
        <CHeaderNav>
          <CNavLink to="/home" component={NavLink}>
            <CIcon icon={cilHome} /> Home
          </CNavLink>
          <CNavLink to="/billing" component={NavLink}>
            <CIcon icon={cilDollar} /> Facturación
          </CNavLink>
          <CNavLink to="/billings" component={NavLink}>
            <CIcon icon={cilHistory} /> Historial
          </CNavLink>
          <CNavLink to="/billing-dashboard" component={NavLink}>
            <CIcon icon={cilChartLine} /> Dashboard
          </CNavLink>
          <CNavLink to="/inventory-items" component={NavLink}>
            <CIcon icon={cilInbox} /> Inventario
          </CNavLink>
          <CNavLink to="/inventory-item-categories" component={NavLink}>
            <CIcon icon={cilSitemap} /> Cat. de items
          </CNavLink>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider />
          <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
