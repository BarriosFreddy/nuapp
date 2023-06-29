import React, { useEffect, useRef, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CFormInput,
  CContainer,
  CCardBody,
  CCard,
  CCardTitle,
  CCardHeader,
  CTableFoot,
  CButton,
  CFormSelect,
  CRow,
  CCol,
} from '@coreui/react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../services/items.service'
import CONSTANTS from 'src/constants'
import { useDidUpdateControl } from '../../../../hooks/useDidUpdateControl'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { sendWarningToast, sendSuccessToast } from '../../../shared/services/notification.service'
import { getDateObject } from 'src/utils'
import { formatCurrency } from '../../../../utils/index'
import { saveAll, getPurchaseOrders } from '../../services/purchase-orders.service'
import PurchaseOrderList from './PurchaseOrderList'

const initialPurchaseOrderItems = {
  itemCode: '',
  itemId: '',
  itemName: '',
  itemDescription: '',
  itemCost: '',
  itemMeasurementUnit: '',
  units: '',
}

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

const PurchaseOrder = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const fetching = useSelector((state) => state.items.fetching)
  const saving = useSelector((state) => state.purchaseOrders.saving)
  const purchaseOrders = useSelector((state) => state.purchaseOrders.purchaseOrders)
  const saveSuccess = useSelector((state) => state.purchaseOrders.saveSuccess)
  const [purchaseOrderItems, setPurchaseOrderItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState([])
  const [listing, setListing] = useState(false)
  const inputNewRef = useRef()
  const code = '0000000001'

  useEffect(() => {
    setPurchaseOrderItems([initialPurchaseOrderItems])
  }, [])

  useDidUpdateControl(() => {
    fillFields()
  }, fetching)

  useDidUpdateControl(() => {
    if (saveSuccess) {
      sendSuccessToast(dispatch, {
        message: 'Guardado exitoso!',
      })
      setPurchaseOrderItems([{ ...initialPurchaseOrderItems }])
      return
    } else
      sendWarningToast(dispatch, {
        message: 'No se pudieron guardar los datos!',
      })
  }, saving)

  // INIT

  const onChangeField = ({ target: { name, value } }, purchaseOrder, index) => {
    setCurrentIndex(index)
    const purchaseOrderUpdated = {
      ...purchaseOrder,
      [name]: value,
    }
    const purchaseOrderesClone = replaceItem(purchaseOrderUpdated, index)
    setPurchaseOrderItems(purchaseOrderesClone)
  }

  const handleNew = () => {
    setPurchaseOrderItems([...purchaseOrderItems, initialPurchaseOrderItems])
    setImmediate(() => inputNewRef && inputNewRef.current.focus())
  }

  const handleDelete = (index) => {
    let purchaseOrderesClone = [...purchaseOrderItems]
    if (index >= 0) purchaseOrderesClone.splice(index, 1)
    setPurchaseOrderItems(purchaseOrderesClone)
  }

  const onKeyUpCodeField = ({ keyCode }, purchaseOrder) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) searchByCode(purchaseOrder.itemCode)
  }

  const searchByCode = (code) => {
    if (!!code) dispatch(getItems({ code, page: 1, size: 1 }, false))
  }

  const handleSave = () => {
    if (validForm()) {
      const items = transformItems(purchaseOrderItems)
      dispatch(
        saveAll({
          code,
          comments: '',
          items,
          supplierId: '649b892cdfc56ae3c8d56d59',
          createdAt: getDateObject(),
        }),
      )
    }
  }

  function validForm() {
    let isOk = true
    if (purchaseOrderItems.some((purchaseOrderItem) => purchaseOrderItem.itemName.trim() === '')) {
      sendWarningToast(dispatch, {
        message: `Hay registros no validos!`,
      })
      isOk = false
    }
    if (purchaseOrderItems.some((purchaseOrderItem) => purchaseOrderItem.units <= 0)) {
      sendWarningToast(dispatch, {
        message: `Por favor ingrese las unidades faltantes`,
      })
      isOk = false
    }
    return isOk
  }

  function transformItems(purchaseOrders) {
    if (!Array.isArray(purchaseOrders)) return purchaseOrders
    return purchaseOrders.map(({ itemName, itemId, itemCost, itemMeasurementUnit, units }) => ({
      name: itemName,
      _id: itemId,
      cost: itemCost,
      units,
      measurementUnit: itemMeasurementUnit,
    }))
  }

  function replaceItem(newKardex, index) {
    let purchaseOrderItemsClone = [...purchaseOrderItems]
    if (index >= 0) purchaseOrderItemsClone.splice(index, 1, newKardex)
    return purchaseOrderItemsClone
  }

  function fillFields() {
    if (items.length > 0) {
      const { _id, code, name, description, cost, stock } = items[0]
      if (purchaseOrderItems.some((purchaseOrderItem) => purchaseOrderItem.itemId === _id)) {
        sendWarningToast(dispatch, {
          message: `El item "${name}" ya está agregado!`,
        })
        return
      }

      const purchaseOrderItemsClone = replaceItem(
        {
          itemCode: code,
          itemId: _id,
          itemName: name,
          itemDescription: description,
          units: '',
          itemCost: cost,
          itemStock: stock,
        },
        currentIndex,
      )
      setPurchaseOrderItems(purchaseOrderItemsClone)
      return
    }
    sendWarningToast(dispatch, {
      message: `Item no encontrado`,
    })
  }

  const handleList = () => {
    dispatch(getPurchaseOrders())
    setListing(true)
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <Helmet>
          <title>ORDENES DE COMPRA</title>
        </Helmet>
        <CCard className="mt-6 shadow border-10">
          <CCardHeader>
            <CCardTitle>
              <CRow>
                <CCol lg="3">ORDENES DE COMPRA</CCol>
                <CCol lg={{ offset: 7, span: 2 }} className="text-end">
                  {!listing && (
                    <CButton color="link" onClick={handleList}>
                      HISTORIAL
                    </CButton>
                  )}
                  {listing && (
                    <CButton color="link" onClick={() => setListing(false)}>
                      REGRESAR
                    </CButton>
                  )}
                </CCol>
              </CRow>
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            {!listing && (
              <>
                <CRow className="mb-3">
                  <CCol lg="2" className="fw-semibold">
                    Código serial
                  </CCol>
                  <CCol lg="2">{code}</CCol>
                  <CCol lg="2" className="fw-semibold">
                    Proveedor
                  </CCol>
                  <CCol lg="2">Distrireal de la costa</CCol>
                </CRow>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Código</CTableHeaderCell>
                      <CTableHeaderCell>Nombre</CTableHeaderCell>
                      <CTableHeaderCell>Stock</CTableHeaderCell>
                      <CTableHeaderCell>Costo</CTableHeaderCell>
                      <CTableHeaderCell>Unidades</CTableHeaderCell>
                      <CTableHeaderCell>U. de medida</CTableHeaderCell>
                      <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {purchaseOrderItems.map((purchaseOrder, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell width={200}>
                          <CFormInput
                            ref={inputNewRef}
                            type="number"
                            formNoValidate
                            required
                            name="itemCode"
                            value={purchaseOrder.itemCode}
                            onChange={(event) => onChangeField(event, purchaseOrder, index)}
                            onKeyUp={(event) => onKeyUpCodeField(event, purchaseOrder)}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="text-uppercase">
                          <CRow>
                            <CCol className="text-uppercase">{purchaseOrder.itemName}</CCol>
                          </CRow>
                          <CRow>
                            <CCol className="text-uppercase" style={{ fontSize: 10 }}>
                              {purchaseOrder.itemDescription}
                            </CCol>
                          </CRow>
                        </CTableDataCell>
                        <CTableDataCell width={150}>{purchaseOrder.itemStock}</CTableDataCell>
                        <CTableDataCell width={150}>
                          {formatCurrency(purchaseOrder.itemCost)}
                        </CTableDataCell>
                        <CTableDataCell width={150}>
                          <CFormInput
                            type="number"
                            formNoValidate
                            required
                            name="units"
                            value={purchaseOrder.units}
                            onChange={(event) => onChangeField(event, purchaseOrder, index)}
                          />
                        </CTableDataCell>
                        <CTableDataCell width={150}>
                          <CFormSelect
                            name="itemMeasurementUnit"
                            value={purchaseOrder.itemMeasurementUnit}
                            required
                            feedbackInvalid="Campo obligatorio"
                            onChange={(event) => onChangeField(event, purchaseOrder, index)}
                            options={[
                              { label: 'CAJA', value: 'CAJA' },
                              { label: 'TIRA', value: 'TIRA' },
                              { label: 'FRASCO', value: 'FRASCO' },
                              { label: 'AMPOLLA', value: 'AMPOLLA' },
                              { label: 'TABLETA', value: 'TABLETA' },
                              { label: 'BOLSA', value: 'BOLSA' },
                            ]}
                          />
                        </CTableDataCell>
                        <CTableDataCell width={100}>
                          {purchaseOrderItems.length > 1 && (
                            <CButton color="ligth" onClick={() => handleDelete(index)}>
                              <CIcon icon={cilTrash} size="sm" />
                            </CButton>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                    <CTableRow>
                      <CTableHeaderCell colSpan={12}>
                        <CButton variant="outline" color="info" onClick={handleNew}>
                          NUEVO REGISTRO
                        </CButton>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableBody>
                  <CTableFoot>
                    <CTableRow>
                      <CTableHeaderCell colSpan={12} className="text-center">
                        <CButton color="success" onClick={handleSave}>
                          GUARDAR
                        </CButton>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </>
            )}
            {listing && <PurchaseOrderList purchaseOrders={purchaseOrders}></PurchaseOrderList>}
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default PurchaseOrder

PurchaseOrder.propTypes = {}
