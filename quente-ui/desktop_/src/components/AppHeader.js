import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilChartLine,
  cilDollar,
  cilHistory,
  cilHome,
  cilInbox,
  cilSitemap,
  cilUser,
} from "@coreui/icons";

import AppHeaderDropdown from "./AppHeaderDropdown";
import { setShowToast } from "./../app.slice";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { organization } = useSelector((state) => state.auth.infoUser) ?? {};
  const showToast = useSelector((state) => state.app.showToast);
  const toastConfig = useSelector((state) => state.app.toastConfig);

  return (
    <CHeader position="sticky" className="mb-1">
      <CContainer>
        {/* <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderBrand to="/" className="text-uppercase">
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
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider />
          <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
      <CToaster placement="top-end">
        <CToast
          visible={showToast}
          color={toastConfig.color ?? "info"}
          onClose={() => {
            dispatch(setShowToast(false));
          }}
          delay={toastConfig.delay ?? 5000}
        >
          <div className="d-flex">
            <CToastBody className="fs-6">
              {toastConfig.message ?? ""}
            </CToastBody>
            <CToastClose className="me-2 m-auto" />
          </div>
        </CToast>
      </CToaster>
    </CHeader>
  );
};

export default AppHeader;
