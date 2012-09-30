
'use strict';

exsel.createCtxMenus();

chrome.extension.onMessage.addListener( function(request, sender, sendResponse){
    if(!request.get) {

        var output = exsel.getOutputMethod();

        localStorage.setItem('lastSelection', JSON.stringify(request));

        if(output.useNotifications === 'on'){
            webkitNotifications.createHTMLNotification('notification.html').show();
        }

        if(output.useTabs === 'on'){
            console.log('USE TABS');
            chrome.tabs.create({ url : 'notification.html'});
        }
        
    } else {
        sendResponse({ get: exsel[request.get]() });
    }
});