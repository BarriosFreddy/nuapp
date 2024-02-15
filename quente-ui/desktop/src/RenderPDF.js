const path = require('node:path')
const { print } = require('pdf-to-printer')
const puppeteer = require('puppeteer')
const Handlebars = require('handlebars')

const getHTML = (fileData) => {
  var source = `
  <html>
  <head>
    <style>
      p, body {
        margin: 0;
      }
      main {
        padding: 10px 20px;
        width: 65mm;
        background: gray;
        font-size: 10px;
      }
      .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
      }
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        margin-bottom: 10px;
      }
      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .items {
        margin-bottom: 10px;
      }
      .item-row {
        display: flex;
        justify-content: space-between;
      }
      .bill-subtotal {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-bottom: 10px;
      }
      .bill-footer {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="header">
        <p>DROGUERÍA FRANCISCA</p>
        <p>NIT: 12245132312</p>
        <p>OLAYA H. CRA 54 CLL 37 34-143</p>
        <p>CARTAGENA DE INDIAS - COLOMBIA</p>
        <br/>
        <p>FACTURA DE VENTA</p>
      </div>
      <div class="info">
        <p>CÓDIGO: {{code}}</p>
        <p>FECHA: {{creationDate}}</p>
        <p>VENDEDOR: ANÓNIMO</p>
        <p>CLIENTE: ANÓNIMO</p>
      </div>
      <div class="title">
        <p>PRODUCTO</p>
        <p>CNT</p>
        <p>V. U.</p>
      </div>
      <div class="items">
        {{#items}}
          <div class="item-row">
            <p>{{name}}</p>
            <p>{{units}}</p>
            <p>{{price}}</p>
          </div>
        {{/items}}
      </div>
      <div class="bill-subtotal">
        <div>
          <p>&nbsp;</p>
        </div>
        <div>
          <p>TOTAL</p>
        </div>
        <div>
          <p>{{billAmount}}</p>
        </div>
      </div>
      <div class="bill-footer">
        <p>SERVICIO A DOMICILIO</p>
        <p>3012141263</p>
        <p>** GRACIAS POR SU COMPRA **</p>
      </div>
    </main>
  </body>
</html>

`
  var template = Handlebars.compile(source)
  var result = template(fileData)
  return result
}

module.exports = {
  renderPDF: async (fileData) => {
    try {
      const uri = path.join(__dirname, 'tmp/factura.pdf')
      const browser = await puppeteer.launch({
        headless: 'new',
      })
      const page = await browser.newPage()
      await page.setContent(getHTML(fileData))
      await page.pdf({ path: 'src/tmp/factura.pdf', format: 'A6' })
      await browser.close()
      print(uri, {
        paperSize: 'A6',
        scale: 'noscale',
      })
        .then(console.log)
        .catch(console.error)
    } catch (e) {
      console.error(e)
    }
  },
}
