function showStatusBar(input){
    if (input.length >= 1){
        document.getElementById("statusbar").innerHTML = input
        document.getElementById("statusbar").style.display = "block"
    } else{
        document.getElementById("statusbar").innerHTML = ""
        document.getElementById("statusbar").style.display = "none"
    }
}