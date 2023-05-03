import React, { useState, useEffect, Fragment } from 'react'

// reactstrap components
import {
  CCard,
  CCardHeader,
  CCardFooter,
  CContainer,
  CRow,
  CButton,
  CCardBody,
  CCol,
  CFormInput,
  CTable,
  CTableRow,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'
// layout for this page
// core components
import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env
const LIMIT_5_MB = 5242880
function DataLoader() {
  let [items, setItems] = useState([])
  let [feedbackInvalid, setFeedbackInvalid] = useState(null)

  useEffect(() => {
    ;(async () => {})()
  }, [])

  const handleChange = ({ target }) => {
    const file = target.files[0]
    const { size, type } = file
    if (type !== 'text/csv') {
      setFeedbackInvalid('El archivo debe ser tipo CSV')
      return
    }
    if (size > LIMIT_5_MB) {
      setFeedbackInvalid('El archivo no debe superar los 5 Megabytes')
      return
    }
    const fileReader = new FileReader()
    fileReader.readAsText(file)

    fileReader.onloadend = () => loadColumns(fileReader.result)
    fileReader.onerror = (e) => {
      console.log(fileReader.result)
    }
  }

  const loadColumns = (text) => {
    const columns = text.split(/\n/)
    const items = columns
      .filter((line) => line.length > 0)
      .map((line) => {
        const fields = line.split(',')
        return { code: fields[0], name: fields[1], description: fields[2], units: fields[3] }
      })
    setItems(items)
  }

  const handleLoad = async () => {
    await axios({
      url: `${REACT_APP_BASE_URL}/items/bulk`,
      method: 'POST',
      mode: 'cors',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: items,
    })
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <CRow>
          <div className="col">
            <CCard className="shadow border-10">
              <CCardHeader className="border-0">
                <CContainer>
                  <CRow>
                    <CCol xs="4"> </CCol>
                  </CRow>
                </CContainer>
              </CCardHeader>
              <CCardBody>
                <>
                  <CCard
                    style={{
                      width: 'auto',
                    }}
                  >
                    <CCardBody>
                      <CRow>
                        <CCol xs="12">
                          <div className="mb-3">
                            <CFormInput
                              type="file"
                              id="formFile"
                              label="Cargar datos"
                              onChange={handleChange}
                              feedbackInvalid={feedbackInvalid}
                              invalid={!!feedbackInvalid}
                              required
                            />
                          </div>
                        </CCol>
                        <CCol xs="12">
                          <CButton color="success" type="button" onClick={handleLoad}>
                            Cargar datos
                          </CButton>
                        </CCol>
                      </CRow>
                      <div className="d-lg-none">
                        {items.map(({ code, name, description, units }) => (
                          <CCard className="shadow mt-1" key={code}>
                            <CCardBody>
                              <CRow>
                                <CCol xs="12" className="text-uppercase">
                                  {name}
                                </CCol>
                                <CCol className="fs-6" xs="12">
                                  {code}
                                </CCol>
                                <CCol xs="12" className="text-break">
                                  {description}
                                </CCol>
                                <CCol xs="12">{units}</CCol>
                              </CRow>
                            </CCardBody>
                          </CCard>
                        ))}
                      </div>
                      <div className="d-none d-lg-block">
                        <CTable>
                          <CTableBody>
                            {items.map(({ code, name, description, units }) => (
                              <CTableRow key={code}>
                                <CTableDataCell xs="12" className="text-uppercase">
                                  {name}
                                </CTableDataCell>
                                <CTableDataCell className="fs-6" xs="12">
                                  {code}
                                </CTableDataCell>
                                <CTableDataCell xs="12" className="text-break">
                                  {description}
                                </CTableDataCell>
                                <CTableDataCell xs="12">{units}</CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCardFooter className="py-4">
                    <CCol></CCol>
                  </CCardFooter>
                </>
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default DataLoader
