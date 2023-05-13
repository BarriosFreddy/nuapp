import React, { useState, useEffect, useCallback } from 'react'
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
} from '@coreui/react'
import { formatCurrency, formatDate } from '../../../utils'
import { getBillings } from 'src/modules/billing/services/billings.service'

function BillingsHistorical() {
  const dispatch = useDispatch()
  const billings = useSelector((state) => state.billing.billings)
  let [billing, setBilling] = useState(null)
  let [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getBillings())
  }, [])

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

  return (
    <>
      <CCard className="shadow border-10 m-4">
        <CCardBody>
          <CContainer className="mt--6" fluid>
            <CRow>
              <CCol>
                <>
                  <div className="d-lg-none">
                    {billings.map(({ createdAt, code, items, billAmount }) => (
                      <CCard
                        key={code}
                        style={{
                          width: 'auto',
                        }}
                      >
                        <CRow className="g-0" key={code}>
                          <CCol xs={8}>
                            <CCardBody>
                              <CRow>
                                <CCol>{createdAt}</CCol>
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
                        {billings.map((billing) => (
                          <CTableRow key={billing.code}>
                            <CTableDataCell xs="12" className="text-uppercase">
                              {formatDate(billing.createdAt)}
                            </CTableDataCell>
                            <CTableDataCell className="fs-6" xs="12">
                              {billing.code}
                            </CTableDataCell>
                            <CTableDataCell xs="12">{billing.items.length}</CTableDataCell>
                            <CTableDataCell xs="12">{billing.billAmount}</CTableDataCell>
                            <CTableDataCell xs="12">
                              <CButton
                                size="sm"
                                variant="outline"
                                color="info"
                                onClick={() => setBilling(billing)}
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
              {billing && (
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
                        {billing.items?.map(({ _id, name, units, price, measurementUnit }) => (
                          <CTableRow key={_id}>
                            <CTableDataCell colSpan={2}>{name}</CTableDataCell>
                            <CTableDataCell colSpan={2}>
                              {units + ' ' + measurementUnit}
                            </CTableDataCell>
                            <CTableDataCell colSpan={2}>{price}</CTableDataCell>
                          </CTableRow>
                        ))}
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
    </>
  )
}

export default BillingsHistorical
