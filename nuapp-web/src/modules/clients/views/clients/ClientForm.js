/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  CButton,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CContainer,
  CCol,
  CFormInput,
  CForm,
  CFormSelect,
  CCardBody,
  CCard,
  CCardFooter,
} from '@coreui/react'
import { existByDNI } from '../../services/clients.service'
import ConfirmDialog from 'src/components/shared/ConfirmDialog'
import FormInput from '../../../../components/shared/FormInput'

const clientInitialState = {
  name: '',
  dniType: '',
  dni: '',
  email: '',
  phoneNumber: '',
  address: '',
}

function ClientForm(props) {
  const dispatch = useDispatch()
  const clientCategories = [{ label: 'CEDULA', value: 'CC' }] //useSelector((state) => state.clientCategories.clientCategories)
  const dniRegistered = useSelector((state) => state.clients.existsByDNI)
  const saving = useSelector((state) => state.clients.saving)
  const [client, setClient] = useState(clientInitialState)
  const [failedValidations, setFailedValidations] = useState({
    name: false,
    dniType: false,
    dni: false,
  })
  const [modal, setModal] = useState(false)
  const confirmDialogRef = useRef()

  useEffect(() => {
    if (props.client) {
      let clientToSet = null
      if (props.copying) {
        clientToSet = {
          ...props.client,
          dni: '',
        }
        delete clientToSet._id
      } else clientToSet = props.client
      setClient(clientToSet)
    }
  }, [dispatch, props.client, props.copying])

  // INIT
  const oldDNI = props.client?.dni
  const toggle = () => setModal(!modal)
  const validateDNIExistence = (dni) => {
    if (oldDNI !== dni) dispatch(existByDNI(dni))
  }

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )

  const isValidForm = () => {
    const { name, dniType, dni } = {
      ...client,
    }
    const failedValidationsObj = { ...failedValidations }
    failedValidationsObj.dni = !dni || dniRegistered
    failedValidationsObj.dniType = !dniType
    failedValidationsObj.name = !name
    setFailedValidations(failedValidationsObj)
    return Object.values(failedValidationsObj).every((validation) => validation === false)
  }

  const save = async () => {
    console.log({ client })
    if (isValidForm()) {
      props.onSave({
        ...client,
      })
      setClient(clientInitialState)
    }
  }

  const cancel = () => {
    confirmDialogRef.current.show(true)
  }

  const handleResponseCancel = (sureCancel) => {
    if (sureCancel) {
      props.onCancel()
      setClient(clientInitialState)
      return
    }
    confirmDialogRef.current.show(false)
  }

  const handleChangeField = ({ target: { name, value } }) => {
    setClient({
      ...client,
      [name]: value,
    })
    setFailedValidations({ ...failedValidations, [name]: !value })
    if (name === 'dni') validateDNIExistence(value)
  }

  return (
    <>
      <CContainer fluid>
        <CCard>
          <div className="py-1 d-lg-none">
            <CRow className="m-1">
              <CCol xs="3" lg={{ offset: 4, span: 4 }}>
                <CButton variant="outline" color="secondary" onClick={() => cancel()}>
                  CANCELAR
                </CButton>
              </CCol>
              <CCol xs={{ offset: 5, span: 4 }}>
                <CButton color="success" type="button" onClick={() => save()}>
                  {props.client ? 'EDITAR' : 'GUARDAR'}
                </CButton>
              </CCol>
            </CRow>
          </div>
          <CCardBody>
            <CForm className="row g-3 needs-validation" noValidate>
              <CRow>
                <CCol xs="12" lg="4">
                  <FormInput
                    className="text-uppercase"
                    label="Nombre"
                    type="text"
                    uppercase="true"
                    name="name"
                    value={client.name}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.name}
                    required
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormSelect
                    label="Tipo de identificación"
                    name="dniType"
                    value={client.dniType}
                    required
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.dniType}
                    onChange={(event) => handleChangeField(event)}
                    aria-label="Default select example"
                    options={['Seleccione...', ...clientCategories]}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <FormInput
                    className="text-uppercase"
                    label="Identificación"
                    type="text"
                    uppercase="true"
                    name="dni"
                    value={client.dni}
                    feedbackInvalid="Campo obligatorio"
                    invalid={failedValidations.dni}
                    required
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12" lg="4">
                  <CFormInput
                    label="Correo electrónico"
                    type="email"
                    uppercase="true"
                    name="email"
                    value={client.email}
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormInput
                    label="Celular"
                    type="tel"
                    min={1}
                    name="phoneNumber"
                    value={client.phoneNumber}
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
                <CCol xs="12" lg="4">
                  <CFormInput
                    label="Dirección"
                    type="text"
                    name="address"
                    value={client.address}
                    onChange={(event) => handleChangeField(event)}
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter className="mt-2">
            <div className="d-none d-lg-block">
              <CRow className="mt-0">
                <CCol className="text-center" xs="8" lg={{ offset: 4, span: 4 }}>
                  <CButton color="success" type="button" disabled={saving} onClick={() => save()}>
                    {props.client && props.client?.id ? 'EDITAR' : 'GUARDAR'}
                  </CButton>
                  &nbsp; &nbsp;
                  <CButton variant="outline" color="secondary" onClick={() => cancel()}>
                    CANCELAR
                  </CButton>
                </CCol>
              </CRow>
            </div>
          </CCardFooter>
        </CCard>
      </CContainer>
      <ConfirmDialog
        ref={confirmDialogRef}
        onResponse={handleResponseCancel}
        message="¿Estás seguro que quieres cancelar?"
      ></ConfirmDialog>
      <CModal isOpen={modal} toggle={toggle}>
        <CModalHeader toggle={toggle} close={closeBtn}>
          Escaneando
        </CModalHeader>
        <CModalBody>
          <div id="reader" width="600px" style={{ maxWidth: '750px' }}></div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ClientForm

ClientForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  client: PropTypes.object,
  copying: PropTypes.bool,
}
