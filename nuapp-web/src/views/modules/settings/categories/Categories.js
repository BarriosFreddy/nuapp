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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
// layout for this page
// core components
import CategoriesForm from './CategoriesForm'
import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env
function Categories() {
  let [editing, setEditing] = useState(false)
  let [categories, setCategories] = useState([])
  let [page, setPage] = useState(1)

  useEffect(() => {
    ;(async () => {
      const categoriesArray = await getCategories()
      setCategories(categoriesArray)
    })()
  }, [])

  const getCategories = async (page = 1) => {
    const { data } = await axios({
      url: `${REACT_APP_BASE_URL}/item-categories?page=${page}`,
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
    setCategories(await getCategories())
    setEditing(false)
  }

  // eslint-disable-next-line no-unused-vars
  const nextPage = async () => {
    const newPage = page + 1
    setPage(newPage)
    setCategories(await getCategories(newPage))
  }

  // eslint-disable-next-line no-unused-vars
  const prevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1
    setPage(newPage)
    setCategories(await getCategories(newPage))
  }

  const handleLoadMore = async () => {
    const newPage = page + 1
    setPage(newPage)
    const moreCategories = await getCategories(newPage)
    moreCategories && moreCategories.length > 0 && setCategories(moreCategories)
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
                      {categories.map(({ _id, name, description }) => (
                        <CCard
                          key={_id}
                          style={{
                            width: 'auto',
                          }}
                        >
                          <CRow className="g-0">
                            <CCol xs={12}>
                              <CCardBody>
                                <CRow>
                                  <CCol>{name}</CCol>
                                </CRow>
                                <CRow>
                                  <CCol>{description}</CCol>
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
                            <CTableHeaderCell>Código</CTableHeaderCell>
                            <CTableHeaderCell>Nombre</CTableHeaderCell>
                            <CTableHeaderCell>Descripción</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {categories.map(({ code, name, description }) => (
                            <CTableRow key={code}>
                              <CTableDataCell xs="12" className="text-uppercase">
                                {code}
                              </CTableDataCell>
                              <CTableDataCell className="fs-6" xs="12">
                                {name}
                              </CTableDataCell>
                              <CTableDataCell xs="12" className="text-break">
                                {description}
                              </CTableDataCell>
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
                {editing && <CategoriesForm cancel={cancel} />}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default Categories
