var os = require('os');

function fillData(){
    document.getElementById("selfver").innerHTML = chimeraversion
    document.getElementById("chromver").innerHTML = process.versions.chrome
    document.getElementById("ever").innerHTML = process.versions.electron
    document.getElementById("nodever").innerHTML = process.versions.node
    document.getElementById("httpver").innerHTML = process.versions.http_parser
    document.getElementById("jsver").innerHTML = process.versions.v8
    document.getElementById("hostname").innerHTML = os.hostname
    document.getElementById("osver").innerHTML = assembleOSVer()
    document.getElementById("instdir").innerHTML =  getInstallLoc()
}

function getInstallLoc(){
    return __dirname.replace("browser-view\\versions","")   
}

function assembleOSVer(){
    var platform = process.platform
    var architecture = os.arch
    var release = os.release
    if (platform == "win32"){
        var humanplatform = "Windows"
    } else if (platform == "linux"){
        var humanplatform = "Linux"
    } else if (platform == "darwin"){
        var humanplatform = "macOS"
    }
    return humanplatform + " " + release + " " + architecture
}