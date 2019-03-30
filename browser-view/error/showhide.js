function showDropDown(){
    document.getElementById("productlogo").src = "../img/nerd.png"
    document.getElementById("errorDropdown").style.top = "202px"
    document.getElementById("showmore").onclick = hideDropDown
    document.getElementById("showmore").style.transform = "rotate(-90deg)"
}

function hideDropDown(){
    document.getElementById("productlogo").src = "../img/error.png"
    document.getElementById("errorDropdown").style.top = "51px"
    document.getElementById("showmore").onclick = showDropDown
    document.getElementById("showmore").style.transform = "rotate(0deg)"
}