$(function(){

    'use strict';

    var
        $txt = $('textarea'),
        last = JSON.parse(localStorage.getItem('lastSelection'));

    $txt.val(last.modified);
    document.title = last.filter;
});