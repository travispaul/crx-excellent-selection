(function (window, undefined) {

    'use strict';

    function i18n(msg) {
        return (typeof chrome.i18n === 'object') ?
                chrome.i18n.getMessage(msg) : msg;
    }

    var exsel = {

        // Set to false for unit tests
        runAsExtension : true,

        // Defaults for options that persists in local storage
        options: {
            selectionColor: null,
            selectionBackground: null,
            useNotifications: 'on',
            useTabs: 'off',
            useClipboard: 'off',
            visibleFilters: ['LowerCase', 'UpperCase', 'Length', 'Shuffle',
                'Reverse', 'Replace', 'WordCount', 'WordWrap', 'Base64Encode',
                'Base64Decode', 'UrlEncode', 'StripTags', 'RemoveWhitespace',
                'MD5', 'SHA1', 'SHA256', 'SHA512', 'FormatXML', 'FormatJSON',
                'FormatCSS', 'FormatSQL']
        },

        // Get list of active filters
        getFilters: function () {
            var filters = localStorage.getItem('visibleFilters');
            return filters ? JSON.parse(filters) : exsel.options.visibleFilters;
        },

        // Get selection style
        // Example result: { color: '#000000', background: '#eeeeee' }
        getSelectionStyle: function () {
            return {
                color: localStorage.getItem('selectionColor')
                    || exsel.options.selectionColor,
                background: localStorage.getItem('selectionBackground')
                    || exsel.options.selectionBackground
            };
        },

        // Get Output method
        // Example result: { useNotifications: true, useTabs: false }
        getOutputMethod: function () {
            return {
                useNotifications: localStorage.getItem('useNotifications')
                    || exsel.options.useNotifications,
                useTabs: localStorage.getItem('useTabs')
                    || exsel.options.useTabs,
                useClipboard: localStorage.getItem('useClipboard')
                    || exsel.options.useClipboard
            };
        },

        // The selection has been filtered and is now processed
        returnSelection: function (original, modified, filter, url) {
            var filterName = i18n(filter) || filter;
            if (exsel.runAsExtension) {
                chrome.extension.sendMessage({
                    original: original,
                    modified: modified.toString(),
                    filter: filterName,
                    filterId: filter,
                    url: url
                });
            }
            return modified;
        },

        filters: {
            LowerCase: {
                name: i18n('LowerCase'),
                desc: i18n('LowerCaseDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.toLowerCase(),
                        'LowerCase',
                        txt.pageUrl);
                }
            },
            UpperCase: {
                name: i18n('UpperCase'),
                desc: i18n('UpperCaseDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.toUpperCase(),
                        'UpperCase',
                        txt.pageUrl);
                }
            },
            UpperCaseWords: {
                name: i18n('UpperCaseWords'),
                desc: i18n('UpperCaseWordsDesc'),
                exec: function (txt) {
                    var txt = txt.selectionText.replace(/\w\S*/g, function (txt) { 
                        return txt.charAt(0).toUpperCase() + txt.substr(1);
                    });
                    return exsel.returnSelection(txt.selectionText,
                        txt,
                        'UpperCaseWords',
                        txt.pageUrl);
                }
            },
            Length: {
                name: i18n('Length'),
                desc: i18n('LengthDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.length, 'Length',
                        txt.pageUrl);
                }
            },
            Shuffle: {
                name: i18n('Shuffle'),
                desc: i18n('ShuffleDesc'),
                exec: function (txt) {
                    var
                        a = txt.selectionText.split(""),
                        n = a.length, i, j, tmp;

                    for (i = n - 1; i > 0; i -= 1) {
                        j = Math.floor(Math.random() * (i + 1));
                        tmp = a[i];
                        a[i] = a[j];
                        a[j] = tmp;
                    }

                    return exsel.returnSelection(txt.selectionText,
                        a.join(""), 'Shuffle', txt.pageUrl);
                }
            },
            Reverse : {
                name: i18n('Reverse'),
                desc: i18n('ReverseDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.split("").reverse().join(""),
                        'Reverse', txt.pageUrl);
                }
            },
            Replace: {
                name: i18n('Replace'),
                desc: i18n('ReplaceDesc'),
                exec: function (txt) {
                    var
                        find = (txt.hasOwnProperty('search')) ?
                                txt.search : prompt('Search:'),
                        re = (txt.hasOwnProperty('replace')) ?
                                txt.replace : prompt('Replace'),
                        exp = new RegExp(find, 'g');


                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.replace(exp, re),
                        'Replace', txt.pageUrl);
                }
            },
            WordCount: {
                name: i18n('WordCount'),
                desc: i18n('WordCountDesc'),
                exec: function (txt) {
                    var words = (txt.selectionText.length) ?
                            txt.selectionText.split(/\s+/).length : 0;

                    return exsel.returnSelection(txt.selectionText, words,
                        'WordCount', txt.pageUrl);
                }
            },
            WordWrap: {
                name: i18n('WordWrap'),
                desc: i18n('WordWrapDesc'),
                exec: function (txt) {
                    function wordwrap(str, widthNum, breakChar, cutOpt) {
                        var
                            brk = breakChar || '\n',
                            width = widthNum || 75,
                            cut = cutOpt || false,
                            regex;

                        if (!str) {
                            return str;
                        }

                        regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' +
                                width + '}|.+$' : '|\\S+?(\\s|$)');

                        return str.match(new RegExp(regex, 'g')).join(brk);
                    }

                    return exsel.returnSelection(txt.selectionText,
                        wordwrap(txt.selectionText,
                            prompt('Line Width:'), "\n"), 'WordWrap',
                            txt.pageUrl);
                }
            },
            Base64Encode: {
                name: i18n('Base64Encode'),
                desc: i18n('Base64EncodeDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        btoa(txt.selectionText), 'Base64Encode',
                        txt.pageUrl);
                }
            },
            Base64Decode: {
                name: i18n('Base64Decode'),
                desc: i18n('Base64DecodeDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        atob(txt.selectionText), 'Base64Decode',
                        txt.pageUrl);
                }
            },
            UrlEncode: {
                name: i18n('URLEncode'),
                desc: i18n('URLEncodeDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        escape(txt.selectionText), 'URLEncode',
                        txt.pageUrl);
                }
            },
            StripTags: {
                name: i18n('StripTags'),
                desc: i18n('StripTagsDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.replace(/(<([^>]+)>)/ig, ""),
                        'StripTags', txt.pageUrl);
                }
            },
            RemoveWhitespace: {
                name: i18n('RemoveWhitespace'),
                desc: i18n('RemoveWhitespaceDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        txt.selectionText.replace(/ /g, ''),
                        'RemoveWhitespace', txt.pageUrl);
                }
            },
            FormatXML: {
                name: i18n('FormatXML'),
                desc: i18n('FormatXMLDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        vkbeautify.xml(txt.selectionText),
                        'FormatXML', txt.pageUrl);
                }
            },
            FormatJSON: {
                name: i18n('FormatJSON'),
                desc: i18n('FormatJSONDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        vkbeautify.json(txt.selectionText),
                        'FormatJSON', txt.pageUrl);
                }
            },
            FormatCSS: {
                name: i18n('FormatCSS'),
                desc: i18n('FormatCSSDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        vkbeautify.css(txt.selectionText),
                        'FormatCSS', txt.pageUrl);
                }
            },
            FormatSQL: {
                name: i18n('FormatSQL'),
                desc: i18n('FormatSQLDesc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        vkbeautify.sql(txt.selectionText),
                        'FormatSQL', txt.pageUrl);
                }
            },
            MD5: {
                name: 'MD5',
                desc: i18n('MD5Desc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        CryptoJS.MD5(txt.selectionText).toString(), 'MD5',
                            txt.pageUrl);
                }
            },
            SHA1: {
                name: 'SHA1',
                desc: i18n('SHA1Desc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        CryptoJS.SHA1(txt.selectionText).toString(), 'SHA1',
                            txt.pageUrl);
                }
            },
            SHA224: {
                name: 'SHA224',
                desc: i18n('SHA224Desc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        CryptoJS.SHA224(txt.selectionText).toString(),
                        'SHA224', txt.pageUrl);
                }
            },
            SHA256: {
                name: 'SHA256',
                desc: i18n('SHA256Desc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        CryptoJS.SHA256(txt.selectionText).toString(),
                        'SHA256', txt.pageUrl);
                }
            },
            SHA384: {
                name: 'SHA384',
                desc: i18n('SHA384Desc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        CryptoJS.SHA384(txt.selectionText).toString(),
                        'SHA384', txt.pageUrl);
                }
            },
            SHA512: {
                name: 'SHA512',
                desc: i18n('SHA512Desc'),
                exec: function (txt) {
                    return exsel.returnSelection(txt.selectionText,
                        CryptoJS.SHA512(txt.selectionText).toString(),
                        'SHA512', txt.pageUrl);
                }
            },
            PigLatin: {
                name: 'Pig Latin',
                desc: i18n('PigLatinDesc'),
                exec: function (txt) {
                    var
                        firstPass = /\b([aeiou][a-z]*)\b/gi,
                        secondPass = /\b([bcdfghjklmnpqrstvwxy]+)([a-z]*)\b/gi,
                        text = txt.selectionText.replace(firstPass, "$1way");

                    text = txt.selectionText.replace(secondPass, "$2$1ay");

                    return exsel.returnSelection(txt.selectionText,
                            text, 'Pig Latin', txt.pageUrl);
                }
            }
        },

        // Initialze context menus
        createCtxMenus: function () {
            var
                visibleFilters = exsel.getFilters(),
                filter;

            chrome.contextMenus.removeAll();

            for (filter in visibleFilters) {
                if (visibleFilters.hasOwnProperty(filter) &&
                        exsel.filters.hasOwnProperty(visibleFilters[filter])) {
                    chrome.contextMenus.create({
                        title: exsel.filters[visibleFilters[filter]].name,
                        contexts: ['selection'],
                        onclick: exsel.filters[visibleFilters[filter]].exec
                    });
                }
            }
        }
    };

    window.exsel = exsel;
    window.i18n = i18n;

}(window));
