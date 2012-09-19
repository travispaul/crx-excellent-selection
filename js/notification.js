$(function(){
    var
        $txt = $('textarea'),
        last = JSON.parse(localStorage.getItem('lastSelection'));
    $txt.val(last.modified);
});