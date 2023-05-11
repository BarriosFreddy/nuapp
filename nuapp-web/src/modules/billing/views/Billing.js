import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import BillingForm from './BillingForm'
import { formatCurrency } from 'src/utils'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import PaymentComp from './Payment'
import { v4 as uuidV4 } from 'uuid'
import { saveBilling } from '../../../modules/billing/services/billings.service'
import { setShowToast, setToastConfig } from 'src/app.slice'
import { setSaveSuccess } from '../reducers/billings.reducer'

function Billing() {
  const saveSuccess = useSelector((state) => state.billing.saveSuccess)
  const dispatch = useDispatch()
  let [items, setItems] = useState([])
  let [receivedAmount, setReceivedAmount] = useState(0)
  let [total, setTotal] = useState(0)
  let [itemUnits, setItemUnits] = useState({})
  let [paying, setPaying] = useState(false)

  useEffect(() => {
    if (saveSuccess) clear()
  }, [saveSuccess])

  const addItem = async (item) => {
    let itemUnitsAdded = {}
    isAdded(item.code)
      ? (itemUnitsAdded[item.code] = itemUnits[item.code] + 1)
      : (itemUnitsAdded[item.code] = 1)
    itemUnitsAdded = { ...itemUnits, ...itemUnitsAdded }
    setItemUnits(itemUnitsAdded)
    const itemsAdded = [...items]
    if (!isAdded(item.code)) itemsAdded.unshift(item)
    setItems(itemsAdded)
    calculateTotal(itemsAdded, itemUnitsAdded)
  }

  const isAdded = (itemCode) => items.some(({ code }) => code === itemCode)

  const calculateTotal = (itemsAdded, itemUnitsAdded) => {
    const totalAmount = itemsAdded
      .map(({ price, code }) => price * itemUnitsAdded[code])
      .reduce((acc, value) => +acc + +value, 0)
    setTotal(totalAmount)
  }

  const deleteItem = (code) => {
    const itemsArray = Object.assign([], items)
    const itemUnitsAddedArray = Object.assign([], itemUnits)
    const itemIndex = itemsArray.findIndex((item) => item.code === code)
    delete itemUnitsAddedArray[code]
    if (itemIndex !== -1) itemsArray.splice(itemIndex, 1)
    setItems(itemsArray)
    setItemUnits(itemUnitsAddedArray)
    calculateTotal(itemsArray, itemUnitsAddedArray)
  }

  const onChangeField = ({ target: { name, value } }) => {
    const itemUnitsAdded = { ...itemUnits, [name]: value }
    setItemUnits(itemUnitsAdded)
    calculateTotal(items, itemUnitsAdded)
  }

  const save = async () => {
    if (isValid()) {
      dispatch(
        saveBilling({
          code: uuidV4(),
          billAmount: total,
          items: getItemsId(items),
        }),
      )
      return
    }
    dispatch(
      setToastConfig({
        message: 'Revisa la cantidad recibida y el total',
        color: 'warning',
      }),
    )
    dispatch(setShowToast(true))
  }

  function clear() {
    setItems([])
    setReceivedAmount(0)
    setTotal(0)
    setItemUnits({})
    setPaying(false)
    dispatch(
      setToastConfig({
        message: 'Guardado exitoso!',
        color: 'success',
        delay: 2000,
      }),
    )
    dispatch(setShowToast(true))
    dispatch(setSaveSuccess(false))
  }

  const getItemsId = () => items.map(({ _id }) => _id)

  const isValid = () => {
    return receivedAmount > 0 && receivedAmount >= total
  }

  const hanndleReceivedAmount = (receivedAmount) => setReceivedAmount(receivedAmount)

  function handleProceed() {
    if (items.length <= 0) {
      dispatch(
        setToastConfig({
          message: 'No hay productos por facturar',
          color: 'warning',
        }),
      )
      dispatch(setShowToast(true))
      return
    }
    setPaying(true)
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <CRow>
          <CCol>
            <CCard className="shadow border-10" style={{ height: '68vh' }}>
              <CCardBody style={{ overflow: 'auto' }}>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nombre</CTableHeaderCell>
                      <CTableHeaderCell>Código</CTableHeaderCell>
                      <CTableHeaderCell>Precio</CTableHeaderCell>
                      <CTableHeaderCell>Cantidad</CTableHeaderCell>
                      <CTableHeaderCell>Subtotal</CTableHeaderCell>
                      <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {items.map(({ code, name, price }) => (
                      <CTableRow key={code}>
                        <CTableDataCell xs="12" className="text-uppercase">
                          {name}
                        </CTableDataCell>
                        <CTableDataCell className="fs-6" xs="12">
                          {code}
                        </CTableDataCell>
                        <CTableDataCell xs="12" className="text-break">
                          {formatCurrency(price)}
                        </CTableDataCell>
                        <CTableDataCell colSpan={1}>
                          <CFormInput
                            style={{ maxWidth: 60 }}
                            type="number"
                            min={1}
                            formNoValidate
                            size="sm"
                            name={code}
                            value={itemUnits[code]}
                            onChange={(event) => onChangeField(event)}
                          />
                        </CTableDataCell>
                        <CTableDataCell xs="12" className="text-break">
                          {formatCurrency(price * itemUnits[code])}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton size="sm" color="ligth" onClick={() => deleteItem(code)}>
                            <CIcon icon={cilTrash} size="sm" />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard className="shadow border-10" style={{ height: '68vh' }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    {!paying && <BillingForm addItem={addItem} />}
                    {paying && (
                      <PaymentComp
                        setReceivedAmount={hanndleReceivedAmount}
                        total={total}
                      ></PaymentComp>
                    )}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="mt-3 align-items-end">
          <CCard className="shadow border-10">
            <CCardBody>
              <CRow>
                <CCol lg={{ span: 6, offset: 0 }}>
                  <div className="d-grid gap-2">
                    {!paying && (
                      <CButton size="lg" color="primary" onClick={handleProceed}>
                        FACTURAR
                      </CButton>
                    )}
                    {paying && (
                      <CButton size="lg" color="success" onClick={save}>
                        FACTURAR
                      </CButton>
                    )}
                  </div>
                </CCol>
                <CCol lg="6" className="fs-1">
                  <span style={{ fontWeight: 'bold' }}>POR COBRAR</span>&nbsp;
                  {formatCurrency(total)}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
    </>
  )
}

export default Billing
