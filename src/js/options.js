$(function () {

    'use strict';

    var
        $localSetting = $('.localSetting'),
        $filterList = $('#filterList'),
        $filters,
        currentFilter,
        checked = '',
        selectionStyle,
        visibleFilters = exsel.getFilters(),
        $selectionCheck = $('#selectionCheck'),
        $selectionOptions = $('#selectionOptions'),
        $selectionPreview = $('#selectionPreview'),
        $custom = $('#custom'),
        $i18nText = $('[data-i18n-text]'),
        $i18nTitle = $('[data-i18n-title]'),
        $outputMethod = $('.outputMethod'),
        outputMethods = exsel.getOutputMethod();

    function updateSelectionPreview() {
        selectionStyle = exsel.getSelectionStyle();
        var
            background = (selectionStyle.background) ?
                    'background: ' + selectionStyle.background + ';' : '',
            color = (selectionStyle.color) ?
                    'color:'  + selectionStyle.color + ';' : '';

        $selectionPreview.text('');

        if (background || color) {
            $selectionPreview.text('::selection {' + background + color + '}');
        }

    }

    updateSelectionPreview();

    // Get values from local storage
    $localSetting.each(function () {
        this.value = localStorage.getItem(this.id);
    });

    // Set a value when it chnages
    $localSetting.change(function () {
        localStorage.setItem(this.id, this.value);
        updateSelectionPreview();
    });


    $.each(exsel.filters, function (currentFilter) {

        checked = '';
        if ($.inArray(currentFilter, visibleFilters) !== -1) {
            checked = 'checked';
        }

        $filterList.append('<li>' +
                '<input type="checkbox" id="' + currentFilter +
                '" class="filter" ' + checked + '/>' +
                '<label for="' + currentFilter + '" title="' +
                exsel.filters[currentFilter].desc + '">' +
                exsel.filters[currentFilter].name +
                '</label>' +
                '</li>'
            );

    });

    $filters = $('.filter');

    // anytime a single value is changed, the entire array is saved
    $filters.change(function () {

        var filterArray = [];

        $filters.each(function () {
            if (this.checked) {
                filterArray.push(this.id);
            }
        });

        localStorage.setItem('visibleFilters', JSON.stringify(filterArray));
        exsel.createCtxMenus();
    });

    $selectionCheck.change(function () {
        if (this.checked) {
            $selectionOptions.show();
            $('input[type=color]').trigger('change');
        } else {
            $selectionOptions.hide();
            localStorage.removeItem('selectionColor');
            localStorage.removeItem('selectionBackground');
            updateSelectionPreview();
        }
    });

    if (selectionStyle.color || selectionStyle.background) {
        $selectionCheck[0].checked = true;
        $selectionOptions.show();
    }

    $custom.val(localStorage.getItem('customPreviewText') || '');

    $custom.blur(function () {
        localStorage.setItem('customPreviewText', this.value);
    });

    $i18nText.each(function () {
        this.textContent = i18n(this.dataset.i18nText);
    });

    $i18nTitle.each(function () {
        this.title = i18n(this.dataset.i18nTitle);
    });

    $.each(outputMethods, function (i) {
        if (outputMethods[i] === 'on') {
            $('#' + i).attr('checked', true);
        }
    });

    $outputMethod.change(function () {
        localStorage.setItem(this.id, this.checked ? 'on' : 'off');
    });
});
