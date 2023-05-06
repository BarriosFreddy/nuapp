/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
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
import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env

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
  const [item, setItem] = useState(itemInitialState)
  const [categories, setCategories] = useState([])
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
    ;(async () => {
      let { data } = await axios({
        url: `${REACT_APP_BASE_URL}/categories`,
        withCredentials: true,
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        data = data.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))
        console.log(data)
        setCategories(data)
      }
    })()
  }, [])

  const onChangeField = ({ target: { name, value } }) => {
    setItem({
      ...item,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
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
    failedValidationsObj.code = !code
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
      await axios({
        url: `${REACT_APP_BASE_URL}/items`,
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ...item,
        },
      })
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
                type="number"
                name="code"
                value={item.code}
                feedback="Campo obligatorio"
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
                value={item.name}
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
                value={item.description}
                feedbackInvalid="Campo obligatorio"
                invalid={failedValidations.description}
                required
                onChange={(event) => onChangeField(event)}
              />
            </CCol>
            <CCol xs="12" lg="3">
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
          <CRow style={{ marginTop: '40px' }}>
            <CCol xs="12" lg="3">
              <CFormSelect
                label="Categoria"
                name="categoryId"
                value={item.categoryId}
                required
                onChange={(event) => onChangeField(event)}
                aria-label="Default select example"
                options={['Seleccione la categoria', ...categories]}
              />
            </CCol>
            <CCol xs="12" lg="3">
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
            <CCol xs="12" lg="3">
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
          <div style={{ margin: '20px' }} />
          <CRow style={{ margin: '1000px 0' }}>
            {/* <CCol lg="1">
            <CButton outline color="success" onClick={() => scanItem()}>
            ESCANEAR
            </CButton>
        </CCol> */}
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
      <CModal isOpen={modal} toggle={toggle}>
        <CModalHeader toggle={toggle} close={closeBtn}>
          Escaneando
        </CModalHeader>
        <CModalBody>
          <div id="reader" width="600px" style={{ maxWidth: '750px' }}></div>
        </CModalBody>
        <CModalFooter>
          <CButton Ccolor="secondary" onClick={toggle}>
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
}
