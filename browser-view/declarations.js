const { remote } = require("electron")
// var homepage = "http://flask.pocoo.org/docs/1.0/testing/" //this tests secure standards
var homepage = "https://www.google.com"
var urlbar = document.getElementById("urlbar");
var electron = require('electron');
var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) chimera-browser/1.0.0 Chrome/69.0.3497.106 Safari/537.36"
var apptitle = document.getElementById("apptitle")
var appname = "Chimera"
var insecure_string = "This page is using HTTP and not HTTPS, and therefore isn't secure. Be careful inputting passwords or identifying information on this site."
var secure_string = "This page is using HTTPS, meaning you have a secure connection to the site."
const { FluentRevealEffect } = require('fluent-reveal-effect')
var maximstate = false
const prompt = require('electron-prompt');

