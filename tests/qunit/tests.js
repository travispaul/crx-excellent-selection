$(function(){
    module("Tests");

    exsel.runAsExtension = false;

    test("LowerCase", 2, function() {
        equal(exsel.filters.LowerCase.exec({ selectionText: 'ABC' }), 'abc');
        equal(exsel.filters.LowerCase.exec({ selectionText: 'xyz' }), 'xyz');
    });

    test("UpperCase", 2, function() {
        equal(exsel.filters.UpperCase.exec({ selectionText: 'ABC' }), 'ABC');
        equal(exsel.filters.UpperCase.exec({ selectionText: 'xyz' }), 'XYZ');
    });

    test("Length", 2, function() {
        equal(exsel.filters.Length.exec({ selectionText: 'ABC' }), 3);
        equal(exsel.filters.Length.exec({ selectionText: '' }), 0);
    });

    test("Shuffle", 3, function() {
        notEqual(exsel.filters.Shuffle.exec({ selectionText: 'Shuffle Me' }), 'Shuffle Me');
        equal(exsel.filters.Shuffle.exec({ selectionText: 'a' }), 'a');
        equal(exsel.filters.Shuffle.exec({ selectionText: '' }), '');
    });

    test("Reverse", 3, function() {
        equal(exsel.filters.Reverse.exec({ selectionText: 'Reverse Me' }), 'eM esreveR');
        equal(exsel.filters.Reverse.exec({ selectionText: 'a' }), 'a');
        equal(exsel.filters.Reverse.exec({ selectionText: '' }), '');
    });

    test("Replace", 4, function() {
        equal(exsel.filters.Replace.exec({ selectionText: 'Microsoft is awesome', search: 'awesome', replace: 'lame' }), 'Microsoft is lame');
        equal(exsel.filters.Replace.exec({ selectionText: 'what what what', search: 'what', replace: 'when' }), 'when when when');
        equal(exsel.filters.Replace.exec({ selectionText: 'a', search: 'a', replace: 'a' }), 'a');
        equal(exsel.filters.Replace.exec({ selectionText: 'a', search: '', replace: '' }), 'a');
    });

    test("WordCount", 3, function() {
        equal(exsel.filters.WordCount.exec({ selectionText: 'Count you some words for great good.' }), 7);
        equal(exsel.filters.WordCount.exec({ selectionText: 'a' }), 1);
        equal(exsel.filters.WordCount.exec({ selectionText: '' }), 0);
    });

    test("Base64Encode", 1, function() {
        // base64 from coreutils
        var coreutils = {
            text: "I am a Base64 encoded string from base64 (GNU coreutils) 8.4",
            string: "SSBhbSBhIEJhc2U2NCBlbmNvZGVkIHN0cmluZyBmcm9tIGJhc2U2NCAoR05VIGNvcmV1dGlscykgOC40"
        }

        equal(exsel.filters.Base64Encode.exec({ selectionText: coreutils.text }), coreutils.string);
    });

    test("Base64Decode", 1, function() {
        // base64 from coreutils
        var coreutils = {
            text: "I am a Base64 encoded string from base64 (GNU coreutils) 8.4",
            string: "SSBhbSBhIEJhc2U2NCBlbmNvZGVkIHN0cmluZyBmcm9tIGJhc2U2NCAoR05VIGNvcmV1dGlscykgOC40"
        }

        equal(exsel.filters.Base64Decode.exec({ selectionText: coreutils.string }), coreutils.text);
    });

    test("UrlEncode", 1, function() {
        equal(exsel.filters.UrlEncode.exec({ selectionText: '~!@#$%^&*()_+`-={}|[]\:";<>?,./*' }), '%7E%21@%23%24%25%5E%26*%28%29_+%60-%3D%7B%7D%7C%5B%5D%3A%22%3B%3C%3E%3F%2C./*');
    });

    test("StripTags", 1, function() {
        equal(exsel.filters.StripTags.exec({ selectionText: '<b><u><i>Hi</i></u></b><br />' }), 'Hi');
    });

    test("Remove Whitespace", 1, function() {
        equal(exsel.filters.RemoveWhitespace.exec({ selectionText: " Oh, hai " }), 'Oh,hai');
    });

    test("MD5", 2, function() {

        // md5 from coreutils
        var coreutils = {
            text: "I am a MD5 hash from md5sum (GNU coreutils) 8.4",
            hash: "0c1da84eb1ddabd3ccdfbca97a2793d9"
        },
        coreutilsEmpty = {
            text: "",
            hash: "d41d8cd98f00b204e9800998ecf8427e"
        }

        equal(exsel.filters.MD5.exec({ selectionText: coreutils.text }), coreutils.hash);
        equal(exsel.filters.MD5.exec({ selectionText: "" }), coreutilsEmpty.hash);
    });

    test("SHA1", 2, function() {

        // sha1 from coreutils
        var coreutils = {
            text: "I am a SHA-1 hash from sha1sum (GNU coreutils) 8.4",
            hash: "7ddb63254214a580c882818818f0707d639b59fa"
        },
        coreutilsEmpty = {
            text: "",
            hash: "da39a3ee5e6b4b0d3255bfef95601890afd80709"
        }
        
        equal(exsel.filters.SHA1.exec({ selectionText: coreutils.text }), coreutils.hash);
        equal(exsel.filters.SHA1.exec({ selectionText: "" }), coreutilsEmpty.hash);
    });

    test("SHA256", 2, function() {

        // sha256 from coreutils
        var coreutils = {
            text: "I am a SHA-256 hash from sha256sum (GNU coreutils) 8.4",
            hash: "16bcf47512855ebbe815e904d52154b96e4163d56d3110d67047460aa685e76f"
        },
        coreutilsEmpty = {
            text: "",
            hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        }

        equal(exsel.filters.SHA256.exec({ selectionText: coreutils.text }), coreutils.hash);
        equal(exsel.filters.SHA256.exec({ selectionText: "" }), coreutilsEmpty.hash);
    });

    test("SHA512", 2, function() {

        // sha512 from coreutils
        var coreutils = {
            text: "I am a SHA-512 hash from sha512sum (GNU coreutils) 8.4",
            hash: "5e12d22f70313a153b946f3b8c87cf2e40fc3e4b0d178c4dbe41134b2c176ddc3aecb0d34528f7804e8484e5e397cf35948565d793fb8d9e4de3a36ad0a21763"
        },
        coreutilsEmpty = {
            text: "",
            hash: "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e"
        }

        equal(exsel.filters.SHA512.exec({ selectionText: coreutils.text }), coreutils.hash);
        equal(exsel.filters.SHA512.exec({ selectionText: "" }), coreutilsEmpty.hash);
    });

    test("Pig Lating", 2, function() {
        equal(exsel.filters.PigLatin.exec({ selectionText: 'This is kind of a joke' }), 'isThay is indkay of a okejay');
        equal(exsel.filters.PigLatin.exec({ selectionText: '' }), '');
    });

});