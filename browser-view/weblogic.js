function goBackActive(){
    document.getElementsByClassName("activewbv")[0].goBack()
}

function goFwdActive(){
    document.getElementsByClassName("activewbv")[0].goForward()
}

function refreshActive(){
    document.getElementsByClassName("activewbv")[0].reload()
}

function stopActive(){
    document.getElementsByClassName("activewbv")[0].stop()
}

function fillURLBar(){
    if (urlbar === document.activeElement){
        //do nothing
    } else{
        // urlbar.value = getCurrentURL()
        if (getCurrentURL().startsWith("file://")){
            urlbar.value = ""
        } else{
            urlbar.value = getCurrentURL()
        }
    }
}

// function fillTabName(){
//     try{
//         // document.getElementsByClassName("activetab")[0].firstChild.innerHTML = document.getElementsByClassName("activewbv")[0].getTitle()

//         if(document.getElementsByClassName("activewbv")[0].getTitle() != ""){
//             document.getElementsByClassName("activetab")[0].childNodes[1].innerHTML =  removeBrackets(document.getElementsByClassName("activewbv")[0].getTitle())
//             document.getElementsByClassName("activetab")[0].childNodes[1].title =  removeBrackets(document.getElementsByClassName("activewbv")[0].getTitle())
//         } else{
//             document.getElementsByClassName("activetab")[0].childNodes[1].innerHTML =  "Home"
//             document.getElementsByClassName("activetab")[0].childNodes[1].title =  "Home"
//         }
//     }catch(err){
//         // document.getElementsByClassName("activetab")[0].innerHTML = ""
//         // document.getElementsByClassName("activetab")[0].title = ""
//     }
// }

// window.setInterval(fillTabName,60)
window.setInterval(fillURLBar,60)

function setWebviewLocation(){
    var input = urlbar.value
    if(input.includes(".")){
        // searchWeb(input)
    } else{
        goTo(input)
    }
}


function getCurrentURL(){
    return document.getElementsByClassName("activewbv")[0].getURL()
}

function goTo(url){
    //make the webview go to url
    // webview.loadURL(url);
    document.getElementsByClassName("activewbv")[0].loadURL(url)
}

function getContent(){
    var input = urlbar.value
}

function get_hostname(url) {
    var m = url.match(/^http:\/\/[^/]+/);
    return m ? m[0] : null;
}

function parseURL(input){
    if(input.includes(".") && input.indexOf(" ") == -1){
        //case for loading url
        if (input.startsWith("https://") || input.startsWith("http://") || input.startsWith("file://")|| input.startsWith("ftp://")){
            goTo(input)
        } else if(input.startsWith("www.")){
            goTo("https://" + input)
        } else{
            goTo ("https://" + input)
        }
    } else{
        googleSearch(input)
    }
}

function getSecureStatus(){
    if (getCurrentURL().startsWith("http://")){
        return "INSECURE"
    } else if(getCurrentURL().startsWith("file://")){
        return "LOCAL"
    } else if(getCurrentURL().startsWith("https://")){
        return "SECURE"
    }
}

function googleSearch(input){
    var safe = encodeURI(input)
    goTo("https://www.google.com/search?q=" + safe)
}

function removeBrackets(input){
    var s = input.replace(/[\{\}<>]/g, ""); //temporary solution, this should be changed later
    return s;
}