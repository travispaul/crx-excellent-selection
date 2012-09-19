exsel.createCtxMenus();

chrome.extension.onMessage.addListener( function(request, sender, sendResponse){
    if(!request.get) {
        localStorage.setItem('lastSelection', JSON.stringify(request));
        webkitNotifications.createHTMLNotification('notification.html').show();
    } else {
        sendResponse({ get: exsel[request.get]() });
    }
});