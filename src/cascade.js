const setBageText = (applied) => {
    const text = applied ? "ON" : "OFF";
    chrome.action.setBadgeText({text: text});
};

const checkbox = document.querySelector('input.apply');
chrome.storage.sync.get(['applied'], (data) => {
    checkbox.checked = !!data.applied;
    setBageText(data.applied);
});
checkbox.addEventListener('change', (event) => {
    if(event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({'applied': event.target.checked});
        setBageText(event.target.checked);
    }
});

const rangeSelect = document.querySelector('select.rangeSelect');
const input = document.querySelector('#cssBlock');
var cssBlockName = 'cssBlock';
rangeSelect.addEventListener('change', (event) => {
    if(event.target instanceof HTMLSelectElement) {
        chrome.storage.sync.set({'selectedRange': event.target.value});
        chrome.storage.sync.get(event.target.value, (data) => {
            input.value = data[event.target.value];
        });
    }
});
chrome.storage.sync.get(['selectedRange'], (data) => {
    cssBlockName = data.selectedRange || 'cssBlock';
    chrome.storage.sync.get(cssBlockName, (cssData) => {
        input.value = cssData.cssBlock;
    });
});

input.addEventListener('change', (event) => {
    if(event.target instanceof HTMLTextAreaElement) {
        chrome.storage.sync.get(['selectedRange'], (data) => {
            var cssBlockName = data.selectedRange || 'cssBlock';
            var blockObject = {};
            blockObject[cssBlockName] = event.target.value;
            chrome.storage.sync.set(blockObject);
        });
    }
});

chrome.storage.sync.get(['ranges'], (data) => {
    if(data.ranges) {
        data.ranges.forEach(range => {
            const opt = document.createElement("option");
            if(range === cssBlockName) {
                opt.selected = true;
            }
            opt.text = range;
            opt.value = range;
            rangeSelect.add(opt);
        });
    }
});