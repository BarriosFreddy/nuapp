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
import ItemForm from './ItemForm'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, saveItem, updateItem } from 'src/modules/inventory/services/items.service'
import CONSTANTS from 'src/constants'
import { sendToast } from '../../../shared/services/notification.service'
import { Helmet } from 'react-helmet'
import { useDidUpdateControl } from '../../../../hooks/useDidUpdateControl'
import ItemList from './ItemList'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

function Item() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const saveSuccess = useSelector((state) => state.items.saveSuccess)
  const saving = useSelector((state) => state.items.saving)
  const fetching = useSelector((state) => state.items.fetching)
  const [searchTerm, setSearchTerm] = useState('')
  let [editing, setEditing] = useState(false)
  let [item, setItem] = useState(null)
  let [page, setPage] = useState(1)
  const searchInputRef = useRef()

  useEffect(() => {
    setSearchTerm('')
    dispatch(getItems({ page: 1 }))
  }, [dispatch])

  useDidUpdateControl(
    () => {
      if (saveSuccess) {
        setSearchTerm('')
        dispatch(getItems({ page }))
        setEditing(false)
        setItem(null)
        sendToast(dispatch, { message: 'Guardado exitosamente!' })
      } else {
        sendToast(dispatch, { message: 'No se pudo guardar los datos', color: 'danger' })
      }
    },
    saving,
    [saveSuccess],
  )

  const handleSave = (item) => {
    if (item._id) dispatch(updateItem(item))
    else dispatch(saveItem(item))
  }

  const handleCancel = async () => {
    dispatch(getItems({ page }))
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
    searchInputRef.current.focus()
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
                  <ItemList
                    items={items}
                    page={page}
                    fetching={fetching}
                    onEdit={handleEdit}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                  />
                )}
                {editing && <ItemForm item={item} onSave={handleSave} onCancel={handleCancel} />}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Item
