function browserTheme(colour){
    //change the colour of the browser
    if (colour == "default"){
        document.getElementById("titlebar-region").style.background = "#444"
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

function loadingIndVisible(){
    if(document.getElementsByClassName("activewbv")[0].isLoading()){
        document.getElementById("loaderwrapper").style.opacity = "1"
    } else{
        document.getElementById("loaderwrapper").style.opacity = "0"
    }
}

window.setInterval(loadingIndVisible,50)