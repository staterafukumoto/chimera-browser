if (!fs.existsSync(extensions_directory)){//find extensions folder
    fs.mkdirSync(extensions_directory) //make extensions folder
}

fs.readdirSync(extensions_directory).forEach(file => { //support css and js files
    if (file.endsWith('.css')){
        addCSS(extensions_directory + dir_sep + file)
        console.log("Loaded Custom Style: " + file)
    } else if (file.endsWith('.js')){
        addScript(extensions_directory + dir_sep + file)
        console.log("Loaded Custom Script: " + file) 
    }
});