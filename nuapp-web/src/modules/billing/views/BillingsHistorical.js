import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isOnline from 'is-online'
import {
  CCard,
  CCardFooter,
  CContainer,
  CRow,
  CButton,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CCardHeader,
  CCardTitle,
} from '@coreui/react'
import { formatCurrency, formatDate } from '../../../utils'
import { getBillings } from 'src/modules/billing/services/billings.service'
import { setBillings } from '../reducers/billings.reducer'
import { Helmet } from 'react-helmet'

function BillingsHistorical() {
  const dispatch = useDispatch()
  const billings = useSelector((state) => state.billing.billings)
  const billingsOffline = useSelector((state) => state.billing.offline.billings)
  let [detailing, setDetailing] = useState(false)
  let [billing, setBilling] = useState(null)
  let [page, setPage] = useState(1)
  useEffect(() => {
    dispatch(getBillings())
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      const isonline = await isOnline()
      if (!isonline) {
        dispatch(setBillings(billingsOffline))
      }
    })()
  }, [dispatch, billingsOffline])

  const handlePrevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1
    setPage(newPage)
    dispatch(getBillings({ page: newPage }))
  }

  const handleNextPage = async () => {
    const newPage = page + 1
    setPage(newPage)
    dispatch(getBillings({ page: newPage }))
  }

  const handleDetail = (billing) => {
    setBilling(billing)
    setDetailing(true)
  }

  const handleBack = () => {
    setBilling(null)
    setDetailing(false)
  }

  return (
    <>
      <CCard className="shadow border-10 m-4">
        <CCardHeader>
          <Helmet>
            <title>HISTORIAL DE FACTURAS</title>
          </Helmet>
          <CCardTitle>HISTORIAL DE FACTURAS</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CContainer className="mt--6" fluid>
            <CRow>
              {!detailing && (
                <CCol>
                  <>
                    <div className="d-lg-none">
                      {billings &&
                        billings.map(({ createdAt, code, billAmount }, index) => (
                          <CCard
                            key={index}
                            style={{
                              width: 'auto',
                            }}
                          >
                            <CRow className="g-0" key={code}>
                              <CCol xs={8}>
                                <CCardBody>
                                  <CRow>
                                    <CCol>{formatDate(createdAt)}</CCol>
                                  </CRow>
                                  <CRow>
                                    <CCol>{code}</CCol>
                                  </CRow>
                                  <CRow>
                                    <CCol>${billAmount}</CCol>
                                  </CRow>
                                </CCardBody>
                              </CCol>
                            </CRow>
                          </CCard>
                        ))}
                    </div>
                    <div className="d-none d-lg-block">
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Fecha</CTableHeaderCell>
                            <CTableHeaderCell>Código</CTableHeaderCell>
                            <CTableHeaderCell>N° de productos</CTableHeaderCell>
                            <CTableHeaderCell>Total</CTableHeaderCell>
                            <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {billings &&
                            billings.map((billing, index) => (
                              <CTableRow key={index}>
                                <CTableDataCell xs="12" className="text-uppercase">
                                  {formatDate(billing.createdAt)}
                                </CTableDataCell>
                                <CTableDataCell className="fs-6" xs="12">
                                  {billing.code ? billing.code : 'No Disponible'}
                                </CTableDataCell>
                                <CTableDataCell xs="12">{billing.items?.length}</CTableDataCell>
                                <CTableDataCell xs="12">
                                  {formatCurrency(billing.billAmount)}
                                </CTableDataCell>
                                <CTableDataCell xs="12">
                                  <CButton
                                    size="sm"
                                    variant="outline"
                                    color="info"
                                    onClick={() => handleDetail(billing)}
                                  >
                                    Detalle
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            ))}
                        </CTableBody>
                      </CTable>
                    </div>

                    <CCardFooter className="py-4">
                      <CRow>
                        <CCol>
                          <div className="d-grid col-12 mx-auto">
                            <CButton
                              type="button"
                              variant="outline"
                              color="secondary"
                              onClick={handlePrevPage}
                            >
                              ANTERIOR
                            </CButton>
                          </div>
                        </CCol>
                        <CCol>
                          <div className="d-grid col-12 mx-auto">
                            <CButton
                              type="button"
                              variant="outline"
                              color="secondary"
                              onClick={handleNextPage}
                            >
                              SIGUIENTE
                            </CButton>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardFooter>
                  </>
                </CCol>
              )}
              {detailing && (
                <CCol>
                  <div className="d-none d-lg-block">
                    <CTable>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell lg="2">Fecha</CTableHeaderCell>
                          <CTableDataCell>{formatDate(billing.createdAt)}</CTableDataCell>
                          <CTableHeaderCell lg="3">Código</CTableHeaderCell>
                          <CTableDataCell colSpan={2}>{billing.code}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell colSpan={5}>Items</CTableHeaderCell>
                        </CTableRow>
                        {billing.items?.map(
                          ({ _id, name, units, price, measurementUnit }, index) => (
                            <CTableRow key={index}>
                              <CTableDataCell colSpan={2}>{name}</CTableDataCell>
                              <CTableDataCell colSpan={2}>
                                {units + ' ' + measurementUnit}
                              </CTableDataCell>
                              <CTableDataCell colSpan={2}>{price}</CTableDataCell>
                            </CTableRow>
                          ),
                        )}
                        <CTableRow>
                          <CTableHeaderCell className="text-end fs-4" colSpan={5}>
                            Total {formatCurrency(billing.billAmount)}
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </div>
                </CCol>
              )}
            </CRow>
            {detailing && (
              <CRow>
                <CCol>
                  <CButton variant="outline" color="info" onClick={() => handleBack()}>
                    Regresar
                  </CButton>
                </CCol>
              </CRow>
            )}
          </CContainer>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BillingsHistorical
