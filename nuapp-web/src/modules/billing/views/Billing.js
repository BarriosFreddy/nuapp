import React, { useState, useEffect, useRef } from 'react'
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
import { setShowHeader, setSidebarUnfoldable } from 'src/app.slice'
import { Helmet } from 'react-helmet'
import { sendToast } from '../../shared/services/notification.service'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useDidUpdateControl } from '../../../hooks/useDidUpdateControl'
dayjs.extend(utc)

function Billing() {
  const saveSuccess = useSelector((state) => state.billing.saveSuccess)
  const saving = useSelector((state) => state.billing.saving)
  const dispatch = useDispatch()
  let [items, setItems] = useState([])
  let [receivedAmount, setReceivedAmount] = useState(0)
  let [total, setTotal] = useState(0)
  let [itemUnits, setItemUnits] = useState({})
  let [paying, setPaying] = useState(false)
  const cargeButtonRef = useRef()
  const isReceivedLTTotal = receivedAmount < total
  const hasNotItems = items.length <= 0

  useEffect(() => {
    dispatch(setShowHeader(false))
    dispatch(setSidebarUnfoldable(true))
    return () => {
      dispatch(setShowHeader(true))
    }
  }, [dispatch])

  useDidUpdateControl(
    () => {
      if (saveSuccess) {
        setItems([])
        setReceivedAmount(0)
        setTotal(0)
        setItemUnits({})
        sendToast(dispatch, { message: 'Guardado exitosamente!' })
        setPaying(false)
      } else {
        sendToast(dispatch, { message: 'No se pudo guardar los datos', color: 'danger' })
      }
    },
    saving,
    [saveSuccess],
  )

  // Init

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
      sendToast(dispatch, { message: 'Revisa el monto recibido y el total', color: 'warning' })
      return
    }
    if (hasNotItems) {
      sendToast(dispatch, { message: 'No hay productos por facturar', color: 'warning' })
      return
    }
    dispatch(
      saveBilling({
        createdAt: {
          date: dayjs().utc().valueOf(),
          offset: dayjs().utcOffset() * 60000,
        },
        receivedAmount,
        billAmount: total,
        items: getItemsData(items),
      }),
    )
  }

  const getItemsData = () =>
    items.map(({ _id, name, code, price, measurementUnit }) => ({
      _id,
      name,
      code,
      price,
      units: itemUnits[code],
      measurementUnit,
    }))

  const hanndleReceivedAmount = (receivedAmount) => setReceivedAmount(receivedAmount)
  return (
    <>
      <CContainer className="mt-3" fluid>
        <Helmet>
          <title>FACTURACIÓN</title>
        </Helmet>
        <CRow>
          <CCol lg="6">
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
          <CCol lg="6">
            <CCard className="shadow border-10" style={{ height: '78vh', overflowY: 'auto' }}>
              <CCardBody>
                {!paying && <BillingForm addItem={addItem} />}
                {paying && (
                  <PaymentComp
                    cargeButtonRef={cargeButtonRef}
                    setReceivedAmount={hanndleReceivedAmount}
                    total={total}
                  />
                )}
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
                      ref={cargeButtonRef}
                      tabIndex={0}
                      type="button"
                      size="lg"
                      color={paying ? 'success' : 'primary'}
                      onClick={paying ? handleSave : handleCharge}
                      disabled={paying ? saving : hasNotItems}
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
