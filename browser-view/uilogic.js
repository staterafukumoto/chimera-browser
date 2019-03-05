function browserTheme(colour){
    //change the colour of the browser
    if (colour == "default"){
        document.getElementById("titlebar-region").style.background = "#252525"
    } else{
        document.getElementById("titlebar-region").style.background = colour
    }
}

function webViewNightMode(arg){
    //true or false
    if (arg == true){
        document.getElementsByClassName("activewbv")[0].style.filter = "invert(1)"
    } else{
        document.getElementsByClassName("activewbv")[0].style.filter = "invert(0)"
    }
}

function makeNewTabLabel(uuid){
    var elements = document.getElementsByClassName('activetab')
    while(elements.length > 0){
        elements[0].classList.remove('activetab');
    } 
    var ntab = document.createElement("div")
    ntab.id = "tab" + uuid
    ntab.innerHTML = " "
    ntab.classList = "activetab tab"
    var ntabinner = document.createElement("span")
    ntabinner.id = "inner" + uuid
    ntabinner.innerHTML = "Initializing"
    ntabinner.classList = "tabtext"
    ntabinner.onclick  = showThisWebview.bind(ntabinner, uuid);
    var tclose = document.createElement("span")
    tclose.id = "close" + uuid
    tclose.innerHTML = "close"
    tclose.onclick  = closeTab.bind(tclose, uuid);
    tclose.classList = "tabclosebtn"
    ntab.appendChild(ntabinner)
    ntab.appendChild(tclose)
    document.getElementById("tabregion").appendChild(ntab)
}

function generateActiveWbv(uuid,url){
    var wbv = document.createElement("WEBVIEW")
    wbv.classList = "activewbv"
    wbv.useragent = useragent
    if (typeof url === "undefined"){
        wbv.src = homepage
    } else{
        wbv.src = url
    }
    wbv.id = uuid
    document.getElementsByTagName("body")[0].appendChild(wbv)
    document.getElementById(uuid).addEventListener('new-window', (e) => {
        var protocol = require('url').parse(e.url).protocol
            makeNewTab(e.url)
    })
    document.getElementById(uuid).addEventListener('enter-html-full-screen', function(){
        console.log("entering html-full-screen")
        fullscreen("enter")
    })
    document.getElementById(uuid).addEventListener('exit-html-full-screen', function(){
        console.log("exiting html-full-screen")
        fullscreen("exit")
    })
  
   
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
  
function makeNewTab(url){
    var uuid = uuidv4()
    var elements = document.getElementsByClassName('activewbv')
    while(elements.length > 0){
        elements[0].classList.remove('activewbv');
    }
    makeNewTabLabel(uuid)
    generateActiveWbv(uuid,url)
}

// btn.ondblclick  = warnUser.bind(btn, userid,username);

function showThisWebview(uuid){
    var elements = document.getElementsByClassName('activewbv')
    while(elements.length > 0){
        elements[0].classList.remove('activewbv');
    }
    var tabs = document.getElementsByClassName('activetab')
    while(tabs.length > 0){
        tabs[0].classList.remove('activetab');
    }
    var tabid = "tab" + uuid
    document.getElementById(uuid).classList = "activewbv"
    document.getElementById(tabid).classList = "activetab tab"
}

urlbar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      parseURL(urlbar.value)
      urlbar.blur()
    }
})

urlbar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 27) {
      urlbar.blur()
    }
})
  
function closeTab(uuid){
    removeTag(uuid)
    removeTag("tab" + uuid)
    //temporary solution, aim to select last tab in tab list in the future.
    document.getElementsByClassName("tab")[0].firstElementChild.click()
}

function loadingActivity(){
    if(document.getElementsByClassName("activewbv")[0].isLoading()){
        document.getElementById("loaderwrapper").style.opacity = "1"
        document.getElementById("reloadbutton").innerHTML = "close"
        document.getElementById("reloadbutton").onclick = stopActive
    } else{
        document.getElementById("loaderwrapper").style.opacity = "0"
        document.getElementById("reloadbutton").innerHTML = "refresh"
        document.getElementById("reloadbutton").onclick = refreshActive
    }
}

window.setInterval(loadingActivity,50)

function fullscreen(){
    //figure out why electron won't fucking fullscreen later, but for now
    //but honestly i just want sleep
    electron.remote.getCurrentWindow().maximize()
}

function fullscreenExit(){
    electron.remote.getCurrentWindow().unmaximize()
}

function closeThisTab(){
    document.getElementsByClassName("activetab")[0].lastElementChild.click()
}

function showMenu(){
    document.getElementById("menu").style.right = "2px"
    document.getElementById("menu").style.opacity = "1"
    document.getElementById("menu").style.transform = "scale(1)"
    document.getElementById("mnubutton").style.color = "#adadad"
    document.getElementById("mnubutton").onclick = hideMenu
}

function hideMenu(){
    document.getElementById("menu").style.right = "-250px"
    document.getElementById("menu").style.transform = "scale(0.9)"
    document.getElementById("menu").style.opacity = "0"
    document.getElementById("mnubutton").style.color = "white"
    document.getElementById("mnubutton").onclick = showMenu
}

function updateAppTitle(){
    // updateAppTitle.innerHTML = "test"
    var cpage = document.getElementsByClassName("activewbv")[0].getTitle()
    try{
        BrowserWindow.getFocusedWindow().setTitle(cpage + " - " + appname)
    } catch(err){
        //don't do a thing, because the web browser isn't focused and thus it cannot get the focused window to update the title
        //there should be a way around this but i'd like to avoid declaring the focused window at startup to prevent bugs
    }
}

function writeSecureStatusToUserInterface(){
    if (getSecureStatus() == "INSECURE"){
        urlbar.style.paddingLeft = "130px"
        urlbar.style.width = "calc(100% - 350px)"
        document.getElementById("notsecure").style.display = "inline"
        document.getElementById("urlbar").title = insecure_string
    } else{
        urlbar.style.paddingLeft = "20px"
        urlbar.style.width = "calc(100% - 240px)"
        document.getElementById("notsecure").style.display = "none"
        document.getElementById("urlbar").title = secure_string
    }
}

window.setInterval(updateAppTitle, 60)
window.setInterval(writeSecureStatusToUserInterface, 60)
