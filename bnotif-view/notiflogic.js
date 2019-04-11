const { FluentRevealEffect } = require('fluent-reveal-effect')

function closeWindow(){
    document.getElementById("main").style.transform = "scale(0,1)"
    window.setTimeout(function(){
        window.close()
    },220)
}

function fillContent(){
    document.getElementById("headercontent").innerHTML = localStorage["tempNotifTitle"]
    document.getElementById("bodycontent").innerHTML = localStorage["tempNotifBody"]
    if (localStorage["tempNotifAct"] == "undefined"){
        document.getElementById("morebtn").style.display = "none"
    } else{
        document.getElementById("morebtn").onclick = localStorage["tempNotifAct"]
    }
    if (localStorage["tempNotifCloseTime"] == "0" || localStorage["tempNotifCloseTime"] == ""){
        //do nothing
    } else{
        window.setTimeout(closeWindow,parseInt(localStorage["tempNotifCloseTime"]))
    }
    localStorage["tempNotifBody"] = ""
    localStorage["tempNotifTitle"] = ""
    localStorage["tempNotifBody"] = ""
    localStorage["tempNotifCloseTime"] = ""
}

FluentRevealEffect.applyEffect(".uibtn", {
	lightColor: "rgba(255,255,255,0.2)",
    gradientSize: 25,
    clickEffect: true
})