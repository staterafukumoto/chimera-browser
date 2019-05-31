//startup time measure
console.time('render-ready')
console.time('main-ready')
//dependancies and stuff
const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
const electron = require('electron');
const Menu = electron.Menu;
const { systemPreferences } = require('electron')

// app.disableHardwareAcceleration()

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
      width: 1154, 
      height: 720,
      minWidth: 550,
      minHeight: 80,
      frame: false,
      backgroundColor: "#000000",
      fullscreenable: true,
      plugins: true,
      webPreferences: { 
        experimentalFeatures: true,
        nodeIntegration: true,
        webviewTag: true,
        'overlay-fullscreen-video': true,
      },
    })

    const template =
    [
      {
        label: 'File',
        submenu: [
          {
            label: 'Add Bookmark',
            click () { win.webContents.send('new-bookmark') },
            accelerator: 'CmdOrCtrl+D',
          },
          {
            label: 'New Tab',
            click () { win.webContents.send('new-tab') },
            accelerator: 'CmdOrCtrl+T',
          },
          {
            label: 'Home',
            click () { win.webContents.send('go-home') },
            accelerator: 'ALT+H',
          },
          {
            label: 'Library',
            click () { win.webContents.send('library') },
            accelerator: 'Ctrl+H',
          },
          {
            label: 'Focus URL Bar',
            click () { win.webContents.send('url-focus') },
            accelerator: 'Ctrl+L',
          },
          {
            label: 'New Window',
            click () { },
            // click () { createWindow() },
            accelerator: 'CmdOrCtrl+N',
          },
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {
            label: 'Clean Slate',
            click () { win.webContents.send('clean-slate') },
            accelerator: 'Ctrl+Alt+Q',
          },
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            click () { win.webContents.send('refresh-tab') },
            accelerator: 'CmdOrCtrl+R',
          },
          {role: 'forcereload'},
          {
            label: 'Tab Inspector',
            click () {win.webContents.send('tab-tools')} ,
            accelerator: 'CmdOrCtrl+Shift+I',
          },
          {
            label: 'App Inspector',
            role: 'toggledevtools',
            accelerator: 'CmdOrCtrl+Shift+Alt+I',
          },
          {
            label: 'Show UI Drawing Boxes',
            click () { win.webContents.send('bound-box') },
            accelerator: 'Alt+Shift+B',
          },
          {
            label: 'Zoom In',
            click () { win.webContents.send('zoom-in') },
            accelerator: 'Control+=',
          },
          {
            label: 'Zoom Out',
            click () { win.webContents.send('zoom-out') },
            accelerator: 'Control+Minus',
          },
          {
            label: 'Reset Zoom to Default',
            click () { win.webContents.send('zoom-reset') },
            accelerator: 'Control+0',
          },
          {type: 'separator'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'window',
        submenu: [
          {role: 'minimize'},
          // {role: 'close'}
          {
            label: 'Close Tab',
            click () { win.webContents.send('close-tab') },
            accelerator: 'Ctrl+W',
          },
          {
            label: 'Preferences',
            click () { win.webContents.send('settings') },
            accelerator: 'Alt+P',
          },
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'No help available yet',
            disabled: true,
          }
        ]
      }
    ]
  
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    // win.setAutoHideMenuBar(true); //perhaps in a future instance where there is an optional native titlebar? 
  

  // and load the app ui of the app.
  win.loadFile('browser-view/index.html')
    if (process.platform === "win32"){
      win.on('app-command', function(e, cmd) { //listen for back button
        if (cmd === 'browser-backward') {
          win.webContents.send('go-back')
        } else if (cmd === 'browser-forward') { //listen for the !back button
          win.webContents.send('go-fwd')
        }
      });
    }
}

function notifWindow() {
  // Create the browser window.
  let ntfy = new BrowserWindow({
      width: 400, 
      height: 128,
      resizable: false,
      frame: false,
      // backgroundColor: "#bb00bb",
      transparent: true,
      fullscreenable: false,
      alwaysOnTop: true,
      webPreferences: { 
        experimentalFeatures: true,
        nodeIntegration: true,
        webviewTag: true,
        'overlay-fullscreen-video': true,
      },
    })
  // and load the app ui of the app.
  ntfy.loadFile('bnotif-view/index.html')
}

//this line used for testing notification window
// app.on('ready', notifWindow, console.timeEnd('main-ready'))
app.on('ready', createWindow, console.timeEnd('main-ready'))

app.on('window-all-closed', () =>
{
  app.quit()
})

ipc.on('new-window', function (event, arg) {
  // browserWindow.setSheetOffset(38,34)
  createWindow()
})

ipc.on('is-ready', function (event, arg) {
    console.timeEnd('render-ready') //the total time
})

ipc.on('runonmain', function (event, arg) {
    eval(arg)
})

function systemColour(){
  if (process.platform == "win32"){
    return systemPreferences.getAccentColor()
  } else{
    return "#cecece"
  }
}
