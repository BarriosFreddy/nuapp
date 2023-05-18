import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CRow, CContainer, CCol, CFormInput, CForm } from '@coreui/react'
import { useDispatch } from 'react-redux'
import { saveItemCategory } from 'src/modules/billing/services/item-categories.service'

const categoryInitialState = {
  code: '',
  name: '',
  description: '',
}

function ItemCategoriesForm(props) {
  const dispatch = useDispatch()

  const [itemCategory, setItemCategory] = useState(categoryInitialState)
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    name: false,
  })

  const onChangeField = ({ target: { name, value } }) => {
    setItemCategory({
      ...itemCategory,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
  }

  const clearFieldsForm = () => {
    setItemCategory(categoryInitialState)
  }

  const isValidForm = () => {
    const { code, name, description } = {
      ...itemCategory,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.code = !code
    failedValidationsObj.name = !name
    failedValidationsObj.description = !description
    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const save = async () => {
    if (isValidForm()) {
      dispatch(
        saveItemCategory({
          ...itemCategory,
        }),
      )
      props.cancel()
      clearFieldsForm()
    }
  }

  const cancel = () => {
    props.cancel()
  }

  return (
    <>
      <CContainer fluid>
        <CForm className="row g-3 needs-validation" noValidate>
          <CRow style={{ marginTop: '40px' }}>
            <CCol xs="12" lg="3">
              <CFormInput
                label="Código"
                type="text"
                name="code"
                value={itemCategory.code}
                feedbackInvalid="Campo obligatorio"
                invalid={failedValidations.code}
                required
                onChange={(event) => onChangeField(event)}
              />
            </CCol>
            <CCol xs="12" lg="3">
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
            <CCol xs="12" lg="3">
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
          <div style={{ margin: '20px' }} />
          <CRow>
            <CCol xs="8" lg="1">
              <CButton size="sm" color="success" type="button" onClick={() => save()}>
                GUARDAR
              </CButton>
            </CCol>
            <CCol xs="4" lg="1">
              <CButton size="sm" color="light" onClick={() => cancel()}>
                CANCELAR
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </>
  )
}

export default ItemCategoriesForm

ItemCategoriesForm.propTypes = {
  cancel: PropTypes.func.isRequired,
}
