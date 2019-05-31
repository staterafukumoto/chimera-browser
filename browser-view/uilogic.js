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
    ntabicon.src = "../assets/icons/png/paper.png"
    ntabicon.classList = "tabimg"
    ntabicon.draggable = false
    ntabicon.onclick  = showThisWebview.bind(ntabicon, uuid);
    ntabicon.onerror = function() {this.src = "../assets/icons/png/paper.png"} //this is the paper

    //make the close button
    var tclose = document.createElement("span")
    tclose.id = "close" + uuid
    tclose.innerHTML = "close"
    tclose.onclick  = closeTab.bind(tclose, uuid);
    tclose.classList = "tabclosebtn"
    tclose.title = "Close Tab"
    
    //append to tabregion
    ntab.appendChild(ntabinner)
    ntab.appendChild(ntabicon)
    ntab.appendChild(tclose)
    document.getElementById("tabregion").appendChild(ntab)
}

function generateActiveWbv(uuid,url,elevation){ //this generates the frame itself
    var wbv = document.createElement("WEBVIEW")
    wbv.classList = "activewbv"
    // wbv.useragent = useragent
    if (elevation == true){
        wbv.partition = elevpartition
        wbv.nodeintegration = true
        // wbv.preload = ""
    } else{
        wbv.partition = regupartition
        // wbv.preload = preloadFile
    }
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
    document.getElementById(uuid).addEventListener('did-fail-load', (e) => { //the fault in our connection
        console.log(e.errorDescription)
        if (e.errorCode != -3){
            document.getElementById(uuid).stop()
            window.setTimeout(function(){
                var er = e.errorDescription
                var url = document.getElementById(uuid).getURL()
                document.getElementById(uuid).stop()
                document.getElementById(uuid).src = "error/index.html"
                document.getElementById(uuid).addEventListener('did-finish-load',soManyLayers)
                function soManyLayers(){
                    function tellErrorPage(){
                        var es =  "fillErrorCode('" + er.toString() + "','" + url.toString() + "')"
                        return es.toString()
                    }
                    executeRemoteUUID(uuid, tellErrorPage())
                    document.getElementById(uuid).removeEventListener('did-finish-load',soManyLayers)
                }
            },250)
        }
    })
    document.getElementById(uuid).addEventListener('page-favicon-updated', (e) => { //update favicon
        document.getElementById("icon" + uuid).src = e.favicons[0]
    })
    document.getElementById(uuid).addEventListener('enter-html-full-screen', function(){
        fsLayout("fs") //set layout to fullscreen
    })
    document.getElementById(uuid).addEventListener('leave-html-full-screen', function(){ 
        fsLayout("nfs") //set layout to not fullscreen
    })
    document.getElementById(uuid).addEventListener('did-finish-load', function(){ //push the webview's data to the history object
        appendToHistory(document.getElementById(uuid).getTitle(), document.getElementById(uuid).getURL())
    })
    document.getElementById(uuid).addEventListener('page-title-updated', function(){ //push the webview's data to the history object juuuust to be safe
        setTabTitle(uuid, document.getElementById(uuid).getTitle())
    })
    document.getElementById(uuid).addEventListener('close', function(){ //let the tab close itself
        closeTab(uuid)
    })
    document.getElementById(uuid).addEventListener('crashed', function(){ //let the tab close itself
        simulatePageError() //replace with actual crash later
    })
}


function makeNewTab(url,elev){
    // first argument is the url, second is the elevation status as a boolean value, though it is assumed false if not defined.
    // a url is required to make an elevated tab 
    var uuid = uuidv4()
    var elements = document.getElementsByClassName('activewbv')
    while(elements.length > 0){
        elements[0].classList.remove('activewbv');
    }
    if(elev == false || elev == undefined){
        //unelevated conditions
        generateActiveWbv(uuid,url,false)
    } else if (elev == true){
        //elevated conditions
        generateActiveWbv(uuid,url,true)
    } else{
        throw "INVALID_TAB_ELEVATION"
    }
    makeNewTabLabel(uuid)
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
// btn.ondblclick  = warnUser.bind(btn, userid,username);

function showThisWebview(uuid){
    disableUrlForElevatedtabs()
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
    //   hideDropDown()
    }
})

urlbar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 27) {
      urlbar.blur()
    //   hideDropDown()
    }
})
  
