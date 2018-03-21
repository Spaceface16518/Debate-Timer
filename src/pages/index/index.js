const electron = require('electron')
const { ipcRenderer } = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const path = require('path')

let metaWin;
let timerWin;

function createTimerWindow() {
  timerWin = new BrowserWindow({
    width: 400,
    height: 200,
    minimizable: false,
    maximizable: false,
    maxHeight: 300,
    minHeight: 100,
    maxWidth: 600,
    minWidth: 200,
    center: false,
    frame: false,
    hasShadow: true,
    vibrancy: 'popover'
  })

  timerWin.loadURL(path.resolve('./timer.html'))

  timerWin.on('closed', () => {
    timerWin = null
  })
}

function createMetaWindow() {
    metaWin = new BrowserWindow({
      width: 800,
      height: 400,
      frame: true,
      hasShadow: false,
      resizable: false
    });

    metaWin.loadURL(path.resolve('./meta.html'));

    metaWin.on("closed", () => {
      metaWin = null;
    });
}

