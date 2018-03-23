import * as $ from 'jquery'; // May not be needed
import * as electron from 'electron';
import {ipcRenderer} from 'electron';
import {resolve} from 'path';
import * as fs from 'fs';
const BrowserWindow = electron.remote.BrowserWindow;

// The two child windows
let metaWin;
let timerWin;

$(document).ready(function() {
  $('.createTimerWindow').click(function() {
    createTimerWindow();
    fs.appendFile('./.appcache.log', `[${Date.now()}]: created timer window\n`,
      (err) => {
        console.error(err);
      });
  });

  $('.createMetaWindow').click(function() {
    createMetaWindow();
  });
});

// FUNCTIONS
function createTimerWindow() {
  metaWin = null;
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
    vibrancy: 'popover',
    alwaysOnTop: true,
  });

  timerWin.loadURL(resolve('./timer.html'));

  timerWin.on('closed', () => {
    timerWin = null;
  });
}

function createMetaWindow() {
  timerWin = null;
  metaWin = new BrowserWindow({
    width: 800,
    height: 400,
    frame: true,
    hasShadow: false,
    resizable: false,
  });

  metaWin.loadURL(resolve('./meta.html'));

  metaWin.on('closed', () => {
    metaWin = null;
  });
}

// NOTE: duration should be in epoc time
function sendPreset(duration) {
  ipcRenderer.send('preset', duration);
}