function closeTab(uuid){
    if (document.getElementsByClassName("activewbv")[0].id == uuid){
        var flag = 1 // tab in foreground
    } else{
        var flag = 0 //tab in background
    }
    if (getTabQuantity() == 1){ //this is the last straw. er i mean tab.
        window.close()
    } else{
        //tab close routine
        if (flag == 1){
            //temporary solution, aim to select last tab in tab list in the future.
            document.getElementsByClassName("tab")[0].firstElementChild.click()
        } else{} 
        //don't switch tabs if the tab that's 
        //being closed isn't the focused tab
        document.getElementById("tab" + uuid).style.transformOrigin = "bottom left"
        document.getElementById("tab" + uuid).style.opacity = "0"
        document.getElementById("tab" + uuid).style.transform = "scale(1,0)"
        removeTag(uuid)
        window.setTimeout(function(){
            removeTag("tab" + uuid)
        },200)
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
    document.getElementById("mnubutton").style.filter = "invert(0.5)"
    // document.getElementById("mnubutton").style.color = "#adadad"
    document.getElementById("mnubutton").onclick = hideMenu
}

function hideMenu(){
    document.getElementById("backdropmenu").style.opacity = "0"
    document.getElementById("backdropmenu").style.pointerEvents = "none"
    document.getElementById("menu").style.top = "0px"
    document.getElementById("menu").style.opacity = "0"
    document.getElementById("menu").style.pointerEvents = "none"
    document.getElementById("mnubutton").style.filter = "invert(0)"
    // document.getElementById("mnubutton").style.color = "white"
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
    var output = document.getElementById("notsecure")
    var input = getSecureStatus()
    var urlbar = document.getElementById("urlbar")
    if (getSecureStatus() == "INSECURE"){
        output.title = insecure_string
        output.innerHTML = insecure_message
        urlbar.style.width = "calc(100% - 298px)"
        urlbar.style.paddingLeft = "110px"
    } else if(getSecureStatus() == "SECURE"){
        output.title = secure_string
        output.innerHTML = secure_message
        urlbar.style.width = "calc(100% - 288px)"
        urlbar.style.paddingLeft = "100px"
    } else if(getSecureStatus() == "LOCAL" && isCurrentTabElevated() == true){
        output.title = elevated_string
        output.innerHTML = elevated_message
        urlbar.style.width = "calc(100% - 288px)"
        urlbar.style.paddingLeft = "100px"
    } else if (getSecureStatus() == "LOCAL"){
        output.title = local_string
        output.innerHTML = local_message
        urlbar.style.width = "calc(100% - 263px)" //this is such a godawful system i need to fix 
        urlbar.style.paddingLeft = "75px" //        this is seriously getting out of hand
    }  //                                           oof.  ouch.
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
    document.getElementById('tab' + uuid).childNodes[1].innerHTML = sanitiseText(title)
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

function cleanSlate(){
    var amntClear = 25
    // createToast("Clearing " + amntClear +" history entries and restarting")
    showNotification("Clean Slate","Clearing 25 history entries and restarting",2500)
    deleteFromHistory(amntClear)
    location.reload()
}

function deleteFromHistory(quantity){
    var afterlength = historyObject.length - quantity + 1
    do{ //a regular while loop doesn't work here... okay.
        historyObject.shift()
    } while( historyObject.length >= afterlength)
    historySave()
}

function checkTabPlace(uuid){
    var openTabs = document.getElementById("tabregion").childNodes
    // var tabQuantity = getTabQuantity()
    var tabQuantity = document.getElementById("tabregion").childNodes.length
    var i
    while(openTabs > 0){
    }

}

function sanitiseText(input){
    //function for sanitising user input before putting it in the ui
    //because you can type things in there and if you could do html injection
    //into the browser's ui that's not very good D:
    var s1 = input.replace("<","&lt;")
    return s1
}

function toggleDebug(){
    if (boundDebugState == false){
         var head = document.getElementsByTagName('head')[0]
         var style = document.createElement('LINK')
         style.href = "styles/debug.css"
         style.rel = 'stylesheet'
         style.id = "debug-chimera"
         head.append(style);
         window.boundDebugState = true
        //  showNotification("Debug: Bounding ON","Showing bounding boxes, Press Alt+ShifT+B to disable",2500)
    } else{
         document.getElementById("debug-chimera").parentNode.removeChild(document.getElementById("debug-chimera"))
        //  showNotification("Debug: Bounding OFF","Hiding bounding boxes, Press Alt+ShifT+B to enable",2500)
         window.boundDebugState = false
    }
}

function setAWMaximState(input){
    //accepts "maximised" or "windowed"
    if (input == "maximised"){
        document.getElementById("allwrapper").classList = "awmaxim"
    } else if (input == "windowed"){
        document.getElementById("allwrapper").classList = "awwindowed"
    } else if(input == "fullscreen"){
        document.getElementById("allwrapper").classList = "awmaxim"
    }else{
        throw "unaccepted_input at setAWMaximState"
    }
}

function fsLayout(input){
    //accepts "fs" or "nfs"
    if (input == "fs"){
        document.getElementById("titlebar-region").style.top = "-69px" //nice
        document.getElementById("webwrapper").style.top = "0px"
    } else if (input == "nfs"){
        document.getElementById("titlebar-region").style.top = "0px"
        document.getElementById("webwrapper").style.top = "68px"
    }
}

function updateZoomCounterDisplay(){
    var int = Math.round(document.getElementsByClassName("activewbv")[0].getZoomFactor()*100)
    document.getElementById("zoomdisplay").innerHTML = int + "%"
}

window.setInterval(updateZoomCounterDisplay,66)

function zoomIn(){
    var updatedCount = document.getElementsByClassName("activewbv")[0].getZoomFactor() + 0.25
    document.getElementsByClassName("activewbv")[0].setZoomFactor(updatedCount)
}

function zoomOut(){
    var updatedCount = document.getElementsByClassName("activewbv")[0].getZoomFactor() - 0.25
    document.getElementsByClassName("activewbv")[0].setZoomFactor(updatedCount)
}

function zoomDefault(){
    document.getElementsByClassName("activewbv")[0].setZoomFactor(1)
}

function printPage(){
    document.getElementsByClassName("activewbv")[0].print()
}


function clickFirstTab(){
    document.getElementsByClassName("tab")[0].firstElementChild.click()
}
