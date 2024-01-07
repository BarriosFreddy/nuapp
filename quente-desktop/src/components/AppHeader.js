import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { setSidebarShow } from './../app.slice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.app.sidebarShow)
  const { organization } = useSelector((state) => state.auth.infoUser) ?? {}

  return (
    <CHeader position="sticky" className="mb-1">
      <CContainer>
        <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          {organization?.name}
        </CHeaderBrand>
        {/*<CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
           <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> 
        </CHeaderNav>*/}
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
