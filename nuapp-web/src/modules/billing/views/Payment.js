import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

import { CRow, CCol, CContainer, CFormInput, CCard, CCardBody } from '@coreui/react'
import { formatCurrency } from './../../../utils'
import CONSTANTS from './../../../constants'

const ENTER_KEYCODE = 13
const TAB_KEYCODE = 9

const PaymentComp = (props) => {
  const [receivedAmount, setReceivedAmount] = useState(0)
  const [receivedAmountInvalid, setReceivedAmountInvalid] = useState(false)
  const [changeAmount, setChangeAmount] = useState(0)

  const onChangeField = ({ target: { value } }) => {
    setReceivedAmount(value)
    props.setReceivedAmount(value)
    calculateAmountChange(value)
  }

  const handleReceivedAmount = (amount) => {
    setReceivedAmount(amount)
    props.setReceivedAmount(amount)
    calculateAmountChange(amount)
  }

  const onKeyDownCodeField = async ({ keyCode }) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) calculateAmountChange()
  }

  const calculateAmountChange = (received) => {
    const receivedMoney = received ?? receivedAmount
    setReceivedAmountInvalid(receivedMoney < props.total)
    setChangeAmount(receivedMoney - props.total)
  }
  return (
    <>
      <CContainer fluid>
        <CRow>
          {CONSTANTS.AVAILABLE_BILLS.map((amount) => (
            <CCol lg="4" key={amount} className="mt-2" style={{ cursor: 'pointer' }}>
              <CCard onClick={() => handleReceivedAmount(amount)}>
                <CCardBody>
                  <h4 className="text-center">{formatCurrency(amount)}</h4>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
        <CRow className="mt-5">
          <CCol lg="4">
            <h5>RECIBIDO</h5>
          </CCol>
          <CCol lg="8">
            <CFormInput
              data-testid="receivedAmountId"
              type="number"
              size="lg"
              name="receivedAmount"
              feedbackInvalid="EL dinero recibido no debe ser menor al total"
              invalid={receivedAmountInvalid}
              value={receivedAmount}
              onChange={(event) => onChangeField(event)}
              onKeyDown={(event) => onKeyDownCodeField(event)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol lg="4">
            <h5>CAMBIO</h5>
          </CCol>
          <CCol lg="8" className="align-self-end">
            <span className="fs-3">{formatCurrency(changeAmount)}</span>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default PaymentComp

PaymentComp.propTypes = {
  total: PropTypes.number,
  setReceivedAmount: PropTypes.func,
}
