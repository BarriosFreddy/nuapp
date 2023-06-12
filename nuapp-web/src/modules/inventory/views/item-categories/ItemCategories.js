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
} from '@coreui/react'
import ItemCategoriesForm from './ItemCategoriesForm'
import { useDispatch, useSelector } from 'react-redux'
import { getItemCategories } from 'src/modules/inventory/services/item-categories.service'
import CONSTANTS from 'src/constants'
import { Helmet } from 'react-helmet'
import { useDidUpdateControl } from '../../../../hooks/useDidUpdateControl'
import { sendToast } from '../../../shared/services/notification.service'
import {
  saveItemCategory,
  updateItemCategory,
} from '../../../inventory/services/item-categories.service'
import ItemCategoriesList from './ItemCategoriesList'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

function Categories() {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const saving = useSelector((state) => state.itemCategories.saving)
  const saveSuccess = useSelector((state) => state.itemCategories.saveSuccess)
  const [searchTerm, setSearchTerm] = useState('')
  let [itemCategory, setItemCategory] = useState(null)
  let [editing, setEditing] = useState(false)
  let [page, setPage] = useState(1)
  const searchInputRef = useRef()

  useEffect(() => {
    setSearchTerm('')
    dispatch(getItemCategories({ page: 1 }))
  }, [dispatch])

  useDidUpdateControl(() => {
    if (saveSuccess) {
      setSearchTerm('')
      dispatch(getItemCategories({ page }))
      setEditing(false)
      setItemCategory(null)
      sendToast(dispatch, { message: 'Guardado exitosamente!' })
    } else sendToast(dispatch, { message: 'No se pudo guardar los datos', color: 'danger' })
  }, saving)

  const handleSave = (itemCategory) => {
    if (itemCategory._id) dispatch(updateItemCategory(itemCategory))
    else dispatch(saveItemCategory(itemCategory))
  }

  const handleEdit = (itemCategory) => {
    setEditing(true)
    setItemCategory(itemCategory)
  }

  const handleCancel = async () => {
    dispatch(getItemCategories({ page }))
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
    searchInputRef.current.focus()
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
                      ref={searchInputRef}
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
              <ItemCategoriesList
                itemCategories={itemCategories}
                page={page}
                onEdit={handleEdit}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
              />
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
