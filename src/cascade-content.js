"use strict"

var cssBlockName = "cssBlock";
var cssBlock = '';
var applied = true;

const addCssBlock = (cssBlock) => {
    //temp
    var ranges = ['cssBlock', 'cssBlock2'];
    chrome.storage.sync.set({'ranges': ranges});
    //temp
    var style = document.createElement('style');
    style.innerHTML = cssBlock;
    document.head.appendChild(style);
};

chrome.storage.sync.get('selectedRange', (data) => {
    if(data.selectedRange) {
        cssBlockName = data.selectedRange;
    }

    const keys = ['applied', cssBlockName];
    chrome.storage.sync.get(keys, (data) => {
        if(data.applied === false) {
            applied = false;
        }
        if(data[cssBlockName]) {
            cssBlock = data[cssBlockName];
        }
        if(applied && cssBlock.length > 0) {
            window.addEventListener('load', (event) => {
                addCssBlock(cssBlock);
            });
            window.addEventListener('resize', function() {
                addCssBlock(cssBlock);
            });
        }
    });
});