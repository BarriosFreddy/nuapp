import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardHeader,
  CCardFooter,
  CContainer,
  CRow,
  CButton,
  CCardBody,
  CCol,
  CCardImage,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
} from '@coreui/react'
import ItemForm from './ItemForm'
import DefaultImg from './../../../../assets/images/new.ico'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from 'src/modules/billing/services/items.service'

function Item() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  let [editing, setEditing] = useState(false)
  let [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getItems())
  }, [])

  const cancel = async () => {
    dispatch(getItems())
    setEditing(false)
  }

  const handlePrevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1
    setPage(newPage)
    dispatch(getItems({ page: newPage }))
  }

  const handleNextPage = async () => {
    const newPage = page + 1
    setPage(newPage)
    dispatch(getItems({ page: newPage }))
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <CRow>
          <div className="col">
            <CCard className="shadow border-10">
              {!editing && (
                <CCardHeader className="border-0">
                  <CRow>
                    <CCol xs="4">
                      <CButton variant="outline" color="success" onClick={() => setEditing(true)}>
                        NUEVO ITEM
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
              )}
              <CCardBody>
                {!editing && (
                  <>
                    <div className="d-lg-none">
                      {items.map(({ name, code, description, price }) => (
                        <CCard
                          key={code}
                          style={{
                            width: 'auto',
                          }}
                        >
                          <CRow className="g-0" key={code}>
                            <CCol xs={4}>
                              <CCardImage src={DefaultImg} />
                            </CCol>
                            <CCol xs={8}>
                              <CCardBody>
                                <CRow>
                                  <CCol>{name}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>{code}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>{description}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>${price}</CCol>
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
                            <CTableHeaderCell>Nombre</CTableHeaderCell>
                            <CTableHeaderCell>Código</CTableHeaderCell>
                            <CTableHeaderCell>Descripción</CTableHeaderCell>
                            <CTableHeaderCell>Precio</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {items.map(({ code, name, description, units }) => (
                            <CTableRow key={code}>
                              <CTableDataCell xs="12" className="text-uppercase">
                                {name}
                              </CTableDataCell>
                              <CTableDataCell className="fs-6" xs="12">
                                {code}
                              </CTableDataCell>
                              <CTableDataCell xs="12" className="text-break">
                                {description}
                              </CTableDataCell>
                              <CTableDataCell xs="12">{units}</CTableDataCell>
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
                )}
                {editing && <ItemForm cancel={cancel} />}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default Item
