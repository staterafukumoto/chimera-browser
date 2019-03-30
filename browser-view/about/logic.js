// function chimeraFillAboutScreenData(){
//     document.getElementById("blinkversion").innerHTML = "Blink " + process.versions.chrome
//     document.getElementById("electronversion").innerHTML = "Electron " + process.versions.electron
//     document.getElementById("veightversion").innerHTML = "v8 Engine" + process.versions.v8
//     document.getElementById("unicodeversion").innerHTML = "Unicode " + process.versions.unicode
//     document.getElementById("nodeversion").innerHTML = "Node JS" + process.versions.unicode
// }
function chimeraFillAboutScreenData(){
    var chromever = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/)[0].substr(7)
    document.getElementById("chromever").innerHTML = "<b>Chromium: </b>" + chromever
    document.getElementById("chimeraver").innerHTML = "<b>Chimera: </b>" + chimeraversion
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