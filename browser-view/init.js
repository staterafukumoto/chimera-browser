//code that MUST run first

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 18) {
        window.altKey = true
    }
});
  
document.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 81) { 
        window.altKey = false
    }
});