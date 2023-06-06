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
  CInputGroup,
  CFormInput,
  CCardTitle,
} from '@coreui/react'
import ItemForm from './ItemForm'
import DefaultImg from './../../../../assets/images/new.ico'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, saveItem, updateItem } from 'src/modules/inventory/services/items.service'
import CONSTANTS from 'src/constants'
import { formatCurrency } from 'src/utils'
import { useDidUpdate } from 'src/hooks/useDidUpdate'
import { sendToast } from '../../../shared/services/notification.service'
import { Helmet } from 'react-helmet'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

function Item() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const saveSuccess = useSelector((state) => state.items.saveSuccess)
  const [searchTerm, setSearchTerm] = useState('')
  let [editing, setEditing] = useState(false)
  let [item, setItem] = useState(null)
  let [page, setPage] = useState(1)

  useEffect(() => {
    setSearchTerm('')
    dispatch(getItems({ page: 1 }))
  }, [dispatch])

  useDidUpdate(() => {
    sendToast(dispatch, { message: 'Guardado exitosamente!' })
    setItem(null)
    setEditing(false)
    handleClear()
  }, [saveSuccess])

  const save = (item) => {
    if (item._id) {
      dispatch(updateItem(item))
      return
    }
    dispatch(saveItem(item))
  }

  const cancel = async () => {
    dispatch(getItems({ page: 1 }))
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

  const onChangeField = ({ target: { value } }) => {
    setSearchTerm(value)
  }

  const onKeyDownCodeField = async ({ keyCode }) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) search()
  }

  const search = async () => {
    if (!!searchTerm) {
      dispatch(getItems({ code: searchTerm.trim(), name: searchTerm.trim(), page: 1 }))
      return
    }
    dispatch(getItems({ page: 1 }))
  }

  const handleEdit = (item) => {
    setEditing(true)
    setItem(item)
  }

  const handleNewItem = () => {
    setItem(null)
    setEditing(true)
  }

  const handleClear = () => {
    setSearchTerm('')
    dispatch(getItems({ page: 1 }))
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <CRow>
          <CCol>
            <CCard className="mt-6 shadow border-10">
              <CCardHeader>
                <Helmet>
                  <title>ITEMS</title>
                </Helmet>
                <CCardTitle>ITEMS</CCardTitle>
              </CCardHeader>
              <CCardBody>
                {!editing && (
                  <CRow>
                    <CCol xs="4" lg="3">
                      <CButton variant="outline" color="success" onClick={handleNewItem}>
                        NUEVO ITEM
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
                            <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {items.map((item) => (
                            <CTableRow key={item.code}>
                              <CTableDataCell xs="12" className="text-uppercase">
                                {item.name}
                              </CTableDataCell>
                              <CTableDataCell className="fs-6" xs="12">
                                {item.code}
                              </CTableDataCell>
                              <CTableDataCell xs="12" className="text-break">
                                {item.description}
                              </CTableDataCell>
                              <CTableDataCell xs="12">{formatCurrency(item.price)}</CTableDataCell>
                              <CTableDataCell xs="12">
                                <CButton
                                  size="sm"
                                  variant="outline"
                                  color="info"
                                  onClick={() => handleEdit(item)}
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
                {editing && <ItemForm item={item} onSave={save} onCancel={cancel} />}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Item
