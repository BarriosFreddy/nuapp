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
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import ItemCategoriesForm from './ItemCategoriesForm'
import { useDispatch, useSelector } from 'react-redux'
import { getItemCategories } from 'src/modules/billing/services/item-categories.service'
import CONSTANTS from 'src/constants'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

function Categories() {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const [searchTerm, setSearchTerm] = useState('')
  let [editing, setEditing] = useState(false)
  let [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getItemCategories())
  }, [])

  const cancel = async () => {
    dispatch(getItemCategories())
    setEditing(false)
  }

  const handleNextPage = async () => {
    const newPage = page + 1
    setPage(newPage)
    dispatch(getItemCategories({ page: newPage }))
  }

  const handlePrevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1
    setPage(newPage)
    dispatch(getItemCategories({ page: newPage }))
  }

  const onChangeField = ({ target: { value } }) => {
    setSearchTerm(value)
  }

  const onKeyDownCodeField = async ({ keyCode }) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) search()
  }

  const search = async () => {
    if (!!searchTerm) {
      dispatch(getItemCategories({ code: searchTerm.trim(), name: searchTerm.trim(), page: 1 }))
    }
  }

  return (
    <>
      <CContainer className="mt-6" fluid>
        <CRow>
          <div className="col">
            <CCard className="shadow border-10">
              {!editing && (
                <CCardHeader className="border-0">
                  <CContainer>
                    <CRow>
                      <CCol xs="4" lg="3">
                        <CButton variant="outline" color="success" onClick={() => setEditing(true)}>
                          NUEVA CATEGORIA
                        </CButton>
                      </CCol>
                      <CCol lg="5">
                        <CInputGroup>
                          <CFormInput
                            type="text"
                            name="searchTerm"
                            placeholder="..."
                            value={searchTerm}
                            onChange={(event) => onChangeField(event)}
                            onKeyDown={(event) => onKeyDownCodeField(event)}
                          />
                          <CButton type="button" variant="outline" color="primary" onClick={search}>
                            BUSCAR
                          </CButton>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CCardHeader>
              )}
              <CCardBody>
                {!editing && (
                  <>
                    <div className="d-lg-none">
                      {itemCategories.map(({ _id, code, name, description }) => (
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
                                  <CCol>{code}</CCol>
                                </CRow>
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
                          {itemCategories.map(({ _id, code, name, description }) => (
                            <CTableRow key={_id}>
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
                {editing && <ItemCategoriesForm cancel={cancel} />}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default Categories
