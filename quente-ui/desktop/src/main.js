/* eslint-disable prettier/prettier */
const { updateElectronApp, UpdateSourceType } = require('update-electron-app')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { renderPDF } = require('./RenderPDF')
updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: 'BarriosFreddy/nuapp'
  },
  updateInterval: '1 hour',
  logger: require('electron-log')
})
if (require('electron-squirrel-startup')) app.quit();
const env = process.env.NODE_ENV || 'development'

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
  win.maximize()
  // win.webContents.openDevTools()
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
  renderPDF(fileData)
}
