/* eslint-disable prettier/prettier */
const { app, BrowserWindow, ipcMain } = require('electron')
const env = process.env.NODE_ENV || 'development'

// include the Node.js 'path' module
const path = require('node:path')
const { print } = require('pdf-to-printer')
let fileData = null

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      minWidth: 1200,
      minHeight: 700,
      fullscreen: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile('build/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('print-file', printSilently)
  ipcMain.handle('set-data', setData)
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

/* if (env.trim() === 'development') {
  console.log('Reloader running', env)
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true,
    })
  } catch (_) {
    console.log('Error')
  }
} */

function setData(e, data) {
  fileData = data
}

async function printSilently() {
  if (fileData === null) return
  /*  let printWin = new BrowserWindow({ title: 'FACTURA', width: 300, minHeight: 350, show: true })
  let file = 'data:text/html;charset=UTF-8, ' + fileData
  printWin.loadURL(file)
  printWin.webContents.on('did-finish-load', () => {
    printWin.webContents.print(
      {
        scaleFactor: 0.5,
        silent: true,
      },
      (success, err) => {
        if (success) {
          printWin.close()
          printWin = null
          return
        }
        console.error(err)
      },
    )
  }) */
  const uri = __dirname + '/assets/FACTURA1.pdf'
  print(uri, {
    paperSize: 'A6',
    scale: 'fit',
  })
    .then(console.log)
    .catch(console.error)
}
