$(function(){
    var
        scripts = [
            '../../js/excellent.js',
            '../../js/background.js',
            '../../js/notification.js',
            '../../js/options.js',
            '../../js/selection.js'],
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
                'i18n']
        };

    $.each(scripts, function(index){
       $current.text(scripts[index]);
       $.get(scripts[index], function(response){

            if (!JSLINT(response, config)) {

                // format error output
                $txt.text(JSLINT.errors.length + " Errors\n\n"
                    + JSON.stringify(JSLINT.errors, undefined, 2)).css({
                        color : 'red' });

                // update title
                document.title = fail;

            } else {
                $txt.text(ok).css({ color : 'green' });
                document.title = ok;
            }
            $checked.append(scripts[index] + ', ');
       });
    });
});