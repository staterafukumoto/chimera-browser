const { app, BrowserWindow } = require('electron')
// import 'material-design-icons/iconfont/material-icons.css'

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
       width: 800, 
       height: 600,
       minWidth: 800,
       minHeight: 600,
       frame: false,
        backgroundColor: "#212121",
    })

  // and load the index.html of the app.
  win.loadFile('browser-view/index.html')
}

app.on('ready', createWindow)