import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import { Helmet } from 'react-helmet'
import { saveBillingBulk } from 'src/modules/billing/services/billings.service'
import { saveBillingLocally } from 'src/modules/billing/reducers/billings.reducer'

function Billing() {
  const billingsOffiline = useSelector((state) => state.billing.offline.billings)
  const loading = useSelector((state) => state.billing.loading)
  const dispatch = useDispatch()
  const mounted = useRef(false)
  console.log({ billingsOffiline })
  useEffect(() => {
    if (!mounted.current && loading) {
      mounted.current = loading
    } else if (mounted.current && !loading) {
      console.log('Updated')
      dispatch(saveBillingLocally([]))
    }
  }, [dispatch, loading])

  const handleSynchronize = () => {
    dispatch(saveBillingBulk(billingsOffiline))
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <Helmet>
          <title>Sync</title>
        </Helmet>
        <CCard>
          <CCardHeader>
            <CCardTitle>Sincronizador</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol className="text-uppercase">Facturas sin sincronizar</CCol>
              <CCol>{billingsOffiline && billingsOffiline.length}</CCol>
              <CCol>
                <CButton role="button" onClick={handleSynchronize} disabled={loading}>
                  Sincronizar
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default Billing
