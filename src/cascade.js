const setBageText = (applied) => {
    const text = applied ? "ON" : "OFF";
    chrome.action.setBadgeText({text: text});
};

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
chrome.storage.sync.get('cssBlock', (data) => {
    input.value = data.cssBlock || "";
});
input.addEventListener('change', (event) => {
    if(event.target instanceof HTMLTextAreaElement) {
        chrome.storage.sync.set({'cssBlock': event.target.value});
    }
})