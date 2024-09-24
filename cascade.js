const setBageText = (applied) => {
    const text = applied ? "ON" : "OFF";
    chrome.action.setBadgeText({text: text});
};

var cssBlockKey = 'cssBlock';
/*const select = document.querySelector('select.rangeSelect');
chrome.storage.sync.get('slectedRange', (data) => {
    select.value = data.slectedRange || 'new';
});
select.addEventListener('change', (event) => {
    if(event.target instanceof HTMLSelectElement) {
        chrome.storage.sync.set({'slectedRange': event.target.value});
    }
})

const rangeNameInputValue = document.querySelector('input.rangeName').value;
chrome.storage.sync.get('rangeName', (data) => {
    const ramgeName = select.value === 'new' && rangeNameInputValue !== '' ? rangeNameInputValue : '';
    var rangeNameVal = data.rangeName || ramgeName;
    console.log('x1',data.rangeName)
    cssBlockKey = `${rangeNameVal !== '' ? rangeNameVal + '-' : ''}cssBlock`;
    console.log('x2',cssBlockKey)
});
const saveRangeName = document.querySelector('button.saveRangeName');
saveRangeName.addEventListener('click', (event) => {
    if(event.target instanceof HTMLButtonElement) {
        const rangeNameInputValue = document.querySelector('input.rangeName').value;
        console.log('test',rangeNameInputValue)
        if(rangeNameInputValue!== '') {
            chrome.storage.sync.set({'rangeName': rangeNameInputValue});
            var option = document.createElement('option');
            option.value = rangeNameInputValue;
            option.innerHTML = rangeNameInputValue;
            select.appendChild(option);
            select.value = option.value;
        }
    }
})*/

const checkbox = document.querySelector('input.apply');
chrome.storage.sync.get('applied', (data) => {
    checkbox.checked = !!data.applied;
    setBageText(data.applied);
});
checkbox.addEventListener('change', (event) => {
    if(event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({'applied': event.target.checked});
        setBageText(event.target.checked);
    }
})

const input = document.querySelector('#cssBlock');
chrome.storage.sync.get(cssBlockKey, (data) => {
    console.log('test name', cssBlockKey);
    console.log('test data', data);
    console.log('test block', data.cssBlock);
    input.value = data.cssBlock || "";
});
input.addEventListener('change', (event) => {
    console.log('change', event.target.value)
    if(event.target instanceof HTMLTextAreaElement) {
        console.log('cssBlock', event.target.value);
        chrome.storage.sync.set({'cssBlock': event.target.value});
    }
})