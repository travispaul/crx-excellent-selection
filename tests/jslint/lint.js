$(function(){
    var
        scripts = ['../../js/excellent.js'],
        $txt = $('textarea'),
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
                'prompt']
        };

    $.each(scripts, function(index){
       $.get(scripts[index], function(response){

            if (!JSLINT(response, config)) {

                // format error output
                $txt.text(JSLINT.errors.length + " Errors\n\n"
                    + JSON.stringify(JSLINT.errors, undefined, 2)).css({
                        color : 'red' });

                // update title
                document.title = selected.text() + fail;

            } else {
                $txt.text(ok).css({ color : 'green' });
                document.title = selected.text() + ok;
            }
       });
    });
});