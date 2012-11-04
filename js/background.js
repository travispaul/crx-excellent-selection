(function (window, undefined) {

    'use strict';

    exsel.createCtxMenus();

    function msgHandler(request, sender, sendResponse) {
        if (!request.get) {

            var
                output = exsel.getOutputMethod(),
                notify = 'notification.html',
                outputTab = 'tab.html',
                clipboard = document.getElementById('clipboard'),
                tryReplace = request.editable && output.useReplace;

            localStorage.setItem('lastSelection', JSON.stringify(request));

            if (tryReplace) {
                chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.sendMessage(tab.id,
                        { replacementText:  request.modified });
                }); 
            } else {

                if (output.useClipboard === 'on') {
                    clipboard.value = request.modified;
                    clipboard.select();
                    document.execCommand('copy');
                }

                if (output.useNotifications === 'on') {
                    webkitNotifications.createHTMLNotification(notify).show();
                }

                if (output.useTabs === 'on') {
                    chrome.tabs.create({ url : outputTab });
                }

            }


        } else {
            sendResponse({ get: exsel[request.get]() });
        }
    }

    chrome.extension.onMessage.addListener(msgHandler);

}(window));
