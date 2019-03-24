function appendToHistory(pagename, pageurl){
    if(keepHistory == true){
        if(pageurl.startsWith("file://")){
            //don't keep history
        } else{
            var time = Date.now()
            window.historyObject.unshift([time, pagename,pageurl])
        }
    }
    historySave()
}

function timestampToReadable(unix){
    return new Date(unix)
}

function historySearch(query){
    var p = 0 //current count
    for (var i = historyObject.length; p <= i; p++){
        if (historyObject[p].includes(query)){
            return p
            // return historyObject[p]
        } else{
            return "NOT_FOUND"
        }
    }
}

function historySearchArrayReturn(query){
    return historyObject[historySearch(query)]
}

function historySave(){
    localStorage['historyObject'] = JSON.stringify(historyObject)
}

function historyGet(){
    return JSON.parse(localStorage['historyObject'])
}

function historyOverwrite(){
    window.historyObject = JSON.parse(localStorage['historyObject'])
}

function historyClear(){
    localStorage["historyObject"] = ""
    window.historyObject = []
}


if (historyObject.length == 0){
    try{
        historyOverwrite()
    } catch(err){
        //
    }
}
