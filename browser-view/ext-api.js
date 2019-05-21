//      CHIMERA EXTENSIBILITY API
// reading through this might be of some aid
// in writing extensions or plugins for
// chimera. before writing remember this: 
//                                don't be evil

function addMenuItem(title,action){
    // title = label in drop down menu
    // action = function to call on click, do not put paranthesis after, if it needs a variable use bind
    //          if you don't know about bind, google it.
    var mnuitem = document.createElement("span")
    mnuitem.innerHTML = title
    mnuitem.classList = "menuitem"
    mnuitem.onclick = action
    document.getElementById("menu").appendChild(mnuitem)
}

function definePreload(filePath){
    // input relative path for a preload js file for the webviews
    // should be a js file, one preload can be defined at a time
    // so only use this if you have to (example. adblocker)
    if (filePath.endsWith(".js")){
        window.preloadFile = filePath
    } else{
        throw "invalid preload file name / path"
    }
}