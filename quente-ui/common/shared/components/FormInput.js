import React from 'react'
import { CFormInput } from '@coreui/react'
import { PropTypes } from 'prop-types'

const FormInput = (props) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    const { selectionStart, selectionEnd } = event.target
    if (props.uppercase && value) event.target.value = value.toUpperCase()
    if (props.lowercase && value) event.target.value = value.toLowerCase()
    event.target.setSelectionRange && event.target.setSelectionRange(selectionStart, selectionEnd)
    props.onChange(event)
  }
  return <CFormInput {...props} size={props.size || 'sm'} onChange={handleChange} />
}

export default FormInput

FormInput.propTypes = {
  size: PropTypes.string,
  onChange: PropTypes.func,
  uppercase: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  lowercase: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
}
