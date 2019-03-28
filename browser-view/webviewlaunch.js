makeNewTab()

if (localStorage["themeColor"] == undefined){
    browserTheme("default")
} else{
    browserTheme(localStorage["themeColor"])
}

// document.getElementById("loadmask").style.opacity = "0"; document.getElementById("loadmask").style.pointerEvents = "none"