import React from 'react'
import {
  CCard,
  CCardFooter,
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
import DefaultImg from './../../../../assets/images/new.ico'
import { formatCurrency } from 'src/utils'
import { PropTypes } from 'prop-types'

const ItemList = ({ items, onEdit, onPrevPage, onNextPage }) => {
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
              <CTableHeaderCell>&nbsp;</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item) => (
              <CTableRow key={item.code}>
                <CTableDataCell xs="12" className="text-uppercase">
                  {item.name}
                </CTableDataCell>
                <CTableDataCell className="fs-6" xs="12">
                  {item.code}
                </CTableDataCell>
                <CTableDataCell xs="12" className="text-break">
                  {item.description}
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

export default ItemList

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
}
