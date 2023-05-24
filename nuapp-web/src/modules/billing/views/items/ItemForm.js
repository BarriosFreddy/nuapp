/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import Quagga from 'quagga'
import { getItemCategories } from 'src/modules/billing/services/item-categories.service'
import { existByCode, saveItem } from '../../services/items.service'

const itemInitialState = {
  name: '',
  code: '',
  description: '',
  price: '',
  categoryId: '',
  units: '',
  measurementUnit: '',
}

function ItemForm(props) {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const itemGlobal = useSelector((state) => state.items.item)
  const codeRegistered = useSelector((state) => state.items.existsByCode)
  const [item, setItem] = useState(itemInitialState)
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    name: false,
    price: false,
    categoryId: false,
    units: false,
    measurementUnit: false,
  })
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  useEffect(() => {
    itemGlobal && setItem(itemGlobal)
    dispatch(getItemCategories({ parse: true }))
  }, [dispatch, itemGlobal])

  const validateCodeExistence = (code) => {
    dispatch(existByCode(code))
  }

  const onChangeField = ({ target: { name, value } }) => {
    setItem({
      ...item,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
    if (name === 'code') {
      validateCodeExistence(value)
    }
  }

  const populateFieldsForm = ({ _id, code, description, price }) => {
    setItem({
      ...item,
      _id,
      code,
      description,
      price,
    })
  }

  const clearFieldsForm = () => {
    setItem(itemInitialState)
  }

  const scanItem = () => {
    toggle()
    setTimeout(() => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            constraints: {
              width: 320,
              height: 380,
              facingMode: 'environment',
            },
            target: document.querySelector('#reader'), // Or '#yourElement' (optional)
          },
          decoder: {
            readers: [
              {
                format: 'ean_reader',
                config: {
                  supplements: ['ean_13_reader'],
                },
              },
            ],
          },
        },
        function (err) {
          if (err) {
            console.log(err)
            return
          }
          console.log('Ready to start')
          Quagga.start()
        },
      )
      Quagga.onDetected(({ codeResult: { code } }) => {
        console.log({ code })
        setItem({
          ...item,
          code,
        })
        setModal(false)
        Quagga.stop()
      })
      Quagga.onProcessed((result) => {
        const drawingCanvas = Quagga.canvas.dom.overlay
        drawingCanvas.style.display = 'none'
      })
    }, 300)
  }

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )

  const isValidForm = () => {
    const { name, code, description, price, categoryId, units, measurementUnit } = {
      ...item,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.code = !code || codeRegistered
    failedValidationsObj.description = !description
    failedValidationsObj.name = !name
    failedValidationsObj.price = !price
    failedValidationsObj.categoryId = !categoryId
    failedValidationsObj.units = !units
    failedValidationsObj.measurementUnit = !measurementUnit
    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const save = async () => {
    if (isValidForm()) {
      props.save({
        ...item,
      })
      clearFieldsForm()
    }
  }

  const cancel = () => {
    props.cancel()
  }
  console.log({ codeRegistered })
  return (
    <>
      <CContainer fluid>
        <CForm className="row g-3 needs-validation" noValidate>
          <CRow style={{ marginTop: '40px' }}>
            <CCol xs="12" lg="4">
              <CFormInput
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
            <CCol xs="12" lg="4">
              <CFormInput
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
          </CRow>
          <CRow>
            <CCol xs="12" lg="4">
              <CFormSelect
                label="Categoria"
                name="categoryId"
                value={item.categoryId}
                required
                onChange={(event) => onChangeField(event)}
                aria-label="Default select example"
                options={['Seleccione la categoria', ...itemCategories]}
              />
            </CCol>
            <CCol xs="12" lg="4">
              <CFormInput
                label="Unidades"
                type="number"
                name="units"
                value={item.units}
                feedbackInvalid="Campo obligatorio"
                invalid={failedValidations.units}
                required
                onChange={(event) => onChangeField(event)}
              />
            </CCol>
            <CCol xs="12" lg="4">
              <CFormInput
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
          <CRow className="mt-5">
            <CCol xs="8" lg="2">
              <CButton variant="outline" color="success" type="button" onClick={() => save()}>
                {itemGlobal ? 'ACTUALIZAR' : 'GUARDAR'}
              </CButton>
            </CCol>
            <CCol xs="4" lg="2">
              <CButton variant="outline" color="secondary" onClick={() => cancel()}>
                CANCELAR
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
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
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
}
