function showBookmarkApplet(){
    if(document.getElementsByClassName('activewbv')[0].getURL().startsWith('file://')){
        createToast("This cannot be bookmarked")
    } else{
        document.getElementById("backdropbookmarks").style.opacity = "1"
        document.getElementById("backdropbookmarks").style.pointerEvents = "auto"
        document.getElementById('bookmarkname').value = document.getElementsByClassName('activewbv')[0].getTitle()
        document.getElementById('bookmarkurl').value = document.getElementsByClassName('activewbv')[0].getURL()
        document.getElementById('bookmarkapplet').style.top = "72px"
        document.getElementById('bookmarkapplet').style.opacity = "1"
    }
}

function hideBookmarkApplet(){
    document.getElementById("backdropbookmarks").style.opacity = "0"
    document.getElementById("backdropbookmarks").style.pointerEvents = "none"
    document.getElementById('bookmarkapplet').style.top = "0px"
    document.getElementById('bookmarkapplet').style.opacity = "0"
}