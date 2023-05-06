import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import { formatCurrency, formatDate } from '../../../utils'

const { REACT_APP_BASE_URL } = process.env

function BillingsHistorical() {
  let [billing, setBilling] = useState(null)
  let [billings, setBillings] = useState([])
  let [page, setPage] = useState(1)

  useEffect(() => {
    ;(async () => {
      const billingsArray = await getBillings()
      setBillings(billingsArray)
    })()
  }, [])

  const getBillings = async (page = 1) => {
    const { data } = await axios({
      url: `${REACT_APP_BASE_URL}/billings?page=${page}`,
      withCredentials: true,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  }

  const handleLoadMore = async () => {
    const newPage = page + 1
    setPage(newPage)
    const moreItems = await getBillings(newPage)
    moreItems && moreItems.length > 0 && setBillings([...billings, ...moreItems])
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
                    <CCol>
                      <div className="d-grid col-12 mx-auto">
                        <CButton type="button" color="secondary" onClick={handleLoadMore}>
                          Cargar más
                        </CButton>
                      </div>
                    </CCol>
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
                          <CTableHeaderCell lg="2">Código</CTableHeaderCell>
                          <CTableDataCell>{billing.code}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell colSpan={4}>Items</CTableHeaderCell>
                        </CTableRow>
                        {billing.items?.map(({ _id, name, units, measurementUnit }) => (
                          <CTableRow key={_id}>
                            <CTableDataCell colSpan={2}>{name}</CTableDataCell>
                            <CTableDataCell colSpan={2}>
                              {units + ' ' + measurementUnit}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                        <CTableRow>
                          <CTableHeaderCell className="text-end fs-4" colSpan={4}>
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
