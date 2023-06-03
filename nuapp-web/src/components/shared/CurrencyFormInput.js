import { CFormInput } from '@coreui/react'
import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { formatCurrency } from '../../utils/index'

const CurrencyFormInput = (props) => {
  const [innerValue, setInnerValue] = useState('')

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event
    const valueClear = `${value}`.replace(/[\s$.]/gi, '')
    if (/^[\d]{0,}$/g.test(valueClear)) {
      setInnerValue(formatCurrency(valueClear))
      props.onChange({ ...event, target: { ...event.target, name, value: +valueClear } })
    }
  }

  return (
    <CFormInput
      {...props}
      name={props.name}
      value={innerValue}
      type="text"
      onChange={handleChange}
    />
  )
}

export default CurrencyFormInput

CurrencyFormInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
}
