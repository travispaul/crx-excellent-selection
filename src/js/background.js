(function (window, undefined) {

    'use strict';

    exsel.createCtxMenus();

    chrome.contextMenus.onClicked.addListener(function (data) {
        var selection = exsel.filters[data.menuItemId].exec(data),
            output = exsel.getOutputMethod(),
            popupOpt = 'dialog=yes,location=no,top=0,left=0,height=150,' +
            'width=300,menubar=no,toolbar=no,status=no,resizable=yes',
            outputTab = 'tab.html',
            clipboard = document.getElementById('clipboard');

        localStorage.setItem('lastSelection', JSON.stringify(selection));

        if (output.useClipboard === 'on') {
            clipboard.value = selection.modified;
            clipboard.select();
            document.execCommand('copy');
        }

        if (output.useNotifications === 'on') {
            window.open(outputTab, 'test', popupOpt);
        }

        if (output.useTabs === 'on') {
            chrome.tabs.create({ url : outputTab });
        }
    });

    function msgHandler(request, sender, sendResponse) {
        sendResponse({ get: exsel[request.get]() });
    }

    chrome.runtime.onMessage.addListener(msgHandler);

}(window));
