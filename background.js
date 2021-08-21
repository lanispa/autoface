chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.command) {
        case "clickTabSet":
            clickTabSet(sender, sendResponse);
            break;
        case "setActiveTab":
            setActiveTab(sender, sendResponse);
            break;
        case "moveTabSet":
            moveTabSet(sender, sendResponse)
            break;
        case "moveTabSetAndClick":
            moveTabSetAndClick(sender, sendResponse)
            break;
        default:
        // code block
    }
});
function setActiveTab(sender, sendResponse) {
    chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true }, function (d) {
        console.log(d[0].id)
        localStorage.setItem("active-tab", d[0].id);
    })
}
function moveTabSet(sender, sendResponse) {
    chrome.tabs.update(Number(localStorage.getItem("active-tab")), { active: true })
    sendResponse({
        status: 1
    });
}
async function moveTabSetAndClick(sender, sendResponse) {
    let Idtab = Number(localStorage.getItem("active-tab"))
    console.log(Idtab)
    chrome.tabs.update(Idtab, { active: true })
    await sleep(200)
    chrome.tabs.executeScript(Idtab, { file: "jquery.js" }, function () {
        chrome.tabs.executeScript(Idtab, { file: "spy.js" }, function () {
            console.log('Run script again')
            chrome.tabs.executeScript(Idtab, {
                code: 'Helper.autoOpenTabNeedClick();'
            });
        });
    });
    sendResponse({
        status: 'move tab and click'
    });
}
async function clickTabSet(sender, sendResponse) {
    let tabid;
    await chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true }, function (d) { tabid = d[0].id; if (sender.tab.id == tabid) console.log(tabid) })
    chrome.tabs.executeScript(tabid, { file: "jquery.js" }, function () {
        chrome.tabs.executeScript(tabid, { file: "spy.js" }, function () {
            console.log('Run script')
            chrome.tabs.executeScript(tabid, {
                code: 'Helper.clickKeyWordHightLight();'
            });
        });
    });
    sendResponse({
        status: 1
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
