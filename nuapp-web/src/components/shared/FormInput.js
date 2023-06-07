import React from 'react'
import { CFormInput } from '@coreui/react'
import { PropTypes } from 'prop-types'

const FormInput = (props) => {
  console.log({ props })
  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    if (props.uppercase) event.target.value = value ? value.toUpperCase() : value
    if (props.lowercase) event.target.value = value ? value.toLowerCase() : value
    props.onChange(event)
  }
  return <CFormInput {...props} onChange={handleChange} />
}

export default FormInput

FormInput.propTypes = {
  onChange: PropTypes.func,
  uppercase: PropTypes.bool,
  lowercase: PropTypes.bool,
}
