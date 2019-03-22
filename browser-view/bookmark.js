function showBookmarkApplet(){
    if(document.getElementsByClassName('activewbv')[0].getURL().startsWith('file://')){
        createToast("This cannot be bookmarked")
    } else{
        document.getElementById('bookmarkname').value = document.getElementsByClassName('activewbv')[0].getTitle()
        document.getElementById('bookmarkurl').value = document.getElementsByClassName('activewbv')[0].getURL()
        document.getElementById('bookmarkapplet').style.top = "72px"
    }
}

function hideBookmarkApplet(){
    document.getElementById('bookmarkapplet').style.top = "-175px"
}