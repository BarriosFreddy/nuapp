import React, { useState, useEffect, useRef } from 'react'
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
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import BillingForm from './BillingForm'
import Utils from 'src/utils'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import PaymentComp from './Payment'
import axios from 'axios'
import { v4 as uuidV4 } from 'uuid'

const { REACT_APP_BASE_URL } = process.env

const ToastMessage = (
  <CToast>
    <CToastHeader closeButton>
      <div className="fw-bold me-auto">Alerta</div>
    </CToastHeader>
    <CToastBody>
      <span>Revisa la cantidad recibida y el total</span>
    </CToastBody>
  </CToast>
)

function Billing() {
  let [items, setItems] = useState([])
  let [receivedAmount, setReceivedAmount] = useState(0)
  let [total, setTotal] = useState(0)
  let [itemUnits, setItemUnits] = useState({})
  let [paying, setPaying] = useState(false)
  let [toast, setToast] = useState(false)
  const toaster = useRef()

  useEffect(() => {
    ;(async () => {})()
  }, [])

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
    debugger
    if (isValid()) {
      const { status } = await axios({
        url: `${REACT_APP_BASE_URL}/billings`,
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          code: uuidV4(),
          billAmount: total,
          items: getItemsId(items),
        },
      })
      if (status === 201) clear()
      return
    }
    setToast(ToastMessage)
  }

  const clear = () => {
    setItems([])
    setReceivedAmount(0)
    setTotal(0)
    setItemUnits({})
    setPaying(false)
    setToast(false)
  }

  const getItemsId = () => items.map(({ _id }) => _id)

  const isValid = () => {
    return receivedAmount > 0 && receivedAmount >= total
  }

  const hanndleReceivedAmount = (receivedAmount) => setReceivedAmount(receivedAmount)

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
                          {Utils.formatCurrency(price)}
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
                          {Utils.formatCurrency(price * itemUnits[code])}
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
                      <CButton
                        size="lg"
                        color="primary"
                        onClick={() => {
                          setPaying(true)
                        }}
                      >
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
                  {Utils.formatCurrency(total)}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default Billing
