$(function(){
    var
        $localSetting = $('.localSetting'),
        $filterList = $('#filterList'),
        $filters,
        currentFilter,
        selectionStyle,
        visibleFilters = exsel.getFilters(),
        $selectionCheck = $('#selectionCheck'),
        $selectionOptions = $('#selectionOptions'),
        $selectionPreview = $('#selectionPreview'),
        $custom = $('#custom');

    function updateSelectionPreview() {
        selectionStyle = exsel.getSelectionStyle();
        var
            background = 'background: ' + selectionStyle.background + ';',
            color = 'color:'  + selectionStyle.color + ';';
        $selectionPreview.text('').text('::selection {' + background + color + '}');
    }

    updateSelectionPreview();

    // get values from local storage
    $localSetting.each(function(){
        this.value = localStorage.getItem(this.id);
    });

    // set a value when it chnages
    $localSetting.change(function(){
        localStorage.setItem(this.id, this.value);
        updateSelectionPreview();
    });

    for (currentFilter in exsel.filters) {
        var checked = '';
        if($.inArray(currentFilter, visibleFilters) !== -1) {
            checked = 'checked';
        }

        $filterList.append(
        '<li>'+
            '<input type="checkbox" id="'+currentFilter+'" class="filter" '+checked+'/><label for="'+currentFilter+'" title="'+exsel.filters[currentFilter].desc+'">'+exsel.filters[currentFilter].name+'</label>' +
        '</li>');
    }

    $filters = $('.filter');

    // anytime a single value is changed, the entire array is saved
    $filters.change(function(){

        var filterArray = [];

        $filters.each(function(){
            if(this.checked) {
                filterArray.push(this.id);
            }
        });

        localStorage.setItem('visibleFilters', JSON.stringify(filterArray));
        exsel.createCtxMenus();
    });

    $selectionCheck.change(function(){
        if(this.checked) {
            $selectionOptions.show();
            $('input[type=color]').trigger('change');
        } else {
            $selectionOptions.hide();
            localStorage.removeItem('selectionColor');
            localStorage.removeItem('selectionBackground');
            updateSelectionPreview();
        }
    });

    if(selectionStyle.color || selectionStyle.background) {
        $selectionCheck[0].checked = true;
        $selectionOptions.show();
    }

    $custom.val(localStorage.getItem('customPreviewText') || '');

    $custom.blur(function(){
        localStorage.setItem('customPreviewText', this.value);
    });

    $('[data-i18n-text]').each(function(){
        this.textContent = i18n(this.dataset.i18nText);
    });

    $('[data-i18n-title]').each(function(){
        this.title = i18n(this.dataset.i18nTitle);
    });

});