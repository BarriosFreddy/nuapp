import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
} from '@coreui/react'
import { formatCurrency, formatDate } from './../../../utils'
import { getBillings } from './../../../modules/billing/services/billings.service'
import { setBillings } from './../../../modules/billing/reducers/billings.reducer'
import { Helmet } from 'react-helmet'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilPrint, cilZoom } from '@coreui/icons'
import { PDFViewer } from '@react-pdf/renderer'
import BillingTemplate from './print-templates/BillingTemplate'

export const { LISTING, DETAILING, PRINTING } = {
  LISTING: 'L',
  DETAILING: 'D',
  PRINTING: 'P',
}

function BillingsHistorical() {
  const dispatch = useDispatch()
  const billings = useSelector((state) => state.billing.billings)
  const billingsOffline = useSelector((state) => state.billing.offline.billings)
  let [billing, setBilling] = useState(null)
  let [page, setPage] = useState(1)
  let [currentAction, setCurrentAction] = useState(LISTING)
  useEffect(() => {
    dispatch(getBillings())
  }, [dispatch])

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
    setCurrentAction(DETAILING)
  }

  const handlePrint = (billing) => {
    setBilling(billing)
    setCurrentAction(PRINTING)
  }

  const handleBack = () => {
    setBilling(null)
    setCurrentAction(LISTING)
  }

  return (
    <>
      <CContainer>
        <Helmet>
          <title>HISTORIAL DE FACTURAS</title>
        </Helmet>
        <CCard className="shadow border-10">
          <CCardHeader>
            <CRow>
              <CCol md="4">
                {[DETAILING, PRINTING].includes(currentAction) && (
                  <CButton variant="outline" color="info" onClick={() => handleBack()}>
                    <CIcon icon={cilArrowLeft} size="sm" />
                    &nbsp; Regresar
                  </CButton>
                )}
              </CCol>
              <CCol md="4" className="text-center">
                HISTORIAL DE FACTURAS
              </CCol>
              <CCol md="4" className="text-end">
                {[DETAILING].includes(currentAction) && (
                  <CButton variant="outline" color="secondary" onClick={() => handlePrint(billing)}>
                    <CIcon icon={cilPrint} size="sm" />
                    &nbsp; Imprimir
                  </CButton>
                )}
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CContainer className="mt--6" fluid>
              <CRow>
                {currentAction === LISTING && (
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
                        <CTable small hover>
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
                                      <CIcon icon={cilZoom} size="sm" />
                                      &nbsp; Detalle
                                    </CButton>
                                    &nbsp;
                                    <CButton
                                      size="sm"
                                      variant="outline"
                                      color="secondary"
                                      onClick={() => handlePrint(billing)}
                                    >
                                      <CIcon icon={cilPrint} size="sm" />
                                      &nbsp; Imprimir
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
                {currentAction === PRINTING && (
                  <>
                    <PDFViewer width="100%" height="550px">
                      <BillingTemplate billing={billing} />
                    </PDFViewer>
                  </>
                )}
                {currentAction === DETAILING && (
                  <CCol>
                    <div className="d-none d-lg-block">
                      <CTable small hover>
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
            </CContainer>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default BillingsHistorical
