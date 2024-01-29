import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import dayjs from 'dayjs'
import { getBillingsGTDate } from '../../../billing/services/billings.service'
import { formatCurrency } from 'src/utils'
import { Helmet } from 'react-helmet'

const progressExample = [
  { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
  { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
  { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
  { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
  { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
]

const SALES_DAYS = [
  { label: 'Hoy', value: 0 },
  { label: 'Últimos 7 días', value: 6 },
  { label: 'Mes pasado', value: 30 },
]

const Dashboard = () => {
  const dispatch = useDispatch()
  const billingsGraph = useSelector((state) => state.billing.billingsGraph)
  const [days, setDays] = useState(0)
  const tenDaysBefore = dayjs().subtract(days, 'days').format('YYYY-MM-DD')
  useEffect(() => {
    dispatch(getBillingsGTDate(tenDaysBefore))
  }, [dispatch, tenDaysBefore])
  const labels = billingsGraph ? billingsGraph.map(({ createdAt }) => createdAt) : []
  const data = billingsGraph ? billingsGraph.map(({ billAmount }) => billAmount) : []
  const dataReversed = [...billingsGraph].reverse()
  return (
    <>
      <CCard className="mb-4">
        <Helmet>
          <title>DASHBOARD</title>
        </Helmet>
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Ventas por día
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {SALES_DAYS.map(({ label, value }) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === days}
                    onClick={() => setDays(value)}
                  >
                    {label}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels,
              datasets: [
                {
                  label: 'Daily sales',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data,
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 1,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
          <br />
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Día</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ventas</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataReversed.map(({ createdAt, billAmount }, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{createdAt}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {formatCurrency(billAmount)}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Dashboard