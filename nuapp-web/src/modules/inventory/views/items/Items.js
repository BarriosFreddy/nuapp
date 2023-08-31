import React, { useState, useEffect, useRef } from 'react'

import {
  CCard,
  CCardHeader,
  CContainer,
  CRow,
  CButton,
  CCardBody,
  CCol,
  CInputGroup,
  CFormInput,
  CCardTitle,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import ItemForm from './ItemForm'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, saveItem, updateItem } from 'src/modules/inventory/services/items.service'
import CONSTANTS from 'src/constants'
import { sendToast } from '../../../shared/services/notification.service'
import { Helmet } from 'react-helmet'
import { useDidUpdateControl } from '../../../../hooks/useDidUpdateControl'
import ItemList from './ItemList'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilTrash } from '@coreui/icons'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

const queryParamsInitial = {
  page: 1,
}

function Item() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const saveSuccess = useSelector((state) => state.items.saveSuccess)
  const saving = useSelector((state) => state.items.saving)
  const fetching = useSelector((state) => state.items.fetching)
  const [searchTerm, setSearchTerm] = useState('')
  let [editing, setEditing] = useState(false)
  let [item, setItem] = useState(null)
  const [showFilterSection, setShowFilterSection] = useState(false)
  const [queryParams, setQueryParams] = useState(queryParamsInitial)
  const searchInputRef = useRef()

  useEffect(() => {
    setSearchTerm('')
    dispatch(getItems({ page: 1 }))
  }, [dispatch])

  useEffect(() => {
    search()
  }, [queryParams])

  useDidUpdateControl(
    () => {
      if (saveSuccess) {
        setEditing(false)
        setSearchTerm('')
        setQueryParams({ page: queryParams.page })
        sendToast(dispatch, { message: 'Guardado exitosamente!' })
        setItem(null)
      } else {
        sendToast(dispatch, { message: 'No se pudo guardar los datos', color: 'danger' })
      }
    },
    saving,
    [saveSuccess],
  )

  const handleSave = (item) => {
    delete item.price // delete after making sure the changes
    delete item.measurementUnit
    delete item.cost
    if (item._id) dispatch(updateItem(item))
    else dispatch(saveItem(item))
  }

  const handleCancel = async () => {
    setQueryParams({ page: queryParams.page })
    setEditing(false)
  }

  const handlePrevPage = async () => {
    const newPage = queryParams.page === 1 ? 1 : queryParams.page - 1
    setQueryParams({ ...queryParams, page: newPage })
  }

  const handleNextPage = async () => {
    const newPage = queryParams.page + 1
    setQueryParams({ ...queryParams, page: newPage })
  }

  const onChangeField = ({ target: { value } }) => {
    setSearchTerm(value)
  }

  const onKeyDownCodeField = async ({ keyCode }) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) setQueryParams({ ...queryParams })
  }

  const search = async () => {
    const params = { ...queryParams }

    if (!!searchTerm) {
      params.code = searchTerm.trim()
      params.name = searchTerm.trim()
    }
    dispatch(getItems(params))
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
    searchInputRef.current.focus()
  }

  const handleFilter = () => {
    setShowFilterSection(!showFilterSection)
  }

  const handleChangeFilters = ({ target: { name, value } }) => {
    setQueryParams({ ...queryParams, [name]: value })
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <Helmet>
          <title>ITEMS</title>
        </Helmet>
        <CCard className="mt-6 shadow border-10">
          <div className="d-none d-lg-block">
            <CCardHeader>
              <CCardTitle>ITEMS</CCardTitle>
            </CCardHeader>
          </div>
          <CCardBody>
            {!editing && (
              <>
                <CRow>
                  <CCol xs="2" lg="3">
                    <CButton variant="outline" color="success" onClick={handleNewItem}>
                      <div className="d-none d-lg-block">NUEVO ITEM</div>
                      <div className="d-lg-none">
                        <CIcon icon={cilPlus} size="sm" />
                      </div>
                    </CButton>
                  </CCol>
                  <CCol xs="8" lg="5">
                    <CInputGroup>
                      <CFormInput
                        ref={searchInputRef}
                        type="text"
                        name="searchTerm"
                        placeholder="..."
                        value={searchTerm}
                        onChange={(event) => onChangeField(event)}
                        onKeyDown={(event) => onKeyDownCodeField(event)}
                      />
                      <CButton type="button" variant="outline" color="primary" onClick={search}>
                        <div className="d-none d-lg-block">BUSCAR</div>
                        <div className="d-lg-none">
                          <CIcon icon={cilSearch} size="sm" />
                        </div>
                      </CButton>
                      <CButton
                        variant="outline"
                        type="button"
                        color="secondary"
                        onClick={handleClear}
                      >
                        <div className="d-none d-lg-block">BORRAR</div>
                        <div className="d-lg-none">
                          <CIcon icon={cilTrash} size="sm" />
                        </div>
                      </CButton>
                    </CInputGroup>
                  </CCol>
                  <CCol xs="2" lg="1">
                    <CButton color="link" onClick={handleFilter}>
                      Filtrar
                    </CButton>
                  </CCol>
                  {showFilterSection && (
                    <>
                      <CCol xs="2" lg="1" className="text-end">
                        <CFormLabel htmlFor="stock" className="col-form-label">
                          Stock
                        </CFormLabel>
                      </CCol>
                      <CCol xs="4" lg="2">
                        <CFormSelect
                          id="stock"
                          className="my-1"
                          value={queryParams.stock}
                          name="stock"
                          size="sm"
                          options={[
                            { label: 'TODOS', value: '' },
                            { label: 'DISPONIBLE', value: 'IS' },
                            { label: 'RECOMPRA', value: 'RP' },
                            { label: 'NO DISPONIBLE', value: 'WS' },
                          ]}
                          onChange={handleChangeFilters}
                        />
                      </CCol>
                    </>
                  )}
                </CRow>
              </>
            )}
            {!editing && (
              <ItemList
                items={items}
                page={queryParams.page}
                fetching={fetching}
                onEdit={handleEdit}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
              />
            )}
            {editing && <ItemForm item={item} onSave={handleSave} onCancel={handleCancel} />}
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default Item
