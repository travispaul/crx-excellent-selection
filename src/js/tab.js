$(function () {

    'use strict';

    var
        last = JSON.parse(localStorage.getItem('lastSelection')),
        mode,
        codemirror;

    document.title = last.filter;

    // Load parsing mode
    switch (last.filterId) {
    case 'FormatXML':
        mode = 'xml';
        break;
    case 'FormatJSON':
        mode = {name: 'javascript', json: true};
        break;
    case 'FormatCSS':
        mode = 'css';
        break;
    case 'FormatSQL':
        mode = 'mysql';
        break;
    }

    codemirror = new CodeMirror(document.body, {
        value: last.modified,
        mode: mode,
        lineNumbers: true,
        autofocus: true
    });

});
