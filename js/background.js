(function (window, undefined) {

    'use strict';

    exsel.createCtxMenus();

    function msgHandler(request, sender, sendResponse) {
        if (!request.get) {

            var
                output = exsel.getOutputMethod(),
                notification = 'notification.html';

            localStorage.setItem('lastSelection', JSON.stringify(request));

            if (output.useNotifications === 'on') {
                webkitNotifications.createHTMLNotification(notification).show();
            }

            if (output.useTabs === 'on') {
                chrome.tabs.create({ url : notification});
            }

        } else {
            sendResponse({ get: exsel[request.get]() });
        }
    }

    chrome.extension.onMessage.addListener(msgHandler);

}(window));