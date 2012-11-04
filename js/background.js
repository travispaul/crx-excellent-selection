(function (window, undefined) {

    'use strict';

    exsel.createCtxMenus();

    function msgHandler(request, sender, sendResponse) {
        if (!request.get) {

            var
                output = exsel.getOutputMethod(),
                notification = 'notification.html',
                outputTab = 'tab.html',
                clipboard = document.getElementById('clipboard');

            localStorage.setItem('lastSelection', JSON.stringify(request));

            if (output.useClipboard === 'on') {
                clipboard.value = request.modified;
                clipboard.select();
                document.execCommand('copy');
            }

            if (output.useNotifications === 'on') {
                webkitNotifications.createHTMLNotification(notification).show();
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
