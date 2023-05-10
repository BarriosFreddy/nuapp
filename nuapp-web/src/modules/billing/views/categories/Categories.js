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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CategoriesForm from './CategoriesForm'
import { useDispatch, useSelector } from 'react-redux'
import { getItemCategories } from 'src/modules/billing/services/item-categories.service'
import { setItemCategories } from 'src/modules/billing/reducers/item-categories.reducer'

function Categories() {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  let [editing, setEditing] = useState(false)
  let [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getItemCategories())
  }, [])

  const cancel = async () => {
    dispatch(setItemCategories([]))
    setEditing(false)
  }

  const handleNextPage = async () => {
    const newPage = page + 1
    setPage(newPage)
    dispatch(getItemCategories(newPage))
  }

  const handlePrevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1
    setPage(newPage)
    dispatch(getItemCategories(newPage))
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <CRow>
          <div className="col">
            <CCard className="shadow border-10">
              {!editing && (
                <CCardHeader className="border-0">
                  <CContainer>
                    <CRow>
                      <CCol xs="4">
                        <CButton variant="outline" color="success" onClick={() => setEditing(true)}>
                          CREAR
                        </CButton>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CCardHeader>
              )}
              <CCardBody>
                {!editing && (
                  <>
                    <div className="d-lg-none">
                      {itemCategories.map(({ _id, name, description }) => (
                        <CCard
                          key={_id}
                          style={{
                            width: 'auto',
                          }}
                        >
                          <CRow className="g-0">
                            <CCol xs={12}>
                              <CCardBody>
                                <CRow>
                                  <CCol>{name}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>{description}</CCol>
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
                            <CTableHeaderCell>Código</CTableHeaderCell>
                            <CTableHeaderCell>Nombre</CTableHeaderCell>
                            <CTableHeaderCell>Descripción</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {itemCategories.map(({ code, name, description }) => (
                            <CTableRow key={code}>
                              <CTableDataCell xs="12" className="text-uppercase">
                                {code}
                              </CTableDataCell>
                              <CTableDataCell className="fs-6" xs="12">
                                {name}
                              </CTableDataCell>
                              <CTableDataCell xs="12" className="text-break">
                                {description}
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
                )}
                {editing && <CategoriesForm cancel={cancel} />}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default Categories
