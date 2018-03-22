

const server = 'https://hazel-server-nieaeytlhz.now.sh'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import * as fs from 'fs';

let mainWindow; // Declare as a global variable so that it can be accessed and isn't garbage collected

const createWindow = () => {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(`${__dirname}/index.html`); // Load index page

  // Opens the DevTools
/*  mainWindow.webContents.openDevTools();*/

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // If app is an array of multiple windows, take special considerations
    mainWindow = null;
  });
};


app.on('ready', createWindow); // Called after electron is done initializing

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Special consideration of MacOS (darwin)
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Special consideration of MacOS (darwin); creates a new window if app is still active but no windows are open and dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});
