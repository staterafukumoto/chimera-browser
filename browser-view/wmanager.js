const {BrowserWindow} = require('electron').remote;
function minimizeWindow(){
     BrowserWindow.getFocusedWindow().minimize()
}

function maximizeWindow(){
     BrowserWindow.getFocusedWindow().maximize()
     // document.getElementById('maximbutton').onclick = unmaximizeWindow
     window.maximstate = true
}

function unmaximizeWindow(){
     BrowserWindow.getFocusedWindow().unmaximize()
     // document.getElementById('maximbutton').onclick = maximizeWindow
     window.maximstate = false
}

function quitApp(){
     window.close()
}

function monitorMaxim(){
     if (windowIsMaximized()){
          document.getElementById("mmx1").style.display = "none"
          document.getElementById("mmx2").style.display = "inline"
          document.getElementById('maximbutton').onclick = unmaximizeWindow
          
     } else{
          document.getElementById("mmx1").style.display = "inline"
          document.getElementById("mmx2").style.display = "none"
          document.getElementById('maximbutton').onclick = maximizeWindow       
     }
}

function windowIsMaximized(){
    try{
     if (BrowserWindow.getFocusedWindow().isMaximized() == true){
          return true
     } else{
          return false
     }
    } catch(err){
         //lol
    }
}

function checkTabCount(){
     if (document.getElementsByClassName("activetab").length == 0){
          window.close()          
     } else{
     }
}

window.setInterval(monitorMaxim, 60)

function browserThemeSelect(){ //this is a temporary solution, a built in ui will be written in the future
     prompt({
          title: ' ',
          label: 'Choose a hex code, CSS colour code, or "default" for the default theme',
          value: 'default',
          height: 170,
          inputAttrs: {
               type: 'text',
               required: true,
          }
      })
      .then((r) => {
          if(r === null) {
               // console.log('user cancelled');
          } else {
               browserTheme(r)
          }
      })
      .catch(console.error);
}