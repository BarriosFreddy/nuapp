import React from 'react'
import { PropTypes } from 'prop-types'
import { formatCurrency } from 'src/utils'

const BillingTemplateHTML = ({ billing }) => (
  <main style={styles.body}>
    <header style={{ ...styles.textCenter, ...styles.marginBottom10 }}>
      <div>DROGUERÍA FRANCISCA</div>
      <div>NIT: 12245132312</div>
      <div>OLAYA H. CRA 54 CLL 37 34-143</div>
      <div>CARTAGENA DE INDIAS - COLOMBIA</div>
      <div>FACTURA DE VENTA</div>
    </header>
    <section style={styles.marginBottom10}>
      <div>CÓDIGO: {billing.code}</div>
      <div>FECHA: {billing.creationDate}</div>
      <div>VENDEDOR: ANONIMO</div>
      <div>CLIENTE: ANONIMO</div>
    </section>
    <div style={styles.flexContainer}>
      <div style={{ width: '70%' }}>PRODUCTO</div>
      <div style={{ width: '10%' }}>CNT</div>
      <div style={{ width: '20%' }}>V. U.</div>
    </div>
    <section style={styles.marginBottom10}>
      {billing?.items.map(({ name, units, price }, i) => (
        <div key={i} style={styles.flexContainer}>
          <div style={{ width: '70%' }}>{name}</div>
          <div style={{ width: '10%' }}>{units}</div>
          <div style={{ width: '20%' }}>{formatCurrency(price)}</div>
        </div>
      ))}
    </section>
    <section style={{ ...styles.flexContainer, ...styles.marginBottom10 }}>
      <div style={{ width: '80%', textAlign: 'right', marginRight: 20 }}>TOTAL</div>
      <div style={{ width: '20%' }}>{formatCurrency(billing.billAmount)}</div>
    </section>
    <footer style={{ ...styles.textCenter, ...styles.marginBottom10 }}>
      <div>SERVICIO A DOMICILIO</div>
      <div>3012141263</div>
      <div>** GRACIAS POR SU COMPRA **</div>
    </footer>
  </main>
)
export default BillingTemplateHTML

BillingTemplateHTML.propTypes = {
  billing: PropTypes.object,
}

const styles = {
  body: {
    fontSize: 14,
    padding: 0,
  },
  textCenter: {
    textAlign: 'center',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}
