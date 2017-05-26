/* globals chrome, $, i18n */
$(function () {
    'use strict';
    
    var
        $i18nText = $('[data-i18n-text]');

    $i18nText.each(function () {
        this.textContent = i18n(this.dataset.i18nText);
    });

    $.get(chrome.runtime.getURL('release.html'), function(response){
        $('.release').append(response);
    });

});