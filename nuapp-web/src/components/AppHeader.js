import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { setSidebarShow } from './../app.slice'
import { setShowToast } from 'src/app.slice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.app.sidebarShow)
  const showToast = useSelector((state) => state.app.showToast)
  const toastConfig = useSelector((state) => state.app.toastConfig)
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
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
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      {/*       <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
      <CToaster placement="top-end">
        <CToast
          visible={showToast}
          color={toastConfig.color ?? 'info'}
          onClose={() => {
            dispatch(setShowToast(false))
          }}
          delay={toastConfig.delay ?? 5000}
        >
          <div className="d-flex">
            <CToastBody className="fs-6">{toastConfig.message ?? ''}</CToastBody>
            <CToastClose className="me-2 m-auto" />
          </div>
        </CToast>
      </CToaster>
    </CHeader>
  )
}

export default AppHeader
