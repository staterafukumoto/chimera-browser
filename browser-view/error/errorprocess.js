var errorcode = localStorage['tempErrorCode']
function fillErrorCode(){
    document.getElementById('errorcodeinner').innerHTML = errorcode.toLowerCase()
}

function conncetBadURL(){
    var str = localStorage["tempErrorURL"].substr(5)
    window.location.href = "http" + str
}

if (errorcode == "ERR_CERT_AUTHORITY_INVALID"){
    document.getElementById("maintext").innerHTML = "Your connection isn't secure, and the chimera wants to protect your security"
    document.getElementById("casespecific").innerHTML = "Connect over HTTP and throw caution to the wind"
    document.getElementById("litwo").innerHTML = "Yell at the host of the site"
    document.getElementById("lithree").innerHTML = "Run a virus scan"
    document.getElementById("casespecific").classList = "activesuggest"
    document.getElementById("casespecific").onclick = conncetBadURL
}
