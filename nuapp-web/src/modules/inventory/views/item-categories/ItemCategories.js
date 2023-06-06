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
  CCardTitle,
} from '@coreui/react'
import ItemCategoriesForm from './ItemCategoriesForm'
import { useDispatch, useSelector } from 'react-redux'
import { getItemCategories } from 'src/modules/inventory/services/item-categories.service'
import CONSTANTS from 'src/constants'
import { Helmet } from 'react-helmet'
import {
  saveItemCategory,
  updateItemCategory,
} from '../../../inventory/services/item-categories.service'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

function Categories() {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const [searchTerm, setSearchTerm] = useState('')
  let [itemCategory, setItemCategory] = useState(null)
  let [editing, setEditing] = useState(false)
  let [page, setPage] = useState(1)

  useEffect(() => {
    setSearchTerm('')
    dispatch(getItemCategories())
  }, [dispatch])

  const handleSave = (itemCategory) => {
    if (itemCategory._id) dispatch(updateItemCategory(itemCategory))
    else dispatch(saveItemCategory(itemCategory))
    setItemCategory(null)
    setEditing(false)
  }

  const handleEdit = (itemCategory) => {
    setEditing(true)
    setItemCategory(itemCategory)
  }

  const handleCancel = async () => {
    dispatch(getItemCategories({ page: 1 }))
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
      return
    }
    dispatch(getItemCategories({ page: 1 }))
  }

  const handleNew = () => {
    setEditing(true)
    setItemCategory(null)
  }

  const handleClear = () => {
    setSearchTerm('')
    dispatch(getItemCategories({ page: 1 }))
  }

  return (
    <>
      <CContainer className="mt-6" fluid>
        <CCard className="mt-6 shadow border-10">
          <CCardHeader>
            <Helmet>
              <title>CATEGORIA DE ITEMS</title>
            </Helmet>
            <CCardTitle>CATEGORIA DE ITEMS</CCardTitle>
          </CCardHeader>
          <CCardBody>
            {!editing && (
              <CRow>
                <CCol xs="4" lg="3">
                  <CButton variant="outline" color="success" onClick={handleNew}>
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
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={handleClear}
                    >
                      BORRAR
                    </CButton>
                  </CInputGroup>
                </CCol>
              </CRow>
            )}
            {!editing && (
              <>
                <div className="d-lg-none">
                  {itemCategories &&
                    itemCategories.map(({ _id, code, name, description }) => (
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
                        <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {itemCategories &&
                        itemCategories.map((itemCategory) => (
                          <CTableRow key={itemCategory._id}>
                            <CTableDataCell xs="12" className="text-uppercase">
                              {itemCategory.code}
                            </CTableDataCell>
                            <CTableDataCell className="fs-6" xs="12">
                              {itemCategory.name}
                            </CTableDataCell>
                            <CTableDataCell xs="12" className="text-break">
                              {itemCategory.description}
                            </CTableDataCell>
                            <CTableDataCell xs="12">
                              <CButton
                                size="sm"
                                variant="outline"
                                color="info"
                                onClick={() => handleEdit(itemCategory)}
                              >
                                Editar
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
            )}
            {editing && (
              <ItemCategoriesForm
                itemCategory={itemCategory}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default Categories
