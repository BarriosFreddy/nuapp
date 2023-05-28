import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CRow, CContainer, CCol, CFormInput, CForm } from '@coreui/react'
import ConfirmDialog from '../../../../components/shared/ConfirmDialog'
import { useDispatch, useSelector } from 'react-redux'
import { validateCodeRegistered } from '../../services/item-categories.service'
import { setCodeRegistered } from '../../reducers/item-categories.reducer'

const categoryInitialState = {
  code: '',
  name: '',
  description: '',
}
const failedValidationsInitState = {
  code: false,
  name: false,
  description: false,
}

function ItemCategoriesForm(props) {
  const dispatch = useDispatch()
  const confirmDialogRef = useRef()
  const isCodeRegistered = useSelector((state) => state.itemCategories.isCodeRegistered)
  const [itemCategory, setItemCategory] = useState(categoryInitialState)
  const [failedValidations, setFailedValidations] = useState(failedValidationsInitState)
  const oldCode = props.itemCategory?.code

  useEffect(() => {
    props.itemCategory && setItemCategory(props.itemCategory)
  }, [props.itemCategory])

  const validateCodeExistence = (code) => {
    if (props.itemCategory && oldCode !== code) {
      dispatch(validateCodeRegistered(code))
    }
  }

  const onChangeField = ({ target: { name, value } }) => {
    setItemCategory({
      ...itemCategory,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
    if (name === 'code') validateCodeExistence(value)
  }

  const clearFieldsForm = () => {
    setItemCategory(categoryInitialState)
    dispatch(setCodeRegistered(false))
    setFailedValidations(failedValidationsInitState)
  }

  const isValidForm = () => {
    const { code, name, description } = {
      ...itemCategory,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.code = !code || isCodeRegistered
    failedValidationsObj.name = !name
    failedValidationsObj.description = !description
    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const handleSave = async () => {
    if (isValidForm()) {
      props.onSave({
        ...itemCategory,
      })
      clearFieldsForm()
    }
  }

  const handleCancel = () => {
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
        <CForm className="row g-3 needs-validation" noValidate>
          <CRow className="mt-2">
            <CCol xs="12" lg="4">
              <CFormInput
                label="Código"
                type="text"
                name="code"
                value={itemCategory.code}
                feedback={
                  isCodeRegistered ? 'El código ya se encuentra registrado' : 'Campo obligatorio'
                }
                invalid={isCodeRegistered || failedValidations.code}
                required
                onChange={(event) => onChangeField(event)}
              />
            </CCol>
            <CCol xs="12" lg="4">
              <CFormInput
                label="Nombre"
                type="text"
                name="name"
                value={itemCategory.name}
                feedbackInvalid="Campo obligatorio"
                invalid={failedValidations.name}
                required
                onChange={(event) => onChangeField(event)}
              />
            </CCol>
            <CCol xs="12" lg="4">
              <CFormInput
                label="Descripción"
                type="text"
                name="description"
                value={itemCategory.description}
                feedbackInvalid="Campo obligatorio"
                invalid={failedValidations.description}
                required
                onChange={(event) => onChangeField(event)}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol className="text-center" xs="8" lg={{ offset: 4, span: 4 }}>
              <CButton color="success" type="button" onClick={() => handleSave()}>
                {props.itemCategory ? 'EDITAR' : 'GUARDAR'}
              </CButton>
              &nbsp; &nbsp;
              <CButton color="light" onClick={() => handleCancel()}>
                CANCELAR
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
      <ConfirmDialog
        ref={confirmDialogRef}
        onResponse={handleResponseCancel}
        message="¿Estás seguro que quieres cancelar?"
      ></ConfirmDialog>
    </>
  )
}

export default ItemCategoriesForm

ItemCategoriesForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  itemCategory: PropTypes.object,
}
