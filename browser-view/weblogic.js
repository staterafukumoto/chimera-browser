// function parseBarcontent(){

// }

function goBackActive(){
    document.getElementsByClassName("activewbv")[0].goBack()
}

function goFwdActive(){
    document.getElementsByClassName("activewbv")[0].goForward()
}

function refreshActive(){
    document.getElementsByClassName("activewbv")[0].reload()
}

function fillURLBar(){
    if (urlbar === document.activeElement){
        //do nothing
    } else{
        urlbar.value = getCurrentURL()
    }
}

function fillTabName(){
    document.getElementsByClassName("activetab")[0].innerHTML = document.getElementsByClassName("activewbv")[0].getTitle()
    document.getElementsByClassName("activetab")[0].title = document.getElementsByClassName("activewbv")[0].getTitle()
}

window.setInterval(fillURLBar,60)
window.setInterval(fillTabName,60)

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
    if(input.includes(".")){
        //case for loading url
        if (input.startsWith("https://")){
            goTo(input)
        } else if(input.startsWith("www.")){
            goTo("https://" + input)
        } else{
            goTo ("https://www." + input)
        }
    } else{
        googleSearch(input)
    }
}

function googleSearch(input){
    var safe = encodeURI(input)
    goTo("https://www.google.com/search?q=" + safe)
}

