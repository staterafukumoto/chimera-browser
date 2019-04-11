function system(page){
    if (document.querySelector('.activewbv').src.endsWith("homepage/index.html") || document.querySelector('.activewbv').src == homepage){
        document.querySelector('.activewbv').src = 'file://' + __dirname + '/' + page + '/index.html'
    } else{
        makeNewTab('file://' + __dirname + '/' + page + '/index.html')
    }
}