function chimeraFillAboutScreenData(){
    var chromever = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/)[0].substr(7)
    document.getElementById("chromever").innerHTML = "<b>Chromium: </b>" + chromever
    document.getElementById("chimeraver").innerHTML = "<b>Chimera: </b>" + chimeraversion + " <span class='codename'>"+ codename +"</span>"
}

function getChromeVersion () {
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
    if (pieces == null || pieces.length != 5) {
        return undefined;
    }
    pieces = pieces.map(piece => parseInt(piece, 10));
    return {
        major: pieces[1],
        minor: pieces[2],
        build: pieces[3],
        patch: pieces[4]
    };
}