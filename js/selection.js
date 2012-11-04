$(function () {

    'use strict';

    // get selection style from background script
    chrome.extension.sendMessage({ get: 'getSelectionStyle' }, function (r) {

        var color = '', background = '';

        if (r.get.color) {
            color = 'color:' + r.get.color + ';';
        }

        if (r.get.background) {
            background = 'background:' + r.get.background + ';';
        }

        $('head').append('<style>::selection {' + background + color +
            '}</style>');

    });

    chrome.extension.onMessage.addListener(function (request) {
        var sel, range;
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(request.replacementText));
        }
    });

});
