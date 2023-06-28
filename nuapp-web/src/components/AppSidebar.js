import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CSidebarFooter,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { setShowToast } from 'src/app.slice'

// sidebar nav config
import navigation from '../_nav'
import { setSidebarShow, setSidebarUnfoldable } from 'src/app.slice'
import { logout } from 'src/modules/core/services/auth.service'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.app.sidebarUnfoldable)
  const showToast = useSelector((state) => state.app.showToast)
  const toastConfig = useSelector((state) => state.app.toastConfig)
  const sidebarShow = useSelector((state) => state.app.sidebarShow)

  const onClickLogout = () => dispatch(logout())

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch(setSidebarShow(visible))
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
          {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
          {!unfoldable && <h4>Droguería Francisca</h4>}
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarFooter onClick={onClickLogout} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CSidebarFooter>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch(setSidebarUnfoldable(!unfoldable))}
        />
      </CSidebar>
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
    </>
  )
}

export default React.memo(AppSidebar)
