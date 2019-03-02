// WayworkJS library
// Copyright (c) 2018 WAYOUTWARE.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

window.wayworkversion = "1.0"
window.generatedids = [];
console.log("wayworkjs version: " + wayworkversion)

function removeTag(taguuid) {
    var element = document.getElementById(taguuid);
    element.parentNode.removeChild(element);
}

function createTag(tagtype,tagid,tagclass){
    var tag = document.createElement(tagtype);
    tag.setAttribute('id', tagid);
    if (tagclass == "none" || tagclass == undefined){
        //don't assign a class
    } else{
        tag.setAttribute('class', tagclass);
    }
    document.body.appendChild(tag);
}

function createTagUnderParent(tagtype,tagid,tagclass,parentid){
    var tag = document.createElement(tagtype);
    tag.setAttribute('id', tagid);
    if (tagclass == "none" || tagclass == undefined){
        //don't assign a class
    } else{
        tag.setAttribute('class', tagclass);
    }
    document.getElementById(parentid).appendChild(tag);
}

function giveTagClass(tagid,cssclass){
    document.getElementById(tagid).classList.add(cssclass)
}

function removeTagClass(tagid,cssclass){
    document.getElementById(tagid).classList.remove(cssclass)
}

function createStyle(className, attributes){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.' + className + ' {' + attributes + '}';
    document.getElementsByTagName('head')[0].appendChild(style);
}

function createToast(input){
    createStyle(
        "wwtoast",
        "position: absolute; bottom: 68px; right: 60px; left: 60px; z-index: 500; background: #078f96; color: white; user-select: none; border-radius: 4px; transition: 0.3s all ease-in-out; line-height: 26px; font-size: 18px; padding-left: 2px; padding-right: 2px; padding-top: 6px; padding-bottom: 6px; text-align: center; font-family: sans-serif;"
    )
    var toastid = "toast" + generateID()
    createTag("div",toastid,"wwtoast")
    document.getElementById(toastid).innerHTML = input
    window.setTimeout(function(){
        removeTag(toastid)
    },5000)
}

function createColorToast(input){
    createStyle(
        "wwtoastcolor",
        "position: absolute; bottom: 68px; right: 60px; left: 60px; z-index: 500; color: white; user-select: none; border-radius: 4px; transition: 0.3s all ease-in-out; line-height: 26px; font-size: 18px; padding-left: 2px; padding-right: 2px; padding-top: 6px; padding-bottom: 6px; text-align: center; font-family: sans-serif;"
    )
    var toastid = "toast" + generateID()
    createTag("div",toastid,"wwtoastcolor")
    document.getElementById(toastid).innerHTML = input
    document.getElementById(toastid).style.background = generateColor()
    window.setTimeout(function(){
        removeTag(toastid)
    },5000)
}

function createToastToParent(input,parent){
    createStyle(
        "wwtoast",
        "position: absolute; bottom: 68px; right: 60px; left: 60px; z-index: 500; background: #078f96; color: white; user-select: none; border-radius: 4px; transition: 0.3s all ease-in-out; line-height: 26px; font-size: 18px; padding-left: 2px; padding-right: 2px; padding-top: 6px; padding-bottom: 6px; text-align: center; font-family: sans-serif;"
    )
    // createTag("div","livetoast","wwtoast")
    createTagUnderParent("div","livetoast","wwtoast",parent)
    document.getElementById("livetoast").innerHTML = input
    window.setTimeout(function(){
        removeTag("livetoast")
    },5000)
}

function windowDragAdd(tagid){
    document.getElementById(tagid).style.webkitAppRegion = "drag"
}

function windowDragRemove(tagid){
    document.getElementById(tagid).style.webkitAppRegion = "no-drag"
}

function generateID(){
    var uuid = Math.random()*100000000000000000
    // var uuid = 5
    if (generatedids.includes(uuid)){
        generateID
        return
    }else{
        generatedids.push(uuid)
        return uuid
    }
}


function generateColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}