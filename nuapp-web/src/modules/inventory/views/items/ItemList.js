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

const ItemList = ({ items, fetching, page, onEdit, onPrevPage, onNextPage }) => {
  return (
    <>
      <div className="d-lg-none">
        {items.map((item) => (
          <CCard
            key={item.code}
            style={{
              width: 'auto',
              cursor: 'pointer',
            }}
            className="my-2"
            onClick={() => onEdit(item)}
          >
            <CCardBody>
              <CRow className="g-0">
                <CCol>
                  <CRow>
                    <CCol>{item.name}</CCol>
                  </CRow>
                  <CRow>
                    <CCol style={{ fontSize: 10 }}>{item.code}</CCol>
                  </CRow>
                </CCol>
                <CCol>{formatCurrency(item.price)}</CCol>
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
                  <CButton
                    size="sm"
                    variant="outline"
                    color="info"
                    disabled={fetching}
                    onClick={() => onEdit(item)}
                  >
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
                        disabled={fetching}
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
                        disabled={fetching}
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
  page: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
}
