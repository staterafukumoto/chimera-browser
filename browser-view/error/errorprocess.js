// var errorcode = localStorage['tempErrorCode']

function conncetBadURL(){
    var str = errorURL.substr(5)
    window.location.href = "http" + str
}



function fillErrorCode(er,url){
    console.log("filling error data")
    document.getElementById('errorcodeinner').innerHTML = er.toLowerCase()
    window.errorURL = url
    window.errorDesc = er
    if (er == "ERR_CERT_AUTHORITY_INVALID"){
        document.getElementById("header").innerHTML = "Sorry!"
        document.getElementById("maintext").innerHTML = "Your connection isn't secure or private, and Chimera cannot guarantee your safety."
        document.getElementById("casespecific").innerHTML = "Connect over an insecure connection anyways."
        document.getElementById("litwo").innerHTML = "Yell at the host of the site"
        document.getElementById("lithree").innerHTML = "Run a virus scan"

        document.getElementById("casespecific").classList = "activesuggest"
        document.getElementById("casespecific").onclick = conncetBadURL
    }
}

function retry(){
    document.getElementById("animator").classList = "animatorafter"
    document.getElementById("all").classList = "allafter"
    window.setTimeout(function(){
        window.location.href = errorURL
    },200)
}