import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  CBadge,
} from '@coreui/react'
import { formatCurrency } from 'src/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from 'src/modules/inventory/reducers/items.reducer'
import { getItems } from 'src/modules/inventory/services/items.service'
import CONSTANTS from './../../../constants'
import { useDidUpdate } from 'src/hooks/useDidUpdate'

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

const BillingForm = (props) => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const fetching = useSelector((state) => state.items.fetching)
  const [searchTerm, setSearchTerm] = useState('')
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const searchTermInput = useRef()

  const clear = useCallback(() => {
    dispatch(setItems([]))
    setSearchTerm('')
    searchTermInput.current.focus()
  }, [dispatch])

  useEffect(() => {
    clear()
  }, [clear])

  useDidUpdate(() => {
    if (items.length === 1) addItem(items[0])
  }, [fetching])

  const onChangeField = ({ target: { value } }) => {
    setSearchTerm(value)
    search(value)
  }

  const onKeyDownCodeField = async ({ keyCode }) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) {
      search()
      setTimeout(() => {
        if (items.length === 1) addItem(items[0])
      }, 500)
    }
  }

  const search = async (term) => {
    const termToSearch = term ?? searchTerm
    if (!!termToSearch) {
      dispatch(getItems({ code: termToSearch, name: termToSearch, page: 1 }, false))
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // eslint-disable-next-line no-unused-vars
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
                autoComplete="off"
                name="searchTerm"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(event) => onChangeField(event)}
                onKeyDown={(event) => onKeyDownCodeField(event)}
              />
              <CButton variant="outline" type="button" color="secondary" onClick={clear}>
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
                    <CTableDataCell xs="12">
                      <CRow>
                        <CCol className="text-uppercase">{item.name}</CCol>
                      </CRow>
                      <CRow>
                        <CCol style={{ fontSize: 10 }}>{item.code}</CCol>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell className="text-break">
                      {formatCurrency(item.price)}
                    </CTableDataCell>
                    <CTableDataCell xs="12">
                      <CBadge
                        color={
                          item.stock
                            ? item.stock <= item.reorderPoint
                              ? 'warning'
                              : 'success'
                            : 'danger'
                        }
                        shape="rounded-pill"
                      >
                        {item.stock ?? 0}
                      </CBadge>
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
