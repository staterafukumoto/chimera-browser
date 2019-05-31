//string declarations
var appname = "Chimera"
var vendor = "WAYOUTWARE"
var urlsafevendor = vendor //usually equal to the regular vendor string

var secure_string = "This page is using HTTPS, meaning you have a secure connection to the site."
var insecure_string = "This page is using HTTP and not HTTPS, and therefore isn't secure. Be careful inputting passwords or identifying information on this site."
var local_string = "This is a file from your hard drive"
var elevated_string = "This page is rendered inside of" + appname

var console_welcome_string = "Running " + appname
var console_warn_string = "This is a window intended for tweakers and devs ONLY! \nIt bestows you control over the entire browser and ALL your data."
var console_warn_string_ext = "Whatever code you put here has access to EVERYTHING.\nSo don't go pasting something in here willy nilly."
var console_version_m = "Version: " + chimeraversion

var ext_message = "Your installed extensions have been modified and you need to restart to apply the changes."

var secure_message = "<i class='material-icons urlbar-i'>lock</i> Secure &nbsp;"
var local_message = "<i class='material-icons urlbar-i'>folder</i> File &nbsp;"
var insecure_message = "<i class='material-icons urlbar-i'>error</i> Insecure &nbsp;"
var elevated_message = "<i class='material-icons urlbar-i'>code</i> System &nbsp;"