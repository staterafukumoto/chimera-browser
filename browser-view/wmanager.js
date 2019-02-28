const {BrowserWindow} = require('electron').remote;

function minimizeWindow(){
     BrowserWindow.getFocusedWindow().minimize()
}

function quitApp(){
     window.close()
}