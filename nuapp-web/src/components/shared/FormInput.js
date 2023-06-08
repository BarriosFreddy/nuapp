import React from 'react'
import { CFormInput } from '@coreui/react'
import { PropTypes } from 'prop-types'

const FormInput = (props) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    if (props.uppercase && value) event.target.value = value.toUpperCase()
    if (props.lowercase && value) event.target.value = value.toLowerCase()
    props.onChange(event)
  }
  return <CFormInput {...props} onChange={handleChange} />
}

export default FormInput

FormInput.propTypes = {
  onChange: PropTypes.func,
  uppercase: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  lowercase: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
}
