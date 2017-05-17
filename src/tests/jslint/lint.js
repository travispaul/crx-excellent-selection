$(function () {

    'use strict';

    var
        scripts = [
            '../../js/excellent.js',
            '../../js/background.js',
            '../../js/tab.js',
            '../../js/options.js',
            '../../js/selection.js',
            'lint.js'],
        $txt = $('textarea'),
        $checked = $('#checked'),
        $current = $('#current'),
        ok = ' ✔ ok',
        fail = ' ✖ failed',
        config = {
            nomen : true,
            browser : true,
            es5 : true,
            maxlen: 80,
            regexp: true,
            predef: [
                'console',
                'atob',
                'btoa',
                'escape',
                'CryptoJS',
                'chrome',
                'webkitNotifications',
                'prompt',
                'vkbeautify',
                'exsel',
                '$',
                'i18n',
                'CodeMirror',
                'JSLINT']
        },
        proceed = true,
        r = (+new Date()),
        count = scripts.length,
        source = {};

    // Download each script
    $.each(scripts, function (index) {
        $.get(scripts[index] + '?' + r, function (response) {
            source[scripts[index]] = response;
            count -= 1;
            // Lint after downloading the last script
            if (count === 0) {
                $.each(scripts, function (index2) {

                    if (proceed) {
                        $current.text(scripts[index2]);
                        if (!JSLINT(source[scripts[index2]], config)) {

                            // format error output
                            $txt.text(JSLINT.errors.length + " Errors\n\n"
                                + JSON.stringify(JSLINT.errors, undefined, 2))
                                    .css({ color : 'red' });

                            // update title
                            document.title = fail;
                            proceed = false;

                        } else {
                            $txt.text(ok).css({ color : 'green' });
                            document.title = ok;
                        }
                        $checked.append(scripts[index2] + ', ');
                    }
                });
            }
        });
    });
});
