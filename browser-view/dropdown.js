function showDropDown(){
        document.getElementById('dropdownwrapper').style.display = "block"
        document.getElementById("backdropbookmarks").style.opacity = "1"
        document.getElementById("backdropbookmarks").style.pointerEvents = "auto"
}

function hideDropDown(){
    document.getElementById("dropdownwrapper").style.display = "none"
    document.getElementById("backdropbookmarks").style.opacity = "0"
    document.getElementById("backdropbookmarks").style.pointerEvents = "none"
}