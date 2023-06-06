/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createRef, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  CButton,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CContainer,
  CCol,
  CFormInput,
  CForm,
  CFormSelect,
  CCardBody,
  CCardHeader,
  CCard,
  CCardFooter,
} from '@coreui/react'
import { getItemCategories } from 'src/modules/inventory/services/item-categories.service'
import { existByCode } from '../../services/items.service'
import ConfirmDialog from 'src/components/shared/ConfirmDialog'
import CurrencyFormInput from '../../../../components/shared/CurrencyFormInput'

const itemInitialState = {
  name: '',
  code: '',
  description: '',
  price: '',
  categoryId: '',
  units: 0,
  measurementUnit: '',
}

function ItemForm(props) {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const codeRegistered = useSelector((state) => state.items.existsByCode)
  const [item, setItem] = useState(itemInitialState)
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    name: false,
    price: false,
    categoryId: false,
    measurementUnit: false,
  })
  const [modal, setModal] = useState(false)
  const confirmDialogRef = useRef()
  const oldCode = props.item?.code

  useEffect(() => {
    props.item && setItem(props.item)
    dispatch(getItemCategories({ parse: true }))
  }, [dispatch, props.item])

  const toggle = () => setModal(!modal)
  const validateCodeExistence = (code) => {
    if (props.item || oldCode !== code) {
      dispatch(existByCode(code))
    }
  }

  const onChangeField = ({ target: { name, value } }) => {
    setItem({
      ...item,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
    if (name === 'code') validateCodeExistence(value)
  }

  const clearFieldsForm = () => {
    setItem(itemInitialState)
  }

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )

  const isValidForm = () => {
    const { name, code, description, price, categoryId, measurementUnit } = {
      ...item,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.code = !code || codeRegistered
    failedValidationsObj.description = !description
    failedValidationsObj.name = !name
    failedValidationsObj.price = !price
    failedValidationsObj.categoryId = !categoryId
    failedValidationsObj.measurementUnit = !measurementUnit
    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const save = async () => {
    if (isValidForm()) {
      props.onSave({
        ...item,
      })
      clearFieldsForm()
    }
  }

  const cancel = () => {
    confirmDialogRef.current.show(true)
  }

  const handleResponseCancel = (sureCancel) => {
    sureCancel && props.onCancel()
    if (!sureCancel) {
      confirmDialogRef.current.show(false)
      clearFieldsForm()
    }
  }

  return (
    <>
      <CContainer fluid>
        <CCard>
          <CCardHeader>{props.item ? 'EDITANDO' : 'CREANDO'} ITEM</CCardHeader>
          <CCardBody>
            <CForm className="mt-2 row g-3 needs-validation" noValidate>
              <CRow style={{ marginTop: '40px' }}>
                <CCol xs="12" lg="4">
                  <CFormInput
                    className="text-uppercase"
                    label="Código"
                    type="text"
                    name="code"
                    value={item.code}
                    feedback={
                      codeRegistered ? 'El código ya se encuentra registrado' : 'Campo obligatorio'
                    }
                    invalid={codeRegistered || failedValidations.code}
                    required
                    onChange={(event) => onChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormInput
                    className="text-uppercase"
                    label="Nombre"
                    type="text"
                    name="name"
                    value={item.name}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.name}
                    required
                    onChange={(event) => onChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormInput
                    className="text-uppercase"
                    label="Descripción"
                    type="text"
                    name="description"
                    value={item.description}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.description}
                    required
                    onChange={(event) => onChangeField(event)}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12" lg="4">
                  <CurrencyFormInput
                    label="Precio"
                    type="number"
                    name="price"
                    value={item.price}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.price}
                    required
                    onChange={(event) => onChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormSelect
                    label="Categoria"
                    name="categoryId"
                    value={item.categoryId}
                    required
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.categoryId}
                    onChange={(event) => onChangeField(event)}
                    aria-label="Default select example"
                    options={['Seleccione la categoria', ...itemCategories]}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormInput
                    className="text-uppercase"
                    label="Unidad de medida"
                    type="text"
                    name="measurementUnit"
                    value={item.measurementUnit}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.measurementUnit}
                    required
                    onChange={(event) => onChangeField(event)}
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter className="mt-2">
            <CRow className="mt-0">
              <CCol className="text-center" xs="8" lg={{ offset: 4, span: 4 }}>
                <CButton color="success" type="button" onClick={() => save()}>
                  {props.item ? 'EDITAR' : 'GUARDAR'}
                </CButton>
                &nbsp; &nbsp;
                <CButton variant="outline" color="secondary" onClick={() => cancel()}>
                  CANCELAR
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CContainer>
      <ConfirmDialog
        ref={confirmDialogRef}
        onResponse={handleResponseCancel}
        message="¿Estás seguro que quieres cancelar?"
      ></ConfirmDialog>
      <CModal isOpen={modal} toggle={toggle}>
        <CModalHeader toggle={toggle} close={closeBtn}>
          Escaneando
        </CModalHeader>
        <CModalBody>
          <div id="reader" width="600px" style={{ maxWidth: '750px' }}></div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ItemForm

ItemForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.object,
}
