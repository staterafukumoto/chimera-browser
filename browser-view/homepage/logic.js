const searchbar = document.getElementById("searchbar")

function googleSearch(input){
    var safe = encodeURI(input)
    window.location.href = "https://www.google.com/search?q=" + safe
}

searchbar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      googleSearch(searchbar.value)
    }
})

searchbar.addEventListener("keyup", function(event) {
    // Number 27 is the "Escape" key on the keyboard
    if (event.keyCode === 27) {
        searchbar.blur()
    }
})

function openRepo(){
    window.location.href = "https://github.com/wayoutware/chimera-browser"
}

function openSettings(){
    window.location.href = "../settings/index.html"
}