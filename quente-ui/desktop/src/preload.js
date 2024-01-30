/* eslint-disable prettier/prettier */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  printFile: (args) => ipcRenderer.invoke('print-file', args),
  setData: (args) => ipcRenderer.invoke('set-data', args)
})
