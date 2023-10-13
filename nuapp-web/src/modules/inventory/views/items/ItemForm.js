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

const initPriceRatioUUID = getUUID()
const itemInitialState = {
  name: '',
  code: '',
  description: '',
  categoryId: '',
  sku: '',
  reorderPoint: '',
  laboratory: '',
  pricesRatio: [
    {
      measurementUnit: '',
      price: '',
      cost: '',
      hash: initPriceRatioUUID,
      main: initPriceRatioUUID,
      multiplicity: '',
    },
  ],
  expirationControl: [
    {
      lotUnits: '',
      lot: '',
      expirationDate: '',
      id: getUUID(),
    },
  ],
}

function ItemForm(props) {
  const dispatch = useDispatch()
  const itemCategories = useSelector((state) => state.itemCategories.itemCategories)
  const measurementUnits = useSelector((state) => state.invEnumerations.invEnumeration)
  const codeRegistered = useSelector((state) => state.items.existsByCode)
  const saving = useSelector((state) => state.items.saving)
  const [item, setItem] = useState(itemInitialState)
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    name: false,
    reorderPoint: false,
    categoryId: false,
  })
  const [modal, setModal] = useState(false)
  const confirmDialogRef = useRef()

  useEffect(() => {
    if (props.item) {
      let itemToSet = null
      if (props.copying) {
        itemToSet = {
          ...props.item,
          code: '',
        }
        delete itemToSet._id
      } else itemToSet = props.item
      setItem(itemToSet)
    }
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
    const { name, code, description, categoryId, pricesRatio, expirationControl } = {
      ...item,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.code = !code || codeRegistered
    failedValidationsObj.description = !description
    failedValidationsObj.name = !name
    failedValidationsObj.categoryId = !categoryId

    pricesRatio?.forEach((priceRatio) => {
      failedValidationsObj['measurementUnit' + priceRatio.hash] = !priceRatio.measurementUnit
      failedValidationsObj['price' + priceRatio.hash] =
        priceRatio.price <= 0 || Number.isNaN(+priceRatio.price)
      failedValidationsObj['cost' + priceRatio.hash] =
        priceRatio.cost <= 0 || Number.isNaN(+priceRatio.cost)
      failedValidationsObj['multiplicity' + priceRatio.hash] =
        !priceRatio.multiplicity || Number.isNaN(+priceRatio.multiplicity)
    })

    expirationControl?.forEach((expControl) => {
      failedValidationsObj['lot' + expControl.id] = !expControl.lot
      failedValidationsObj['lotUnits' + expControl.id] =
        expControl.lotUnits < 0 || Number.isNaN(+expControl.lotUnits)
      failedValidationsObj['expirationDate' + expControl.id] = !expControl.expirationDate
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
    const newItem = getNewItem()
    if ((item.pricesRatio ?? []).length === 0) {
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
          newItem,
        ],
      })
      return
    }
    setItem({
      ...item,
      pricesRatio: [...(item.pricesRatio ?? []), newItem],
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

  const handleChangeExpControl = (event, id, index) => {
    const {
      target: { name, value },
    } = event
    let expControlArray = [...item.expirationControl]
    let expControlClone = expControlArray.find((expControl) => expControl.id === id)
    expControlClone = {
      ...expControlClone,
      [name]: value,
    }
    expControlArray[index] = expControlClone
    setItem({
      ...item,
      expirationControl: expControlArray,
    })
  }

  const handleAddExpirationControl = () => {
    const newExpirationControl = getNewExpirationControl()
    setItem({
      ...item,
      expirationControl: [...(item.expirationControl ?? []), newExpirationControl],
    })
  }

  const handleDeleteExpirationControl = (id) => {
    let expirationControlClone = [...item.expirationControl]
    const expirationControlNew = expirationControlClone.filter((priceRatio) => priceRatio.id !== id)
    setItem({ ...item, expirationControl: expirationControlNew })
  }

  function getNewItem() {
    return { measurementUnit: '', price: '', cost: '', hash: getUUID(), main: '', multiplicity: 1 }
  }

  function getNewExpirationControl() {
    return { lotUnits: '', lot: '', expirationDate: '', id: getUUID() }
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
                <CCol xs="12" lg="3">
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
                <CCol xs="12" lg="3">
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
                <CCol xs="12" lg="6">
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
                <CCol xs="12" lg="3">
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
                <CCol xs="12" lg="3">
                  <FormInput
                    label="Laboratorio (Opcional)"
                    type="text"
                    uppercase="true"
                    name="laboratory"
                    value={item.laboratory}
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="3">
                  <CFormInput
                    label="Punto de recompra"
                    type="tel"
                    min={1}
                    name="reorderPoint"
                    value={item.reorderPoint}
                    invalid={failedValidations.reorderPoint}
                    feedbackInvalid="Campo obligatorio"
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="3">
                  <CFormInput
                    label="SKU"
                    type="text"
                    name="sku"
                    value={item.sku}
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CRow className="my-2">
                    <CCol xs="12" lg="12" className="fw-semibold">
                      Relación de precios
                    </CCol>
                  </CRow>
                  {item.pricesRatio?.map((priceRatio, index) => (
                    <CRow key={priceRatio.hash}>
                      <CCol
                        xs="12"
                        lg={{ offset: 0, span: item.pricesRatio?.length === 1 ? 3 : 3 }}
                      >
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
                          <CCol xs={{ offset: 0, span: item.pricesRatio?.length > 1 ? 10 : 12 }}>
                            <CFormSelect
                              label="U. de medida"
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
                      <CCol xs="12" lg="3">
                        <CurrencyFormInput
                          label="Precio"
                          type="tel"
                          name="price"
                          value={priceRatio.price}
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['price' + priceRatio.hash]}
                          required
                          onChange={(event) =>
                            handleChangePricesRatio(event, priceRatio.hash, index)
                          }
                        />
                      </CCol>
                      <CCol xs="12" lg="3">
                        <CurrencyFormInput
                          label="Costo"
                          type="tel"
                          name="cost"
                          value={priceRatio.cost}
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['cost' + priceRatio.hash]}
                          onChange={(event) =>
                            handleChangePricesRatio(event, priceRatio.hash, index)
                          }
                        />
                      </CCol>
                      <CCol
                        xs="12"
                        lg={{ offset: 0, span: item.pricesRatio?.length === 1 ? 3 : 2 }}
                      >
                        <FormInput
                          label="Multiplo"
                          type="tel"
                          name="multiplicity"
                          min={1}
                          value={priceRatio.multiplicity}
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['multiplicity' + priceRatio.hash]}
                          onChange={(event) =>
                            handleChangePricesRatio(event, priceRatio.hash, index)
                          }
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
                </CCol>
                <CCol md="12">
                  <CRow className="my-2">
                    <CCol xs="12" lg="12" className="fw-semibold">
                      Control de vencimiento
                    </CCol>
                  </CRow>
                  {item.expirationControl?.map((expControl, index) => (
                    <CRow key={index}>
                      <CCol
                        xs="12"
                        lg={{ offset: 0, span: item.expirationControl?.length === 1 ? 4 : 3 }}
                      >
                        <FormInput
                          label="Stock"
                          type="tel"
                          name="lotUnits"
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['lotUnits' + expControl.id]}
                          value={expControl.lotUnits}
                          onChange={(event) => handleChangeExpControl(event, expControl.id, index)}
                        />
                      </CCol>
                      <CCol xs="12" lg="4">
                        <FormInput
                          className="text-uppercase"
                          label="Lote"
                          type="text"
                          uppercase="true"
                          name="lot"
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['lot' + expControl.id]}
                          value={expControl.lot}
                          onChange={(event) => handleChangeExpControl(event, expControl.id, index)}
                        />
                      </CCol>
                      <CCol xs="12" lg="4">
                        <CFormInput
                          label="Fecha de vencimiento"
                          type="date"
                          name="expirationDate"
                          feedbackInvalid="Campo obligatorio"
                          invalid={failedValidations['expirationDate' + expControl.id]}
                          value={expControl.expirationDate}
                          onChange={(event) => handleChangeExpControl(event, expControl.id, index)}
                        />
                      </CCol>
                      {item.expirationControl?.length > 1 && (
                        <CCol xs="12" lg="1">
                          <CButton
                            color="ligth"
                            className="mt-4"
                            onClick={() => handleDeleteExpirationControl(expControl.id)}
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
                        onClick={handleAddExpirationControl}
                      >
                        AGREGAR CONTROL
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter className="mt-2">
            <div className="d-none d-lg-block">
              <CRow className="mt-0">
                <CCol className="text-center" xs="8" lg={{ offset: 4, span: 4 }}>
                  <CButton color="success" type="button" disabled={saving} onClick={() => save()}>
                    {props.item && props.item?.id ? 'EDITAR' : 'GUARDAR'}
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
  copying: PropTypes.bool,
}
