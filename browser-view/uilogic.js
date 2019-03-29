function browserTheme(colour){
    //change the colour of the browser
    if (colour == "default"){
        document.getElementById("titlebar-region").style.background = "#343538"
        document.getElementById("tabindic").style.background = "#343538"
        document.getElementById("inverter").style.display = "none"
    } else{
        if (lightOrDark(colour) == "dark"){
            document.getElementById("titlebar-region").style.background = colour
            document.getElementById("tabindic").style.background = colour
            document.getElementById("inverter").style.display = "none"
        } else{
            document.getElementById("titlebar-region").style.background = invertColor(colour)
            document.getElementById("tabindic").style.background = invertColor(colour)
            document.getElementById("inverter").style.display = "block"
        }
    }
    localStorage["themeColor"] = colour
}

function webViewNightMode(arg){
    //true or false
    if (arg == true){
        // document.getElementsByClassName("activewbv")[0].style.filter = "invert(1)"
        document.getElementById("webwrapper").style.filter = "invert(1)"
    } else{
        document.getElementById("webwrapper").style.filter = "invert(0)"
    }
}

function makeNewTabLabel(uuid){
    var elements = document.getElementsByClassName('activetab')
    while(elements.length > 0){
        elements[0].classList.remove('activetab');
    }
    //make the tab container
    var ntab = document.createElement("div")
    ntab.id = "tab" + uuid
    ntab.innerHTML = " "
    ntab.classList = "activetab tab"
    //make the tab text
    var ntabinner = document.createElement("span")
    ntabinner.id = "inner" + uuid
    ntabinner.innerHTML = "New Tab"
    ntabinner.classList = "tabtext"
    ntabinner.onclick  = showThisWebview.bind(ntabinner, uuid);
    //make the tab favicon
    var ntabicon = document.createElement("img")
    ntabicon.id = "icon" + uuid
    ntabicon.src = "../assets/icons/win/icon.ico"
    ntabicon.classList = "tabimg"
    ntabicon.draggable = false
    ntabicon.onclick  = showThisWebview.bind(ntabicon, uuid);
    //make the close button
    var tclose = document.createElement("span")
    tclose.id = "close" + uuid
    tclose.innerHTML = "close"
    tclose.onclick  = closeTab.bind(tclose, uuid);
    tclose.classList = "tabclosebtn"
    //append to tabregion
    ntab.appendChild(ntabinner)
    ntab.appendChild(ntabicon)
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
    document.getElementById("webwrapper").appendChild(wbv)
    document.getElementById(uuid).addEventListener('new-window', (e) => { //get _blank targets and open them in new tabs, you know, like a browser
        var protocol = require('url').parse(e.url).protocol
            makeNewTab(e.url)
    })
    document.getElementById(uuid).addEventListener('update-target-url', (e) => { //get the url that has mouse/keyboard focus
        showStatusBar(e.url)
    })
    document.getElementById(uuid).addEventListener('page-favicon-updated', (e) => { //update favicon
        document.getElementById("icon" + uuid).src = e.favicons[0]
    })
    document.getElementById(uuid).addEventListener('enter-html-full-screen', function(){ //broken
        console.log("entering html-full-screen")
        fullscreen("enter")
        // electron.remote.getCurrentWindow().setFullScreen(true)
    })
    document.getElementById(uuid).addEventListener('exit-html-full-screen', function(){ //also broken
        console.log("exiting html-full-screen")
        fullscreen("exit")
        // electron.remote.getCurrentWindow().setFullScreen(false)
    })
    document.getElementById(uuid).addEventListener('did-finish-load', function(){ //push the webview's data to the history object
        appendToHistory(document.getElementById(uuid).getTitle(), document.getElementById(uuid).getURL())
    })
    document.getElementById(uuid).addEventListener('page-title-updated', function(){ //push the webview's data to the history object
        setTabTitle(uuid, document.getElementById(uuid).getTitle())
    })
  
   
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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
    if (getTabQuantity() == 1){ //this is the last straw. er i mean tab.
        window.close()
    } else{ //this being an else statement probably speeds something up
        removeTag(uuid)
        removeTag("tab" + uuid)
        //temporary solution, aim to select last tab in tab list in the future.
        document.getElementsByClassName("tab")[0].firstElementChild.click()
    }
}

function loadingActivity(){
    try{
        if(document.getElementsByClassName("activewbv")[0].isLoading()){
            document.getElementById("loaderwrapper").style.opacity = "1"
            document.getElementById("reloadbutton").innerHTML = "close"
            document.getElementById("reloadbutton").onclick = stopActive
        } else{
            document.getElementById("loaderwrapper").style.opacity = "0"
            document.getElementById("reloadbutton").innerHTML = "refresh"
            document.getElementById("reloadbutton").onclick = refreshActive
        }
    } catch{
        
    }
}

