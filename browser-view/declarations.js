//declare node modules 
const prompt = require('electron-prompt');
const { remote } = require("electron")
const { FluentRevealEffect } = require('fluent-reveal-effect')
var electron = require('electron');

//element declarations
var homepage = 'file://' + __dirname + '/homepage/index.html';
var apptitle = document.getElementById("apptitle")
var urlbar = document.getElementById("urlbar");
var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chimera/1.0.0 Chrome/69.0.3497.128 Safari/537.36"

//state declarations
var maximstate = false
var panelIsOut = false
var keepHistory = true
var boundDebugState = false

//array declarations - if we need something to put history / bookmarks in
var historyObject = new Array();
var bookmarkObject = new Array();

//string declarations
var appname = "Chimera"
var vendor = "WAYOUTWARE"
var urlsafevendor = vendor //usually equal to the regular vendor string
var secure_string = "This page is using HTTPS, meaning you have a secure connection to the site."
var insecure_string = "This page is using HTTP and not HTTPS, and therefore isn't secure. Be careful inputting passwords or identifying information on this site."
var local_string = "This page is rendered inside of" + appname
var console_welcome_string = "Running " + appname
var console_warn_string = "This is a window intended for tweakers and devs ONLY! \nIt bestows you control over the entire browser and ALL your data."
var console_warn_string_ext = "Whatever code you put here has access to EVERYTHING.\nSo don't go pasting something in here willy nilly."
var console_version_m = "Version: " + chimeraversion