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
import { formatCurrency, getMainPrice } from 'src/utils'
import { PropTypes } from 'prop-types'
import dayjs from 'dayjs'

const ItemList = ({ items, fetching, page, onEdit, onPrevPage, onNextPage }) => {
  const getExpirationDates = (expirationControl) =>
    expirationControl?.map(({ expirationDate, lotUnits }) => ({ expirationDate, lotUnits }))
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
                <CCol xs="7">{item.name}</CCol>
                <CCol xs="2" className="text-end">
                  {getExpirationDates(item.expirationControl)
                    ?.filter(({ lotUnits }) => lotUnits > 0)
                    .map(({ expirationDate, lotUnits }, index) => (
                      <CBadge
                        key={index}
                        color={
                          dayjs(expirationDate).diff(dayjs(), 'days') > 90
                            ? dayjs(expirationDate).diff(dayjs(), 'days') > 180
                              ? 'success'
                              : 'warning'
                            : 'danger'
                        }
                        shape="rounded-pill"
                      >
                        {lotUnits}
                      </CBadge>
                    ))}
                </CCol>
                <CCol xs="3" className="text-end">
                  {formatCurrency(getMainPrice(item?.pricesRatio))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        ))}
      </div>
      <div className="d-none d-lg-block">
        <CTable small hover>
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
                <CTableDataCell xs="12" className="text-uppercase text-break">
                  {item.name}
                </CTableDataCell>
                <CTableDataCell className="fs-6" xs="12">
                  {item.code}
                </CTableDataCell>
                <CTableDataCell xs="12">
                  {getExpirationDates(item.expirationControl)
                    ?.filter(({ lotUnits }) => lotUnits > 0)
                    .map(({ expirationDate, lotUnits }, index) => (
                      <CBadge
                        key={index}
                        color={
                          dayjs(expirationDate).diff(dayjs(), 'days') > 90
                            ? dayjs(expirationDate).diff(dayjs(), 'days') > 180
                              ? 'success'
                              : 'warning'
                            : 'danger'
                        }
                        shape="rounded-pill"
                      >
                        {lotUnits}
                      </CBadge>
                    ))}
                </CTableDataCell>
                <CTableDataCell xs="12">
                  {formatCurrency(getMainPrice(item?.pricesRatio))}
                </CTableDataCell>
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
