import React from 'react'
import {
  CCard,
  CRow,
  CButton,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CBadge,
  CTableFoot,
} from '@coreui/react'
import { formatCurrency } from 'src/utils'
import { PropTypes } from 'prop-types'

const ItemList = ({ items, onEdit, page, onPrevPage, onNextPage }) => {
  return (
    <>
      <div className="d-lg-none">
        {items.map(({ name, code, description, price }) => (
          <CCard
            key={code}
            style={{
              width: 'auto',
            }}
          >
            <CCardBody>
              <CRow className="g-0" key={code}>
                <CCol xs={12}>
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
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        ))}
      </div>
      <div className="d-none d-lg-block">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Código</CTableHeaderCell>
              <CTableHeaderCell>En Stock</CTableHeaderCell>
              <CTableHeaderCell>Precio</CTableHeaderCell>
              <CTableHeaderCell>&nbsp;</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item) => (
              <CTableRow key={item.code}>
                <CTableDataCell xs="12" className="text-uppercase">
                  <CRow>
                    <CCol className="text-uppercase text-break">{item.name}</CCol>
                  </CRow>
                  <CRow>
                    <CCol style={{ fontSize: 10 }} className="text-break">
                      {item.description}
                    </CCol>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell className="fs-6" xs="12">
                  {item.code}
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
                <CTableDataCell xs="12">{formatCurrency(item.price)}</CTableDataCell>
                <CTableDataCell xs="12">
                  <CButton size="sm" variant="outline" color="info" onClick={() => onEdit(item)}>
                    EDITAR
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
          <CTableFoot>
            <CTableRow>
              <CTableDataCell colSpan={5} className="text-center">
                Página {page}
              </CTableDataCell>
            </CTableRow>
            <CTableRow className="mt-2">
              <CTableDataCell colSpan={5}>
                <CRow>
                  <CCol>
                    <div className="d-grid col-12 mx-auto">
                      <CButton
                        type="button"
                        variant="outline"
                        color="secondary"
                        onClick={onPrevPage}
                      >
                        ANTERIOR
                      </CButton>
                    </div>
                  </CCol>
                  <CCol>
                    <div className="d-grid col-12 mx-auto">
                      <CButton
                        type="button"
                        variant="outline"
                        color="secondary"
                        onClick={onNextPage}
                      >
                        SIGUIENTE
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </CTableDataCell>
            </CTableRow>
          </CTableFoot>
        </CTable>
      </div>
    </>
  )
}

export default ItemList

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
}
