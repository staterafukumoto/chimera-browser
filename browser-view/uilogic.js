function browserTheme(colour){
    //change the colour of the browser
    document.getElementById("titlebar-region").style.background = colour
}

function makeNewTabLabel(uuid){
    var elements = document.getElementsByClassName('activetab')
    while(elements.length > 0){
        elements[0].classList.remove('activetab');
    } 
    var ntab = document.createElement("span")
    ntab.id = "tab" + uuid
    ntab.innerHTML = " "
    ntab.onclick  = showThisWebview.bind(ntab, uuid);
    ntab.classList = "activetab tab"
    document.getElementById("tabregion").appendChild(ntab)
}

function generateActiveWbv(uuid){
    var wbv = document.createElement("WEBVIEW")
    wbv.classList = "activewbv"
    wbv.src = homepage
    wbv.id = uuid
    document.getElementsByTagName("body")[0].appendChild(wbv)
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
  
function makeNewTab(){
    var uuid = uuidv4()
    var elements = document.getElementsByClassName('activewbv')
    while(elements.length > 0){
        elements[0].classList.remove('activewbv');
    }
    makeNewTabLabel(uuid)
    generateActiveWbv(uuid)
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
  