window.setInterval(loadingActivity,50)

function fullscreen(){
    //figure out why electron won't fucking fullscreen later
    //but honestly i just want sleep
    //update. still tired. i'm going to go to bed, goodnight whoever's reading this.
    electron.remote.getCurrentWindow().maximize()
}

function fullscreenExit(){
    electron.remote.getCurrentWindow().unmaximize()
}

function closeThisTab(){
    document.getElementsByClassName("activetab")[0].lastElementChild.click()
}

function showMenu(){
    document.getElementById("backdropmenu").style.opacity = "1"
    document.getElementById("backdropmenu").style.pointerEvents = "auto"
    document.getElementById("menu").style.top = "72px"
    document.getElementById("menu").style.opacity = "1"
    document.getElementById("menu").style.pointerEvents = "auto"
    document.getElementById("mnubutton").style.color = "#adadad"
    document.getElementById("mnubutton").onclick = hideMenu
}

function hideMenu(){
    document.getElementById("backdropmenu").style.opacity = "0"
    document.getElementById("backdropmenu").style.pointerEvents = "none"
    document.getElementById("menu").style.top = "0px"
    document.getElementById("menu").style.opacity = "0"
    document.getElementById("menu").style.pointerEvents = "none"
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
    } else if (getSecureStatus() == "LOCAL"){
        urlbar.style.paddingLeft = "20px"
        urlbar.style.width = "calc(100% - 240px)"
        document.getElementById("notsecure").style.display = "none"
        document.getElementById("urlbar").title = local_string
    } else if(getSecureStatus() == "SECURE"){
        urlbar.style.paddingLeft = "20px"
        urlbar.style.width = "calc(100% - 240px)"
        document.getElementById("notsecure").style.display = "none"
        document.getElementById("urlbar").title = secure_string
    }
}

window.setInterval(updateAppTitle, 60)
window.setInterval(writeSecureStatusToUserInterface, 60)

function getTabQuantity(){
    return document.getElementById("tabregion").childNodes.length - 5 //who the hell thought comments counted as nodes? apparently they do!
}


function showPanel(arg){
    document.getElementById("webwrapper").style.right = "380px"
    document.getElementById("panelwrapper").style.right = "0px"
    // document.getElementById("panelframe").src = arg
    window.panelIsOut = true
}

function hidePanel(){
    document.getElementById("webwrapper").style.right = "0px"
    document.getElementById("panelwrapper").style.right = "-381px"
    window.panelIsOut = false
}

function setPanelTitle(){
    document.getElementById("panellabel").innerHTML = document.getElementById("panelframe").contentDocument.title
}

window.setInterval(setPanelTitle,200)

function isFocused(elementID){
    return document.activeElement === document.getElementById(elementID)
}

function urlBarSelect(){

}

function setTabTitle(uuid,title){
    document.getElementById('tab' + uuid).childNodes[1].innerHTML = title
    document.getElementById('tab' + uuid).title = title
    // document.getElementsByClassName("activetab")[0].childNodes[1].innerHTML =  "Home"
}

function closeCurrentTab(){
    document.getElementsByClassName("activetab")[0].lastElementChild.click()
}

function getCurrentTab(){
    // document.getElementById("tabregion").childNodes[1].classList.contains("activetab")
    var int = 0
    while(getTabQuantity() > 0){
        // elements[0].classList.remove('activetab');
    } 
    function testelements(input){
        return document.getElementById("tabregion").childNodes[input].classList.contains("activetab")
    }
}

function buttonDisabler(){
    //disable back button
    if (document.getElementsByClassName("activewbv")[0].canGoBack()){
        // console.log('hello')
        document.getElementById("backbutton").classList.remove("ubardisabled")
    } else{
        document.getElementById("backbutton").classList.add("ubardisabled")
    }
    //disable forward button 
    if (document.getElementsByClassName("activewbv")[0].canGoForward()){
        // console.log('hello')
        document.getElementById("fwdbutton").classList.remove("ubardisabled")
    } else{
        document.getElementById("fwdbutton").classList.add("ubardisabled")
    }
}

window.setInterval(buttonDisabler,60)

// pretty tabs
function setIndicatorPos(){
    document.getElementById("tabindic").style.left = document.getElementsByClassName("activetab")[0].offsetLeft + "px"
    document.getElementById("tabindic").style.width = document.getElementsByClassName("activetab")[0].offsetWidth + "px"
}

window.setInterval(setIndicatorPos, 40)

function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}