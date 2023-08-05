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
  CFormCheck,
} from '@coreui/react'
import { getItemCategories } from 'src/modules/inventory/services/item-categories.service'
import { existByCode } from '../../services/items.service'
import ConfirmDialog from 'src/components/shared/ConfirmDialog'
import CurrencyFormInput from '../../../../components/shared/CurrencyFormInput'
import FormInput from '../../../../components/shared/FormInput'
import { getInvEnumerationByCode } from '../../services/inv-enumerations.service'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { getUUID } from 'src/utils'

const itemInitialState = {
  name: '',
  code: '',
  description: '',
  categoryId: '',
  stock: '',
  reorderPoint: '',
  pricesRatio: [{ measurementUnit: '', price: '', cost: '', hash: getUUID() }],
}

function ItemForm(props) {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const measurementUnits = useSelector((state) => state.invEnumerations.invEnumeration)
  const codeRegistered = useSelector((state) => state.items.existsByCode)
  const [item, setItem] = useState(itemInitialState)
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    name: false,
    stock: false,
    reorderPoint: false,
    categoryId: false,
  })
  const [modal, setModal] = useState(false)
  const confirmDialogRef = useRef()

  useEffect(() => {
    props.item && setItem(props.item)
    dispatch(getItemCategories({ parse: true }))
    dispatch(getInvEnumerationByCode('UDM'))
  }, [dispatch, props.item])

  // INIT
  const oldCode = props.item?.code
  const toggle = () => setModal(!modal)
  const validateCodeExistence = (code) => {
    if (oldCode !== code) dispatch(existByCode(code))
  }

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )

  const isValidForm = () => {
    const { name, code, description, stock, categoryId, pricesRatio } = {
      ...item,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.code = !code || codeRegistered
    failedValidationsObj.description = !description
    failedValidationsObj.name = !name
    failedValidationsObj.stock = !stock
    failedValidationsObj.categoryId = !categoryId

    pricesRatio?.forEach((priceRatio) => {
      failedValidationsObj['measurementUnit' + priceRatio.hash] = !priceRatio.measurementUnit
      failedValidationsObj['price' + priceRatio.hash] = priceRatio.price <= 0
      failedValidationsObj['cost' + priceRatio.hash] = priceRatio.cost <= 0
    })

    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const save = async () => {
    if (isValidForm()) {
      props.onSave({
        ...item,
      })
      setItem(itemInitialState)
    }
  }

  const cancel = () => {
    confirmDialogRef.current.show(true)
  }

  const handleResponseCancel = (sureCancel) => {
    if (sureCancel) {
      props.onCancel()
      setItem(itemInitialState)
      return
    }
    confirmDialogRef.current.show(false)
  }

  const handleChangeField = ({ target: { name, value } }) => {
    setItem({
      ...item,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
    if (name === 'code') validateCodeExistence(value)
  }

  const handleChangePricesRatio = (event, hash, index) => {
    const {
      target: { name, value },
    } = event
    let pricesRatioArray = [...item.pricesRatio]
    if (name === 'main') {
      pricesRatioArray = pricesRatioArray.map((priceRatio) => ({
        ...priceRatio,
        [name]: value,
      }))
    } else {
      let priceRatioClone = pricesRatioArray.find((priceRatio) => priceRatio.hash === hash)
      priceRatioClone = {
        ...priceRatioClone,
        [name]: value,
      }
      pricesRatioArray[index] = priceRatioClone
    }
    setItem({
      ...item,
      pricesRatio: pricesRatioArray,
    })
  }

  const handleAddPriceRatio = () => {
    if ((item.pricesRatio ?? []).length === 0) {
      const newItem = getNewItem()
      setItem({
        ...item,
        pricesRatio: [
          {
            ...newItem,
            main: newItem.hash,
          },
        ],
      })
      return
    }
    if (item.pricesRatio?.length === 1) {
      setItem({
        ...item,
        pricesRatio: [
          {
            ...item.pricesRatio[0],
            main: item.pricesRatio[0].hash,
          },
          getNewItem(),
        ],
      })
      return
    }
    setItem({
      ...item,
      pricesRatio: [...(item.pricesRatio ?? []), getNewItem()],
    })
  }

  const handleDeletePriceRatio = (hash) => {
    let pricesRatioClone = [...item.pricesRatio]
    const priceRatioToDelete = pricesRatioClone.find((priceRatio) => priceRatio.hash === hash)
    const pricesRatioNew = pricesRatioClone.filter((priceRatio) => priceRatio.hash !== hash)
    if (priceRatioToDelete.main === priceRatioToDelete.hash) {
      pricesRatioNew[0] = {
        ...pricesRatioNew[0],
        main: pricesRatioNew[0].hash,
      }
    }
    setItem({ ...item, pricesRatio: pricesRatioNew })
  }

  function getNewItem() {
    return { measurementUnit: '', price: '', cost: '', hash: getUUID(), main: '' }
  }

  return (
    <>
      <CContainer fluid>
        <CCard>
          <div className="d-none d-lg-block">
            <CCardHeader>{props.item ? 'EDITANDO' : 'CREANDO'} ITEM</CCardHeader>
          </div>
          <div className="py-1 d-lg-none">
            <CRow className="m-1">
              <CCol xs="3" lg={{ offset: 4, span: 4 }}>
                <CButton variant="outline" color="secondary" onClick={() => cancel()}>
                  CANCELAR
                </CButton>
              </CCol>
              <CCol xs={{ offset: 5, span: 4 }}>
                <CButton color="success" type="button" onClick={() => save()}>
                  {props.item ? 'EDITAR' : 'GUARDAR'}
                </CButton>
              </CCol>
            </CRow>
          </div>
          <CCardBody>
            <CForm className="row g-3 needs-validation" noValidate>
              <CRow>
                <CCol xs="12" lg="4">
                  <FormInput
                    label="Código"
                    type="text"
                    uppercase="true"
                    name="code"
                    value={item.code}
                    feedback={
                      codeRegistered ? 'El código ya se encuentra registrado' : 'Campo obligatorio'
                    }
                    invalid={codeRegistered || failedValidations.code}
                    required
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <FormInput
                    className="text-uppercase"
                    label="Nombre"
                    type="text"
                    uppercase="true"
                    name="name"
                    value={item.name}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.name}
                    required
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <FormInput
                    className="text-uppercase"
                    label="Descripción"
                    type="text"
                    uppercase="true"
                    name="description"
                    value={item.description}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.description}
                    required
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12" lg="4">
                  <CFormInput
                    label="Stock"
                    type="number"
                    name="stock"
                    value={item.stock}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.stock}
                    required
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormInput
                    label="Punto de recompra (Opcional)"
                    type="number"
                    name="reorderPoint"
                    value={item.reorderPoint}
                    invalid={failedValidations.reorderPoint}
                    onChange={(event) => handleChangeField(event)}
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
                    onChange={(event) => handleChangeField(event)}
                    aria-label="Default select example"
                    options={['Seleccione la categoria', ...itemCategories]}
                  />
                </CCol>
              </CRow>
              <CRow className="my-2">
                <CCol xs="12" lg="12" className="fw-semibold">
                  Relación de precios
                </CCol>
              </CRow>
              {item.pricesRatio?.map((priceRatio, index) => (
                <CRow key={priceRatio.hash}>
                  <CCol xs="12" lg="4">
                    <CRow>
                      {item.pricesRatio?.length > 1 && (
                        <CCol xs="1" className="pt-4">
                          <CFormCheck
                            type="radio"
                            name="main"
                            value={priceRatio.hash}
                            checked={priceRatio.main === priceRatio.hash}
                            onChange={(event) =>
                              handleChangePricesRatio(event, priceRatio.hash, index)
                            }
                          />
                        </CCol>
                      )}
                      <CCol xs={{ offset: 0, span: item.pricesRatio?.length > 1 ? 11 : 12 }}>
                        <CFormSelect
                          label="Unidad de medida"
                          name="measurementUnit"
                          value={priceRatio.measurementUnit}
                          required
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['measurementUnit' + priceRatio.hash]}
                          onChange={(event) =>
                            handleChangePricesRatio(event, priceRatio.hash, index)
                          }
                          aria-label="Default select example"
                          options={['Seleccione...', ...(measurementUnits?.values ?? [])]}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs="12" lg="4">
                    <CurrencyFormInput
                      label="Precio"
                      type="number"
                      name="price"
                      value={priceRatio.price}
                      feedbackInvalid="Campo obligatorio"
                      invalid={failedValidations['price' + priceRatio.hash]}
                      required
                      onChange={(event) => handleChangePricesRatio(event, priceRatio.hash, index)}
                    />
                  </CCol>
                  <CCol xs="12" lg={{ offset: 0, span: item.pricesRatio?.length === 1 ? 4 : 3 }}>
                    <CurrencyFormInput
                      label="Costo"
                      type="number"
                      name="cost"
                      value={priceRatio.cost}
                      feedbackInvalid="Campo obligatorio"
                      invalid={failedValidations['cost' + priceRatio.hash]}
                      onChange={(event) => handleChangePricesRatio(event, priceRatio.hash, index)}
                    />
                  </CCol>
                  {item.pricesRatio?.length > 1 && (
                    <CCol xs="12" lg="1">
                      <CButton
                        color="ligth"
                        className="mt-4"
                        onClick={() => handleDeletePriceRatio(priceRatio.hash)}
                      >
                        <CIcon icon={cilTrash} size="sm" />
                      </CButton>
                    </CCol>
                  )}
                </CRow>
              ))}
              <CRow className="my-2">
                <CCol xs="12" lg="4">
                  <CButton
                    variant="outline"
                    color="success"
                    type="button"
                    onClick={handleAddPriceRatio}
                  >
                    AGREGAR RELACIÓN
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter className="mt-2">
            <div className="d-none d-lg-block">
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
            </div>
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
