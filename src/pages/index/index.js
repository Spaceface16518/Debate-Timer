//import * as $ from "jquery"; // May not be needed
import * as electron from 'electron';
import {ipcRenderer} from 'electron';
import { resolve } from 'path';
const BrowserWindow = electron.remote.BrowserWindow

// The two child windows
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

  timerWin.loadURL(resolve('./timer.html'))

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

    metaWin.loadURL(resolve('./meta.html'));

    metaWin.on("closed", () => {
      metaWin = null;
    });
}
