var ipc = require('electron').ipcRenderer;

ipc.on('refresh-tab', function(arg){
    document.getElementsByClassName('activewbv')[0].reload()
})

ipc.on('new-tab', function(arg){
    makeNewTab()
    document.getElementById('urlbar').focus()
    document.getElementById('urlbar').value = ''
})

ipc.on('go-home', function(arg){
    // makeNewTab()
    goTo(homepage)
})

ipc.on('new-bookmark', function(arg){
    showBookmarkApplet()
})

ipc.on('close-tab', function(arg){
    // showBookmarkApplet()
    closeCurrentTab()
})

ipc.on('settings', function(arg){
    makeNewTab('file://' + __dirname + '/settings/index.html')
})

ipc.on('library', function(arg){
    makeNewTab('file://' + __dirname + '/bookmarks/index.html')
})

ipc.on('go-back', function(arg){
    goBackActive()
})

ipc.on('go-fwd', function(arg){
    goFwdActive()
})

ipc.on('url-focus', function(arg){
    document.getElementById("urlbar").focus()
})