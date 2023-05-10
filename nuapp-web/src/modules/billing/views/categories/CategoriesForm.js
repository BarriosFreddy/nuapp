import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CButton, CRow, CContainer, CCol, CFormInput, CForm } from '@coreui/react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { saveItemCategory } from 'src/modules/billing/services/item-categories.service'

const { REACT_APP_BASE_URL } = process.env

const categoryInitialState = {
  name: '',
  description: '',
}

function CategoriesForm(props) {
  const dispatch = useDispatch()

  const [category, setCategory] = useState(categoryInitialState)
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    name: false,
    price: false,
    categoryId: false,
    units: false,
    measurementUnit: false,
  })

  useEffect(() => {
    ;(async () => {})()
  }, [])

  const onChangeField = ({ target: { name, value } }) => {
    setCategory({
      ...category,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
  }

  const clearFieldsForm = () => {
    setCategory(categoryInitialState)
  }

  const isValidForm = () => {
    const { name, description } = {
      ...category,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.description = !description
    failedValidationsObj.name = !name
    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const save = async () => {
    if (isValidForm()) {
      dispatch(
        saveItemCategory({
          ...category,
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
                label="Nombre"
                type="text"
                name="name"
                value={category.name}
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
                value={category.description}
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

export default CategoriesForm

CategoriesForm.propTypes = {
  cancel: PropTypes.func.isRequired,
}
