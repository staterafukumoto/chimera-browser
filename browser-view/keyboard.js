// document.onkeyup=function(e){
//     var e = e || window.event;
//     if(e.ctrlKey && e.which == 68) {
//     //   alert('Keyboard shortcut working!');
//         showBookmarkApplet()
//     } else if( e.ctrlKey && e.which == 82){ //ctrl + r
//         document.getElementsByClassName('activewbv')[0].reload()
//     } else if( e.ctrlKey && e.which == 72){ //ctrl + h
//         makeNewTab('file://' + __dirname + '/bookmarks/index.html')        
//     } else if( e.altKey && e.which == 80){ //alt + p
//         makeNewTab('file://' + __dirname + '/settings/index.html')
//     } else if( e.ctrlKey && e.which == 84){ //ctrl + t
//         makeNewTab()
//     } else if( e.ctrlKey && e.which == 87){ //ctrl + w
//         closeCurrentTab()
//     } 
// }