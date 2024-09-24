"use strict"

var cssBlock = "";
var applied = true;

const addCssBlock = () => {
    var style = document.createElement('style');
    style.innerHTML = cssBlock;
    document.head.appendChild(style);
};

const keys = ['applied', 'cssBlock'];
chrome.storage.sync.get(keys, (data) => {
    if(data.applied === false) {
        applied = false;
    }
    if(data.cssBlock) {
        cssBlock = data.cssBlock;
    }
    if(applied && cssBlock.length > 0) {
        window.addEventListener('load', (event) => {
            addCssBlock();
        });
    }
});