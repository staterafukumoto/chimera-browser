(function() {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('tabregion').scrollLeft -= (delta*40); // Multiplied by 40
        e.preventDefault();
    }
    if (document.getElementById('tabregion').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.getElementById('tabregion').addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        document.getElementById('tabregion').addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        document.getElementById('tabregion').attachEvent("onmousewheel", scrollHorizontally);
    }
})();