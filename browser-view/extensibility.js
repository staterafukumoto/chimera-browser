if (!fs.existsSync(extensions_directory)){//find extensions folder
    try{
        fs.mkdirSync(chimera_directory) //make extensions folder
        fs.mkdirSync(extensions_directory) //make extensions folder
    } catch (err){
        alert('could not create extensions folder')
    }
}

fs.readdirSync(extensions_directory).forEach(file => { //support css and js files
    if (file.endsWith('.css')){
        addCSS(extensions_directory + dir_sep + file)
        console.log("Loaded Custom Style: " + file)
        loadedExtensions = loadedExtensions + file + " "

    } else if (file.endsWith('.js')){
        addScript(extensions_directory + dir_sep + file)
        console.log("Loaded Custom Script: " + file) 
        // window.loadedExtensions.unshift(file)
        loadedExtensions = loadedExtensions + file + " "

    }
})

function checkDirChanges(){
    var freshCheckExt = ""
    window.ralert = 0
    fs.readdirSync(extensions_directory).forEach(file => { //support css and js files
        if (file.endsWith('.css')){
            freshCheckExt = freshCheckExt + file + " "
        } else if (file.endsWith('.js')){
            // freshCheckExt.unshift(file)
            freshCheckExt = freshCheckExt + file + " "
        }
    })
    if (freshCheckExt == window.loadedExtensions){
        window.ralert = 0 //if the user reverts to the extensions already loaded stop pestering them
    } else{
        window.ralert = 1
        window.location.href = ""
    }
}

window.setInterval(checkDirChanges,250)