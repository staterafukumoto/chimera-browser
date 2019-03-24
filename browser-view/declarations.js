//declare node modules 
const prompt = require('electron-prompt');
const { remote } = require("electron")
const { FluentRevealEffect } = require('fluent-reveal-effect')
var electron = require('electron');

//element declarations
var homepage = 'file://' + __dirname + '/homepage/index.html';
var apptitle = document.getElementById("apptitle")
var urlbar = document.getElementById("urlbar");
var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chimera/1.0.0 Chrome/69.0.3497.106 Safari/537.36"

//state declarations
var maximstate = false
var panelIsOut = false
var keepHistory = true

//array declarations
var historyObject = new Array();
var bookmarkObject = new Array();

//string declarations
var appname = "Chimera"
var vendor ="WAYOUTWARE"
var urlsafevendor = vendor
var secure_string = "This page is using HTTPS, meaning you have a secure connection to the site."
var insecure_string = "This page is using HTTP and not HTTPS, and therefore isn't secure. Be careful inputting passwords or identifying information on this site."
var local_string = "This page is rendered inside of Chimera"