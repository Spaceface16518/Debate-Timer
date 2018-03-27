// import * as $ from 'jquery';
import * as electron from 'electron';
import {ipcRenderer} from 'electron';
import {resolve} from 'path';
import {log} from './logger';
const BrowserWindow = electron.remote.BrowserWindow;

let preset; // The current preset selected
// The two child windows
let metaWin;
let timerWin;

$(document).ready(function() {
  $('.timerWindow').click(function() {
    createTimerWindow();
    log('created timer window');
  });

  $('.metaWindow').click(function() {
    createMetaWindow();
  });

  $('.preset').click(function(event) {
    let text = event.target.innerText;
    $('.currentPreset').removeClass('currentPreset');
    let newPreset = document.getElementById(event.target.id);
    newPreset.setAttribute('class', 'currentPreset');
    preset = parseInt(text); // "preset" is the global variable
  });
});

// FUNCTIONS
function createTimerWindow() {
  metaWin = null;
  timerWin = new BrowserWindow({
    width: 200,
    height: 100,
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

  sendPreset(preset);

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
