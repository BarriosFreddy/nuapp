const pathNode = require('node:path')
const fs = require('fs')
const tmp = require('tmp')
const { exec } = require('node:child_process')
const log = require('electron-log/main')
import PDFDocument from 'pdfkit'
import { formatCurrency } from './utils/index'

const ROW_HEIGHT = 10
const MARGIN_TOP_ROW1 = 130
const MARGIN_LEFT_COLUMN1 = 10
const MARGIN_LEFT_COLUMN2 = 140
const MARGIN_LEFT_COLUMN3 = 170

module.exports = {
  renderPDF: async (fileData) => {
    log.info({ fileData })
    tmp.file(async function (err, path, fd, cleanup) {
      if (err) throw err
      try {
        const filePath = path + '.pdf'
        const doc = new PDFDocument({ size: 'A6', margin: 10 })
        doc.pipe(fs.createWriteStream(filePath)) // write to PDF
        doc.fontSize(8)
        const headerOptions = {
          align: 'justify',
        }
        const titleOptions = {
          align: 'left',
        }
        doc.text('DROGUERÍA FRANCISCA', headerOptions)
        doc.text('NIT: 12245132312', headerOptions)
        doc.text('OLAYA H. CRA 54 CLL 37 34-143', headerOptions)
        doc.text('CARTAGENA DE INDIAS - COLOMBIA', headerOptions)
        doc.moveDown()
        doc.text('FACTURA DE VENTA')
        doc.moveDown()
        doc.text(`CÓDIGO: ${fileData.code}`, titleOptions)
        doc.text(`FECHA: ${fileData.creationDate}`)
        doc.text(`VENDEDOR: ${fileData.createdBy?.name}`)
        doc.text(`CLIENTE: ${fileData.client?.name}`)
        doc.moveDown()
        doc.text(`PRODUCTO`, MARGIN_LEFT_COLUMN1, MARGIN_TOP_ROW1 - ROW_HEIGHT)
        doc.text(`CNT`, MARGIN_LEFT_COLUMN2, MARGIN_TOP_ROW1 - ROW_HEIGHT)
        doc.text(`V.UNITARIO`, MARGIN_LEFT_COLUMN3, MARGIN_TOP_ROW1 - ROW_HEIGHT)

        fileData.items.forEach(({ name, units, price }, index) => {
          doc.text(name, MARGIN_LEFT_COLUMN1, MARGIN_TOP_ROW1 + index * 10)
          doc.text(units, MARGIN_LEFT_COLUMN2, MARGIN_TOP_ROW1 + index * 10)
          doc.text(formatCurrency(price), MARGIN_LEFT_COLUMN3, MARGIN_TOP_ROW1 + index * 10)
        })

        doc.text(`TOTAL:`, MARGIN_LEFT_COLUMN2, MARGIN_TOP_ROW1 + 10 + fileData.items.length * 10)
        doc.text(
          formatCurrency(fileData.billAmount),
          MARGIN_LEFT_COLUMN3,
          MARGIN_TOP_ROW1 + 10 + fileData.items.length * 10,
        )
        doc.text(`SERVICIO A DOMICILIO`, MARGIN_LEFT_COLUMN1)
        doc.text(`3012141263`)
        doc.text(`*** GRACIAS POR SU COMPRA ***`)

        // finalize the PDF and end the stream
        doc.end()
        let sumatraPDFURI = pathNode.join(__dirname, '/SumatraPDF-3.4.6-32.exe')
        sumatraPDFURI = sumatraPDFURI.replace('app.asar', 'app.asar.unpacked')
        const command = `"${sumatraPDFURI}" -print-to-default -silent -print-settings noscale,paper=A6 ${filePath}`
        exec(command, (error, stdout, stderr) => {
          if (error) {
            log.error(`error: ${error.message}`)
            return
          }
          if (stderr) {
            log.log(`stderr: ${stderr}`)
            return
          }
          log.log(`stdout: ${stdout}`)
        })
      } catch (e) {
        log.error(e)
      }
    })
  },
}
