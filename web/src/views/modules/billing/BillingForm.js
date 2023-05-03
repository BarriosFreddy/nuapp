import React, { useEffect, useRef, useState } from 'react'
import Quagga from 'quagga'
import { PropTypes } from 'prop-types'

import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CContainer,
  CButton,
  CFormInput,
  CInputGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import axios from 'axios'
import Utils from 'src/utils'

const ENTER_KEYCODE = 13
const TAB_KEYCODE = 9

const { REACT_APP_BASE_URL } = process.env

const BillingForm = (props) => {
  const [items, setItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const searchTermInput = useRef()

  useEffect(() => {
    ;(async () => {})()
  }, [])

  const onChangeField = ({ target: { value } }) => {
    setSearchTerm(value)
  }

  const onKeyDownCodeField = async ({ keyCode }) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) search()
  }

  const search = async () => {
    if (!!searchTerm) {
      const itemsRetrieved = await getItemByCodeOrName(searchTerm)
      setItems(itemsRetrieved)
    }
  }

  const getItemByCodeOrName = async (searchTerm) => {
    const { data } = await axios({
      url: `${REACT_APP_BASE_URL}/items?code=${searchTerm}&name=${searchTerm}&page=1`,
      withCredentials: true,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  }

  const clear = () => {
    setItems([])
    setSearchTerm('')
    searchTermInput.current.focus()
  }

  const scanItem = () => {
    toggle()
    setTimeout(() => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            constraints: {
              width: 320,
              height: 380,
              facingMode: 'environment',
            },
            target: document.querySelector('#reader'), // Or '#yourElement' (optional)
          },
          decoder: {
            readers: [
              'ean_reader',
              /* {
                format: 'ean_reader',
                config: {
                  supplements: ['ean_13_reader'],
                }, 
              }, */
              'code_128_reader',
            ],
          },
        },
        function (err) {
          if (err) {
            console.log(err)
            return
          }
          console.log('Ready to start')
          Quagga.start()
        },
      )
      Quagga.onDetected(({ codeResult: { code } }) => {
        console.log({ code })
        setModal(false)
        Quagga.stop()
      })
      Quagga.onProcessed((result) => {
        /* const drawingCanvas = Quagga.canvas.dom.overlay
        drawingCanvas.style.display = 'none' */
      })
    }, 300)
  }

  const addItem = (item) => {
    props.addItem(item)
    clear()
  }

  return (
    <>
      <CContainer fluid>
        <CRow>
          <CCol>
            <CInputGroup>
              <CFormInput
                ref={searchTermInput}
                type="text"
                name="searchTerm"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(event) => onChangeField(event)}
                onKeyDown={(event) => onKeyDownCodeField(event)}
              />
              <CButton type="button" color="primary" onClick={search}>
                BUSCAR
              </CButton>
              <CButton type="button" color="light" onClick={clear}>
                BORRAR
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Código</CTableHeaderCell>
                  <CTableHeaderCell>Precio</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {items.map((item) => (
                  <CTableRow
                    key={item.code}
                    onClick={() => addItem(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CTableDataCell className="text-uppercase">{item.name}</CTableDataCell>
                    <CTableDataCell className="fs-6" xs="12">
                      {item.code}
                    </CTableDataCell>
                    <CTableDataCell className="text-break">
                      {Utils.formatCurrency(item.price)}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </CContainer>
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>Scanning</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div id="reader" width="600px" style={{ maxWidth: '750px' }}></div>
        </CModalBody>
        <CModalFooter>
          <CButton Ccolor="secondary" onClick={() => setModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default BillingForm

BillingForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}
