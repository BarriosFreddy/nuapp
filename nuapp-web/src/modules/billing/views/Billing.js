import React, { useState, useEffect, useCallback } from 'react'
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
import { saveBilling } from '../../../modules/billing/services/billings.service'
import { setShowToast, setSidebarUnfoldable, setToastConfig } from 'src/app.slice'
import { setSaveSuccess } from '../reducers/billings.reducer'
import { Helmet } from 'react-helmet'

function Billing() {
  const saveSuccess = useSelector((state) => state.billing.saveSuccess)

  const dispatch = useDispatch()
  let [items, setItems] = useState([])
  let [receivedAmount, setReceivedAmount] = useState(0)
  let [total, setTotal] = useState(0)
  let [itemUnits, setItemUnits] = useState({})
  let [paying, setPaying] = useState(false)
  const isReceivedLTTotal = receivedAmount < total
  const hasNotItems = items.length <= 0

  useEffect(() => {
    dispatch(setSidebarUnfoldable(true))
  }, [dispatch])

  const clear = useCallback(() => {
    setItems([])
    setReceivedAmount(0)
    setTotal(0)
    setItemUnits({})
    dispatch(
      setToastConfig({
        message: 'Guardado exitoso!',
        color: 'success',
        delay: 2000,
      }),
    )
    dispatch(setShowToast(true))
    dispatch(setSaveSuccess(false))
  }, [dispatch])

  useEffect(() => {
    if (saveSuccess) clear()
  }, [saveSuccess, clear])

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

  const handleCharge = () => {
    setPaying(true)
  }

  const handleSave = async () => {
    if (isReceivedLTTotal) {
      dispatch(
        setToastConfig({
          message: 'Revisa el monto recibido y el total',
          color: 'warning',
        }),
      )
      dispatch(setShowToast(true))
      return
    }
    if (hasNotItems) {
      dispatch(
        setToastConfig({
          message: 'No hay productos por facturar',
          color: 'warning',
        }),
      )
      dispatch(setShowToast(true))
      return
    }
    dispatch(
      saveBilling({
        receivedAmount,
        billAmount: total,
        items: getItemsData(items),
      }),
    )
    setPaying(false)
  }

  const getItemsData = () =>
    items.map(({ _id, name, code, price, units, measurementUnit }) => ({
      _id,
      name,
      code,
      price,
      units,
      measurementUnit,
    }))

  const hanndleReceivedAmount = (receivedAmount) => setReceivedAmount(receivedAmount)
  return (
    <>
      <CContainer className="mt--6" fluid>
        <Helmet>
          <title>Billing</title>
        </Helmet>
        <CRow>
          <CCol lg="5">
            <CCard className="shadow border-10" style={{ height: '78vh' }}>
              <CCardBody style={{ overflow: 'auto' }}>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Producto</CTableHeaderCell>
                      <CTableHeaderCell>Cantidad</CTableHeaderCell>
                      <CTableHeaderCell>Subtotal</CTableHeaderCell>
                      <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {items.map(({ code, name, price }) => (
                      <CTableRow key={code}>
                        <CTableDataCell xs="12">
                          <CRow>
                            <CCol className="text-uppercase">{name}</CCol>
                          </CRow>
                          <CRow>
                            <CCol style={{ fontSize: 10 }}>{code}</CCol>
                          </CRow>
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
          <CCol lg="7">
            <CCard className="shadow border-10" style={{ height: '78vh', overflowY: 'auto' }}>
              <CCardBody>
                {!paying && <BillingForm addItem={addItem} />}
                {paying && <PaymentComp setReceivedAmount={hanndleReceivedAmount} total={total} />}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="mt-3 align-items-end">
          <CCard className="shadow border-10">
            <CCardBody>
              <CRow className="mt-3">
                <CCol lg="5">
                  <div className="d-grid gap-2">
                    <CButton
                      size="lg"
                      color={paying ? 'success' : 'primary'}
                      onClick={paying ? handleSave : handleCharge}
                      disabled={paying ? isReceivedLTTotal : hasNotItems}
                    >
                      {paying ? 'FACTURAR' : 'COBRAR'}
                    </CButton>
                  </div>
                </CCol>
                <CCol lg="6" className="fs-1">
                  <span>POR COBRAR</span>&nbsp;
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
