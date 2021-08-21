var targetDiv;
var checkListUrlViewMoreAuto = false;
var listUrlViewMoreAuto = [];
var lengthList = 0;
var allowed = true;
Helper = {};
$('document').ready(async function () {
    setTimeout(() => {
        var video = document.querySelector("video")
        if (video) {
            video.pause();
            video.addEventListener('play', function (e) {
                video.pause();

            }, true);
        }
    }, 1000);
});
$(document).keydown(async function (e) {
    if(allowed == true){
        allowed = false;
        switch (e.which) {
            case 113:
                checkLink();
                break;
            case 115:
                Helper.autoOpenTabNeedClick();
                //checkLinkYouTube();
                break;
            case 119:
                Helper.clickKeyWordHightLight();
                break;
            default:
            // code block
        }
    }
})
$(document).keyup(function(e) { 
    allowed = true;
});
function checkLinkYouTube() {
    $('a').each(function () {
        console.log($(this));
        let colorBackGround = $(this).css('backgroundColor').toString();
        let arrColors = ['rgb(21, 52, 54)', 'rgb(253, 189, 157)', 'rgb(67, 184, 77)', 'rgb(84, 135, 81)', 'rgb(66, 67, 146)', 'rgb(117, 68, 79)'];
        let color = $(this).css('color').toString();
        if (color == 'rgb(255, 255, 255)' && arrColors.indexOf(colorBackGround) > -1 && $(this).attr("href") != undefined && $(this).attr("href").indexOf("google") == -1) {
            console.log(this);
        }
    });
}
function setActiveTab() {
    chrome.runtime.sendMessage({ command: "setActiveTab" }, function (reponse) {
        //console.log(reponse)
    });
}
function moveTabSet() {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ command: "moveTabSet" }, function (reponse) {
            resolve()
        });
    });
}
async function moveTabSetAndClick() {
    chrome.runtime.sendMessage({ command: "moveTabSetAndClick" }, async function (reponse) {
        
    });
}
function clickTabSet() {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ command: "clickTabSet" }, async function (reponse) {
            resolve()
        });
    });

}
async function checkLink() {
    setActiveTab();
    targetDiv = document.querySelectorAll("[id='IDLINK']");
    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            await activeLinkNeedClick(targetDiv[i])
        } else if (i == 1 && targetDiv[i].getAttribute("data-idpost") == targetDiv[i - 1].getAttribute("data-idpost")) {
            await activeLinkNeedClick(targetDiv[i])
        } else if (i == 2 && targetDiv[i].getAttribute("data-idpost") == targetDiv[i - 1].getAttribute("data-idpost")) {
            await activeLinkNeedClick(targetDiv[i])
        } else {
            break;
        }
    }
    return false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function activeLinkNeedClick(link) {
    link.dispatchEvent(new MouseEvent('mouseover', { 'view': window, 'bubbles': true, 'cancelable': true }));
    await sleep(800)
    link.dispatchEvent(new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 84,
        clientX: 80,
    }));
    await sleep(1000)
    moveTabSet();
}

Helper.autoOpenTabNeedClick = async function () {

    setActiveTab();
    if(checkListUrlViewMoreAuto == false) {
        listUrlViewMoreAuto = document.querySelectorAll("a[href*='@@faceseo@@']");
        lengthList = listUrlViewMoreAuto.length;
        checkListUrlViewMoreAuto = true;
    }
    //console.log(pointLink)
    console.log(lengthList)
    await sleep(500)
    if (0 < lengthList) {
        //listUrlViewMoreAuto[0].dispatchEvent(new MouseEvent('mouseover', { 'view': window, 'bubbles': true, 'cancelable': true }));
        //await sleep(300)
        listUrlViewMoreAuto[0].dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 90,
            clientY: 50,

        }));
        await clickTabSet();
        console.log('Done Open')
    } else {
        checkListUrlViewMoreAuto = false;
    }
}

Helper.clickKeyWordHightLight = async function () {
    await sleep(1000)
    let listClick = []
    let arrColors = ['rgb(21, 52, 54)', 'rgb(253, 189, 157)', 'rgb(67, 184, 77)', 'rgb(84, 135, 81)', 'rgb(66, 67, 146)', 'rgb(117, 68, 79)'];
    $('a').each(function () {
        let colorBackGround = $(this).css('backgroundColor').toString() || "";
        let color = $(this).css('color').toString() || "";
        if (location.href.indexOf("youtube")) console.log()
        if (color == 'rgb(255, 255, 255)' && arrColors.indexOf(colorBackGround) > -1 && $(this).attr("href") != undefined && $(this).text()[0] != '#' && ($(this).attr("href").indexOf("news.google") > -1 || $(this).attr("href").indexOf("google") == -1)) {

            listClick.push(this);
        }
    });
    if (location.href.indexOf("youtube")) console.log(listClick)
    //console.log(listClick)
    listClick.sort(function (a, b) { return $(b).text().length - $(a).text().length });
    if (listClick.length > 0) {
        listClick[0].dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 330,
            clientY: 780
            /* whatever properties you want to give it */
        }));

    }
    await sleep(300)
    if (listClick.length >= 2 && $(listClick[1]).attr("href") != $(listClick[0]).attr("href")) {
        listClick[1].dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 530,
            clientY: 380
            /* whatever properties you want to give it */
        }));
    }
    console.log('Click Done')
    await sleep(1000)
    moveTabSetAndClick();
    return;
}
