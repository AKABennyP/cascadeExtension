'use strict'

var cssBlock = '';
var applied = true;
var cssBlockName = 'cssBlcok';
var slectedRange = '';
var rangeName = '';

const addCssBlock = () => {
    var style = document.createElement('style');
    console.log('here', cssBlock);
    style.innerHTML = cssBlock;
    document.head.appendChild(style);
};

/*
chrome.storage.sync.get('rangeName', (data) => {
    if(data.rangeName) {
        cssBlockName = data.rangeName;
    }
    console.log('test', cssBlockName)
});*/

const keys = ['applied', cssBlockName];//['slectedRange', 'rangeName', 'applied', cssBlockName];
console.log('keys',keys);
chrome.storage.sync.get(keys, (data) => {
    /*if(data.slectedRange) {
        slectedRange = data.slectedRange;
    }
    if(data.rangeName) {
        rangeName = data.rangeName
    }*/
    if(data.applied === false) {
        applied = false;
    }
    if(data[cssBlockName]) {
        console.log('cssBlockName', cssBlockName);
        cssBlock = data[cssBlockName];
    }
    console.log('length', cssBlock.length);
    if(applied && cssBlock.length > 0) {
        window.addEventListener('load', (event) => {
            addCssBlock();
        });
    }
});