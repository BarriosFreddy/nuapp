// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

/* eslint-disable prettier/prettier */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  printFile: (args) => ipcRenderer.invoke('print-file', args),
  setData: (args) => ipcRenderer.invoke('set-data', args)
})
