//declare node modules 
const prompt = require('electron-prompt');
const { remote } = require("electron")
const { FluentRevealEffect } = require('fluent-reveal-effect')
var electron = require('electron');
const fs = require('fs');

//directory declarations
if (process.platform == "win32"){
    window.extensions_directory = 'C:/chimera/extensions'
    window.chimera_directory = 'C:/chimera'
} else if (process.platform == "linux"){
    window.extensions_directory = '\\usr\\share\\chimera-extensions\\'
}
if (process.platform == "win32"){
    window.dir_sep = '/'
} else{
    window.dir_sep = '\\'
}

//element declarations
var homepage = 'file://' + __dirname + '/homepage/index.html';
var apptitle = document.getElementById("apptitle")
var urlbar = document.getElementById("urlbar");
var regupartition = "persist:webcontent"
var elevpartition = ""
var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chimera/1.0.0 Chrome/69.0.3497.128 Safari/537.36"

//state declarations
var maximstate = false
var panelIsOut = false
var keepHistory = true
var boundDebugState = false
var loadedExtensions = ""
var preloadFile = ""

//array declarations - if we need something to put history / bookmarks in
var historyObject = new Array();
var bookmarkObject = new Array();
