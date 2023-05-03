import React, { useState, useEffect } from 'react'

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
  CCardImage,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
} from '@coreui/react'
// layout for this page
// core components
import ItemForm from './ItemForm'
import DefaultImg from './../../../../assets/images/new.ico'
import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env
function Item() {
  let [editing, setEditing] = useState(false)
  let [items, setItems] = useState([])
  let [page, setPage] = useState(1)

  useEffect(() => {
    ;(async () => {
      const itemsArray = await getItems()
      setItems(itemsArray)
    })()
  }, [])

  const getItems = async (page = 1) => {
    const { data } = await axios({
      url: `${REACT_APP_BASE_URL}/items?page=${page}`,
      withCredentials: true,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  }

  const cancel = async () => {
    //setItems(await getItems())
    setEditing(false)
  }

  const handleLoadMore = async () => {
    const newPage = page + 1
    setPage(newPage)
    const moreItems = await getItems(newPage)
    moreItems && moreItems.length > 0 && setItems([...items, ...moreItems])
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <CRow>
          <div className="col">
            <CCard className="shadow border-10">
              {!editing && (
                <CCardHeader className="border-0">
                  <CContainer>
                    <CRow>
                      <CCol xs="4">
                        <CButton variant="outline" color="success" onClick={() => setEditing(true)}>
                          CREAR
                        </CButton>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CCardHeader>
              )}
              <CCardBody>
                {!editing && (
                  <>
                    <div className="d-lg-none">
                      {items.map(({ name, code, description, price }) => (
                        <CCard
                          key={code}
                          style={{
                            width: 'auto',
                          }}
                        >
                          <CRow className="g-0" key={code}>
                            <CCol xs={4}>
                              <CCardImage src={DefaultImg} />
                            </CCol>
                            <CCol xs={8}>
                              <CCardBody>
                                <CRow>
                                  <CCol>{name}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>{code}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>{description}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>${price}</CCol>
                                </CRow>
                              </CCardBody>
                            </CCol>
                          </CRow>
                        </CCard>
                      ))}
                    </div>
                    <div className="d-none d-lg-block">
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Nombre</CTableHeaderCell>
                            <CTableHeaderCell>Código</CTableHeaderCell>
                            <CTableHeaderCell>Descripción</CTableHeaderCell>
                            <CTableHeaderCell>Precio</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
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

                    <CCardFooter className="py-4">
                      <CCol>
                        <div className="d-grid col-12 mx-auto">
                          <CButton type="button" color="secondary" onClick={handleLoadMore}>
                            Cargar más
                          </CButton>
                        </div>
                      </CCol>
                    </CCardFooter>
                  </>
                )}
                {editing && <ItemForm cancel={cancel} />}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default Item
