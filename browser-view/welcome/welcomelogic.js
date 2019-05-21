function animateOpen(){
    var background = document.getElementById("backdrop")
    //animation step 1
    background.style.boxShadow = "0px 0px 139px 13px rgba(255,0,255,1)"
    background.style.left = "0px"
    background.style.right = "0px"
    background.style.top = "0px"
    background.style.bottom = "0px"
    background.style.height = "100%"
    background.style.filter = "blur(0px)"
    background.style.animationDuration = "10s"
    document.getElementById("branding").style.opacity = "0.6"
    document.getElementById("branding").style.transform = "scale(1)"
    document.getElementById("branding").style.filter = "blur(0px)"
    //animation step 2
    window.setTimeout(function(){
        document.getElementById("card").style.bottom = "0px"
        document.getElementById("branding").style.opacity = "1"
        document.getElementById("branding").classList = "bsecondary"
        document.getElementById("entlogo").style.opacity = "1"
        //pause the render so that your gpu doesn't kill itself
        //you're welcome
        background.style.animationPlayState = "paused"
    },1500)
}

window.setTimeout(animateOpen,621) //lol


function showElem(arg){
    document.getElementById(arg).classList.add("innerafter")
}

function hideElem(arg){
    document.getElementById(arg).classList.remove("innerafter")
}