const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
      width: 1024, 
      height: 600,
      minWidth: 640,
      minHeight: 380,
      frame: false,
      backgroundColor: "#ffffff",
      webviewTag: true,
      nodeIntegration: true,
      fullscreenable: true,
      plugins: true,
    })

  // and load the app ui of the app.
  win.loadFile('browser-view/index.html')
}

// -- this will apply the menu whenever i build it
// let menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

app.on('ready', createWindow)

app.on('window-all-closed', () =>
{
  app.quit()
})
