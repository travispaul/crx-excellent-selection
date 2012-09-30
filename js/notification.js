$(function () {

    'use strict';

    var
        $txt = $('textarea'),
        last = JSON.parse(localStorage.getItem('lastSelection'));

    function setHeight() {
        $txt.css({ height: window.innerHeight });
    }

    $txt.val(last.modified);
    document.title = last.filter;

    // Make textarea 100% height if we're in a tab.
    // Notifications windows don't have a height, but we check
    // that it's > 200px just in case they ever change that in an update.
    if(window.innerHeight > '200') {
        setHeight();
        window.onresize = function () {
            setHeight();
        };
    }
});