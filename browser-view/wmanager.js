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
          setAWMaximState("maximised")
          
     } else{
          document.getElementById("mmx1").style.display = "inline"
          document.getElementById("mmx2").style.display = "none"
          document.getElementById('maximbutton').onclick = maximizeWindow
          setAWMaximState("windowed")   
     }
}

function windowIsMaximized(){
    try{
     if (BrowserWindow.getFocusedWindow().isMaximized() == true){
          sessionStorage["isMaximised"] = true
          return true
     } else{
          sessionStorage["isMaximised"] = false
          return false
     }
    } catch(err){
         //session storage only works with strings, why? who the fuck knows.
         return JSON.parse(sessionStorage["isMaximised"]) 
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

//otherlayout function replaced with better theme support

function find_csa(arr, subarr, from_index) {
     var i = from_index >>> 0,
         sl = subarr.length,
         l = arr.length + 1 - sl;
 
     loop: for (; i<l; i++) {
         for (var j=0; j<sl; j++)
             if (arr[i+j] !== subarr[j])
                 continue loop;
         return i;
     }
     return -1;
 }

 function simulatePageError(error){
     if (error == undefined){
          localStorage["tempErrorCode"] = "ERR_TEST_ERROR"
     } else{
          localStorage["tempErrorCode"] = error + "_TEST"
     }
     document.getElementsByClassName("activewbv")[0].stop()
     document.getElementsByClassName("activewbv")[0].src = "error/index.html"
}

function addCSS(filename){
     var head = document.getElementsByTagName('head')[0];
     var style = document.createElement('LINK');
     style.href = filename;
     style.rel = 'stylesheet';
     head.append(style);
}
function addScript(filename){
     var body = document.getElementsByTagName('body')[0];
     var script = document.createElement('script');
     script.src = filename;
     body.append(script);
}
