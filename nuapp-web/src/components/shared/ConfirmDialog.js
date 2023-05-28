import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { PropTypes } from 'prop-types'

const ConfirmDialog = forwardRef(function ConfirmDialog({ message, onResponse }, ref) {
  const [visible, setVisible] = useState(false)

  const handleResponse = (response) => {
    onResponse && onResponse(response)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        show(toggle) {
          setVisible(toggle)
        },
      }
    },
    [],
  )

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Confirmación</CModalTitle>
        </CModalHeader>
        <CModalBody>{message}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => handleResponse(true)}>
            SI
          </CButton>
          <CButton color="secondary" onClick={() => handleResponse(false)}>
            NO
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
})

ConfirmDialog.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  onResponse: PropTypes.func,
}

export default ConfirmDialog
