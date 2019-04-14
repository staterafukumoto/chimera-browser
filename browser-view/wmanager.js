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

function otherLayout(arg){ //a layout more... mac like perhaps? ( ͡° ͜ʖ ͡°)
     //arg = mac/pc (assumed pc if unfilled)
     if (arg == "mac"){
          document.getElementById("tabregion").style.paddingLeft = "80px"
          document.getElementsByClassName("ui-titlecontrols")[0].style.display = "none"
          document.getElementById("newtabbutton").style.right = "0px"
     }
     document.getElementById("tabregion").style.right = "0px"
     document.getElementById("urlbar").style.borderRadius = "6px"
     document.getElementById("urlbar").style.borderColor = "rgba(0,0,0,0)"
     document.getElementById("menu").style.borderRadius = "6px"
     document.getElementById("bookmarkapplet").style.borderRadius = "6px"
     document.getElementById("tabindic").style.borderTopLeftRadius = "6px"
     document.getElementById("tabindic").style.borderTopRightRadius = "6px"
     document.getElementById("tabindic").style.boxShadow = "none"

}

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
