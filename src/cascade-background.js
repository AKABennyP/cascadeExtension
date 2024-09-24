"use strict"

const setBageText = (applied) => {
    const text = applied ? "ON" : "OFF";
    chrome.action.setBadgeText({text: text});
};

const startUp = () => {
    chrome.storage.sync.get('applied', (data) => {
        setBageText(!!data.applied);
    });
};

chrome.runtime.onStartup.addListener(startUp);
chrome.runtime.onInstalled.addListener(startUp);