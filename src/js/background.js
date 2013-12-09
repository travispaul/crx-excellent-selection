(function (window, undefined) {

    'use strict';

    exsel.createCtxMenus();

    chrome.contextMenus.onClicked.addListener(function (data) {
        exsel.filters[data.menuItemId].exec(data);
    });

    function msgHandler(request, sender, sendResponse) {

        if (!request.get) {

            var
                output = exsel.getOutputMethod(),
                popupOpt = 'dialog=yes,location=no,top=0,left=0,height=150,' +
                    'width=300,menubar=no,toolbar=no,status=no,resizable=yes',
                outputTab = 'tab.html',
                clipboard = document.getElementById('clipboard');

            localStorage.setItem('lastSelection', JSON.stringify(request));

            if (output.useClipboard === 'on') {
                clipboard.value = request.modified;
                clipboard.select();
                document.execCommand('copy');
            }

            if (output.useNotifications === 'on') {
                window.open(outputTab, 'test', popupOpt);
            }

            if (output.useTabs === 'on') {
                chrome.tabs.create({ url : outputTab });
            }

        } else {
            sendResponse({ get: exsel[request.get]() });
        }
    }

    chrome.extension.onMessage.addListener(msgHandler);

}(window));
