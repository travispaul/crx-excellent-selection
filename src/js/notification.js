$(function () {

    'use strict';

    var
        $txt = $('textarea'),
        last = JSON.parse(localStorage.getItem('lastSelection'));

    document.title = last.filter;
    $txt.val(last.modified);

});
