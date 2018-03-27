import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import {log} from './logger';
import template from './menu';
import {resolve} from 'path';
log('Main process started: main');
let mainWindow; // Define as global

const createWindow = () => {
  // Create the browser window
  log('creating main window...');
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(resolve('./index.html')); // Load index page

  // Opens the DevTools
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // If app is an array of multiple windows, take special considerations
    mainWindow = null;
  });
  log('main window created');
};

let menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on('ready', createWindow); // Called after electron is done initializing
log('app ready');

ipcMain.on('preset', (event, args) => {
  log('preset recieved');
  event.sender.send(args);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Special consideration of MacOS (darwin)
  log('app was closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  /*
    * Special consideration of MacOS (darwin)
    * creates a new window if app
    * is still active but no windows are open and dock icon is clicked
    */
  log('dock icon pressed (app activated)');
  if (mainWindow === null) {
    createWindow();
  }
});
