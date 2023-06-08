import React from 'react'
import { PropTypes } from 'prop-types'
import {
  CCard,
  CCardFooter,
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

function ItemCategoriesList({ itemCategories, onEdit, onPrevPage, onNextPage }) {
  return (
    <>
      <div className="d-lg-none">
        {itemCategories &&
          itemCategories.map(({ _id, code, name, description }) => (
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
                      <CCol>{code}</CCol>
                    </CRow>
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
              <CTableHeaderCell>&nbsp;</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {itemCategories &&
              itemCategories.map((itemCategory) => (
                <CTableRow key={itemCategory._id}>
                  <CTableDataCell xs="12" className="text-uppercase">
                    {itemCategory.code}
                  </CTableDataCell>
                  <CTableDataCell className="fs-6" xs="12">
                    {itemCategory.name}
                  </CTableDataCell>
                  <CTableDataCell xs="12" className="text-break">
                    {itemCategory.description}
                  </CTableDataCell>
                  <CTableDataCell xs="12">
                    <CButton
                      size="sm"
                      variant="outline"
                      color="info"
                      onClick={() => onEdit(itemCategory)}
                    >
                      EDITAR
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </div>

      <CCardFooter className="py-4">
        <CRow>
          <CCol>
            <div className="d-grid col-12 mx-auto">
              <CButton type="button" variant="outline" color="secondary" onClick={onPrevPage}>
                ANTERIOR
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div className="d-grid col-12 mx-auto">
              <CButton type="button" variant="outline" color="secondary" onClick={onNextPage}>
                SIGUIENTE
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCardFooter>
    </>
  )
}

export default ItemCategoriesList

ItemCategoriesList.propTypes = {
  itemCategories: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
}
