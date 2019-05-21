function system(page){
    //now we need to make an elevated tab
    var forbidden = [
        "homepage",
        "styles",
        "img",
    ] //urls that the system pseudoprotocol will not open for security reasons
    if (forbidden.includes(page)){
        alert("I'm sorry dave, I'm afraid I can't let you do that")
    } else{
        makeNewTab('file://' + __dirname + '/' + page + '/index.html',true)
    }

}

function isCurrentTabElevated(){
    if (document.getElementsByClassName("activewbv")[0].partition == ""){
        return true
    } else{
        return false
    }
}

function disableUrlForElevatedtabs(){
    if(isCurrentTabElevated() == true){
        document.getElementById("urloverall").style.opacity = "0.5"
        document.getElementById("urloverall").style.pointerEvents = "none"
    } else{
        document.getElementById("urloverall").style.opacity = "1"
        document.getElementById("urloverall").style.pointerEvents = "auto"
    }
}

window.setInterval(disableUrlForElevatedtabs,66)


function executeRemoteFocused(input){
    document.getElementsByClassName("activewbv")[0].executeJavaScript(input)
}

function executeRemoteUUID(uuid,input){
    document.getElementById(uuid).executeJavaScript(input)
}