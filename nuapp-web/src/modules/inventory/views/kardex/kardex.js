import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CFormInput,
  CContainer,
  CCardBody,
  CCard,
  CCardTitle,
  CCardHeader,
  CTableFoot,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../services/items.service'
import CONSTANTS from 'src/constants'
import { useDidUpdateControl } from '../../../../hooks/useDidUpdateControl'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { sendWarningToast, sendSuccessToast } from '../../../shared/services/notification.service'
import { saveAllKardexes } from '../../services/kardexes.service'
import { getDateObject } from 'src/utils'

const initialKardex = {
  code: '',
  itemId: '',
  name: '',
  description: '',
  type: 'IN',
  units: '',
}

const { ENTER_KEYCODE, TAB_KEYCODE } = CONSTANTS

const Kardex = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const fetching = useSelector((state) => state.items.fetching)
  const saving = useSelector((state) => state.kardexes.saving)
  const saveSuccess = useSelector((state) => state.kardexes.saveSuccess)
  const [kardexes, setKardexes] = useState([])
  const [currentIndex, setCurrentIndex] = useState([])

  useEffect(() => {
    setKardexes([initialKardex])
  }, [])

  useDidUpdateControl(() => {
    fillKardexFields()
  }, fetching)

  useDidUpdateControl(() => {
    if (saveSuccess) {
      sendSuccessToast(dispatch, {
        message: 'Guardado exitoso!',
      })
      setKardexes([initialKardex])
      return
    } else
      sendWarningToast(dispatch, {
        message: 'No se pudieron guardar los datos!',
      })
  }, saving)

  // INIT

  const onChangeField = ({ target: { name, value } }, kardex, index) => {
    setCurrentIndex(index)
    const kardexUpdated = {
      ...kardex,
      [name]: value,
    }
    const kardexesClone = replaceKardex(kardexUpdated, index)
    setKardexes(kardexesClone)
  }

  const handleChangeCode = ({ target: { value } }, index) => {
    setCurrentIndex(index)
    searchByCode(value)
  }

  const handleNew = () => {
    setKardexes([...kardexes, initialKardex])
  }

  const handleDelete = (index) => {
    let kardexesClone = [...kardexes]
    if (index >= 0) kardexesClone.splice(index, 1)
    setKardexes(kardexesClone)
  }

  const onKeyDownCodeField = ({ keyCode }, kardex) => {
    if ([ENTER_KEYCODE, TAB_KEYCODE].includes(keyCode)) {
      searchByCode(kardex.code)
    }
  }

  const searchByCode = (code) => {
    if (kardexes.some((kardex) => kardex.code === code)) {
      sendWarningToast(dispatch, {
        message: `El item con código ${code} ya está agregado!`,
      })
      return
    }
    if (!!code) dispatch(getItems({ code: code, page: 1, size: 1 }, false))
  }

  const handleSave = () => {
    if (validForm()) {
      const kardexEntities = transformToKardexEntities(kardexes)
      console.log(JSON.stringify(kardexes, null, 2))
      dispatch(saveAllKardexes(kardexEntities))
    }
  }

  function validForm() {
    let isOk = true
    if (kardexes.some((kardex) => kardex.name.trim() === '')) {
      sendWarningToast(dispatch, {
        message: `Hay registros no validos!`,
      })
      isOk = false
    }
    if (kardexes.some((kardex) => kardex.units <= 0)) {
      sendWarningToast(dispatch, {
        message: `Por favor ingrese las unidades`,
      })
      isOk = false
    }
    return isOk
  }

  function transformToKardexEntities(kardexes) {
    if (!Array.isArray(kardexes)) return kardexes
    return kardexes.map(({ code, itemId, type, units }) => ({
      code,
      itemId,
      type,
      units,
      createdAt: getDateObject(),
    }))
  }

  function replaceKardex(newKardex, index) {
    let kardexesClone = [...kardexes]
    if (index >= 0) kardexesClone.splice(index, 1, newKardex)
    return kardexesClone
  }

  function fillKardexFields() {
    if (items.length > 0) {
      const { _id, code, name, description } = items[0]
      const kardexesClone = replaceKardex(
        {
          code,
          itemId: _id,
          name,
          description,
          type: 'IN',
          units: '',
        },
        currentIndex,
      )
      setKardexes(kardexesClone)
    }
  }

  return (
    <>
      <CContainer className="mt--6" fluid>
        <Helmet>
          <title>ENTRADAS Y SALIDAS</title>
        </Helmet>
        <CCard className="mt-6 shadow border-10">
          <CCardHeader>
            <CCardTitle>ENTRADAS Y SALIDAS</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Código</CTableHeaderCell>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Descripción</CTableHeaderCell>
                  <CTableHeaderCell>Unidades</CTableHeaderCell>
                  <CTableHeaderCell>E/S</CTableHeaderCell>
                  <CTableHeaderCell>&nbsp;</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {kardexes.map((kardex, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell width={300}>
                      <CFormInput
                        type="number"
                        formNoValidate
                        size="sm"
                        required
                        name="code"
                        value={kardex.code}
                        onChange={(event) => handleChangeCode(event, index)}
                        onKeyDown={(event) => onKeyDownCodeField(event, index)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-uppercase">{kardex.name}</CTableDataCell>
                    <CTableDataCell className="text-uppercase">{kardex.description}</CTableDataCell>
                    <CTableDataCell width={200}>
                      <CFormInput
                        type="number"
                        formNoValidate
                        size="sm"
                        required
                        name="units"
                        value={kardex.units}
                        onChange={(event) => onChangeField(event, kardex, index)}
                      />
                    </CTableDataCell>
                    <CTableDataCell width={200}>
                      <CFormSelect
                        name="type"
                        size="sm"
                        value={kardex.type}
                        required
                        feedbackInvalid="Campo obligatorio"
                        onChange={(event) => onChangeField(event, kardex, index)}
                        options={[
                          { label: 'ENTRADA', value: 'IN' },
                          { label: 'SALIDA', value: 'OUT' },
                        ]}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {kardexes.length > 1 && (
                        <CButton size="sm" color="ligth" onClick={() => handleDelete(index)}>
                          <CIcon icon={cilTrash} size="sm" />
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
                <CTableRow>
                  <CTableHeaderCell colSpan={12}>
                    <CButton variant="outline" color="info" onClick={handleNew}>
                      NUEVO REGISTRO
                    </CButton>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableBody>
              <CTableFoot>
                <CTableRow>
                  <CTableHeaderCell colSpan={12}>
                    <CButton color="success" onClick={handleSave}>
                      GUARDAR
                    </CButton>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableFoot>
            </CTable>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default Kardex

Kardex.propTypes = {}
