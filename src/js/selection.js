// get selection style from background script
chrome.extension.sendMessage({ get: 'getSelectionStyle' }, function (r) {
    var color = '', background = '';

    if (r.get.color) {
        color = 'color:' + r.get.color + ';';
    }

    if (r.get.background) {
        background = 'background:' + r.get.background + ';';
    }
    document.head.insertAdjacentHTML('beforeend', '<style>::selection {'
        + background + color + '}</style>');
});
