import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import { formatCurrency } from 'src/utils'

const BillingTemplate = ({ billing }) => (
  <Document title="factura" pageLayout="oneColumn">
    <Page size="A7" wrap={false} style={styles.body}>
      <View style={styles.title}>
        <Text>Factura de venta</Text>
      </View>
      <View style={styles.info}>
        <Text>Código: {billing.code}</Text>
        <Text>Fecha: {billing.creationDate}</Text>
        <Text>Vendedor: Vendedor principal</Text>
        <Text>Cliente: Distrireal de la costa</Text>
      </View>
      <View style={styles.table}>
        {billing?.items.map(({ name, units, price }, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCell}>{name}</Text>
            </View>
            <View style={[styles.tableCol, { width: '20%' }]}>
              <Text style={styles.tableCell}>{units}</Text>
            </View>
            <View style={[styles.tableCol, { width: '30%' }]}>
              <Text style={styles.tableCell}>{formatCurrency(price)}</Text>
            </View>
          </View>
        ))}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: '50%' }]}>
            <Text style={styles.tableCell}>&nbsp;</Text>
          </View>
          <View style={[styles.tableCol, { width: '20%' }]}>
            <Text style={styles.tableCell}>TOTAL</Text>
          </View>
          <View style={[styles.tableCol, { width: '30%' }]}>
            <Text style={styles.tableCell}>{formatCurrency(billing.billAmount)}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
)

export default BillingTemplate

BillingTemplate.propTypes = {
  billing: PropTypes.object,
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 12,
    margin: '10 0',
  },
  table: {
    display: 'table',
    width: 'auto',
  },
  tableRowHeader: {
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: 'auto',
  },
  tableCell: {
    textAlign: 'left',
    marginTop: 5,
    fontSize: 11,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})
