/* globals exsel, QUnit */
QUnit.test('LowerCase', function(assert) {
    assert.expect(2);
    assert.equal(exsel.filters.LowerCase.exec({ selectionText: 'ABC' }).modified, 'abc');
    assert.equal(exsel.filters.LowerCase.exec({ selectionText: 'xyz' }).modified, 'xyz');
});

QUnit.test('UpperCase', function(assert) {
    assert.expect(2);
    assert.equal(exsel.filters.UpperCase.exec({ selectionText: 'ABC' }).modified, 'ABC');
    assert.equal(exsel.filters.UpperCase.exec({ selectionText: 'xyz' }).modified, 'XYZ');
});

QUnit.test('Length', function(assert) {
    assert.expect(2);
    assert.equal(exsel.filters.Length.exec({ selectionText: 'ABC' }).modified, 3);
    assert.equal(exsel.filters.Length.exec({ selectionText: '' }).modified, 0);
});

QUnit.test('Shuffle', function(assert) {
    assert.expect(3);
    assert.notEqual(exsel.filters.Shuffle.exec({ selectionText: 'Shuffle Me' }).modified, 'Shuffle Me');
    assert.equal(exsel.filters.Shuffle.exec({ selectionText: 'a' }).modified, 'a');
    assert.equal(exsel.filters.Shuffle.exec({ selectionText: '' }).modified, '');
});

QUnit.test('Reverse', function(assert) {
    assert.expect(3);
    assert.equal(exsel.filters.Reverse.exec({ selectionText: 'Reverse Me' }).modified, 'eM esreveR');
    assert.equal(exsel.filters.Reverse.exec({ selectionText: 'a' }).modified, 'a');
    assert.equal(exsel.filters.Reverse.exec({ selectionText: '' }).modified, '');
});

QUnit.test('Replace', function(assert) {
    assert.expect(4);
    assert.equal(exsel.filters.Replace.exec({ selectionText: 'Celery is awesome', search: 'awesome', replace: 'lame' }).modified, 'Celery is lame');
    assert.equal(exsel.filters.Replace.exec({ selectionText: 'what what what', search: 'what', replace: 'when' }).modified, 'when when when');
    assert.equal(exsel.filters.Replace.exec({ selectionText: 'a', search: 'a', replace: 'a' }).modified, 'a');
    assert.equal(exsel.filters.Replace.exec({ selectionText: 'a', search: '', replace: '' }).modified, 'a');
});

QUnit.test('WordCount', function(assert) {
    assert.expect(3);
    assert.equal(exsel.filters.WordCount.exec({ selectionText: 'Count you some words for great good.' }).modified, 7);
    assert.equal(exsel.filters.WordCount.exec({ selectionText: 'a' }).modified, 1);
    assert.equal(exsel.filters.WordCount.exec({ selectionText: '' }).modified, 0);
});

QUnit.test('Base64Encode', function(assert) {
    // base64 from coreutils
    var coreutils = {
        text: "I am a Base64 encoded string from base64 (GNU coreutils) 8.4",
        string: "SSBhbSBhIEJhc2U2NCBlbmNvZGVkIHN0cmluZyBmcm9tIGJhc2U2NCAoR05VIGNvcmV1dGlscykgOC40"
    };
    assert.expect(1);
    assert.equal(exsel.filters.Base64Encode.exec({ selectionText: coreutils.text }).modified, coreutils.string);
});

QUnit.test('Base64Decode', function(assert) {
    // base64 from coreutils
    var coreutils = {
        text: "I am a Base64 encoded string from base64 (GNU coreutils) 8.4",
        string: "SSBhbSBhIEJhc2U2NCBlbmNvZGVkIHN0cmluZyBmcm9tIGJhc2U2NCAoR05VIGNvcmV1dGlscykgOC40"
    };
    assert.expect(1);
    assert.equal(exsel.filters.Base64Decode.exec({ selectionText: coreutils.string }).modified, coreutils.text);
});

QUnit.test('UrlEncode', function(assert) {
    assert.expect(1);
    assert.equal(exsel.filters.UrlEncode.exec({ selectionText: '~!@#$%^&*()_+`-={}|[]\:";<>?,./*' }).modified, '%7E%21@%23%24%25%5E%26*%28%29_+%60-%3D%7B%7D%7C%5B%5D%3A%22%3B%3C%3E%3F%2C./*');
});

QUnit.test('StripTags', function(assert) {
    assert.expect(1);
    assert.equal(exsel.filters.StripTags.exec({ selectionText: '<b><u><i>Hi</i></u></b><br />' }).modified, 'Hi');
});

QUnit.test('Remove Whitespace', function(assert) {
    assert.expect(1);
    assert.equal(exsel.filters.RemoveWhitespace.exec({ selectionText: " Oh, hai " }).modified, 'Oh,hai');
});

QUnit.test('MD5', function(assert) {
    assert.expect(2);

    // md5 from coreutils
    var coreutils = {
        text: "I am a MD5 hash from md5sum (GNU coreutils) 8.4",
        hash: "0c1da84eb1ddabd3ccdfbca97a2793d9"
    },
    coreutilsEmpty = {
        text: "",
        hash: "d41d8cd98f00b204e9800998ecf8427e"
    };

    assert.equal(exsel.filters.MD5.exec({ selectionText: coreutils.text }).modified, coreutils.hash);
    assert.equal(exsel.filters.MD5.exec({ selectionText: "" }).modified, coreutilsEmpty.hash);
});

QUnit.test('SHA1', function(assert) {
    assert.expect(2);

    // sha1 from coreutils
    var coreutils = {
        text: "I am a SHA-1 hash from sha1sum (GNU coreutils) 8.4",
        hash: "7ddb63254214a580c882818818f0707d639b59fa"
    },
    coreutilsEmpty = {
        text: "",
        hash: "da39a3ee5e6b4b0d3255bfef95601890afd80709"
    };
    
    assert.equal(exsel.filters.SHA1.exec({ selectionText: coreutils.text }).modified, coreutils.hash);
    assert.equal(exsel.filters.SHA1.exec({ selectionText: "" }).modified, coreutilsEmpty.hash);
});

QUnit.test('SHA224', function(assert) {
    assert.expect(2);

    // sha256 from coreutils
    var coreutils = {
        text: "I am a SHA-224 hash from sha224sum (GNU coreutils) 8.4",
        hash: "debbba8c5da5a3eb14c6d93a0eb766743c03bae85ea6dd09f394f33c"
    },
    coreutilsEmpty = {
        text: "",
        hash: "d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f"
    };

    assert.equal(exsel.filters.SHA224.exec({ selectionText: coreutils.text }).modified, coreutils.hash);
    assert.equal(exsel.filters.SHA224.exec({ selectionText: "" }).modified, coreutilsEmpty.hash);
});

QUnit.test('SHA256', function(assert) {
    assert.expect(2);

    // sha256 from coreutils
    var coreutils = {
        text: "I am a SHA-256 hash from sha256sum (GNU coreutils) 8.4",
        hash: "16bcf47512855ebbe815e904d52154b96e4163d56d3110d67047460aa685e76f"
    },
    coreutilsEmpty = {
        text: "",
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    };

    assert.equal(exsel.filters.SHA256.exec({ selectionText: coreutils.text }).modified, coreutils.hash);
    assert.equal(exsel.filters.SHA256.exec({ selectionText: "" }).modified, coreutilsEmpty.hash);
});

QUnit.test('SHA384', function(assert) {
    assert.expect(2);

    // sha256 from coreutils
    var coreutils = {
        text: "I am a SHA-384 hash from sha384sum (GNU coreutils) 8.4",
        hash: "4820b19b2dc805f49f00b97d1e8a6ab4b2c1d3b6e5dbfce7216881d44f912d0195313983aa1e0ef677439385f555a63b"
    },
    coreutilsEmpty = {
        text: "",
        hash: "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b"
    };

    assert.equal(exsel.filters.SHA384.exec({ selectionText: coreutils.text }).modified, coreutils.hash);
    assert.equal(exsel.filters.SHA384.exec({ selectionText: "" }).modified, coreutilsEmpty.hash);
});

QUnit.test('SHA512', function(assert) {
    assert.expect(2);

    // sha512 from coreutils
    var coreutils = {
        text: "I am a SHA-512 hash from sha512sum (GNU coreutils) 8.4",
        hash: "5e12d22f70313a153b946f3b8c87cf2e40fc3e4b0d178c4dbe41134b2c176ddc3aecb0d34528f7804e8484e5e397cf35948565d793fb8d9e4de3a36ad0a21763"
    },
    coreutilsEmpty = {
        text: "",
        hash: "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e"
    };

    assert.equal(exsel.filters.SHA512.exec({ selectionText: coreutils.text }).modified, coreutils.hash);
    assert.equal(exsel.filters.SHA512.exec({ selectionText: "" }).modified, coreutilsEmpty.hash);
});

QUnit.test('Pig Latin', function(assert) {
    assert.expect(2);
    assert.equal(exsel.filters.PigLatin.exec({ selectionText: 'This is kind of a joke' }).modified, 'isThay is indkay of a okejay');
    assert.equal(exsel.filters.PigLatin.exec({ selectionText: '' }).modified, '');
});

QUnit.test('Uppercase Words', function(assert) {
    assert.expect(6);
    var
        s1 = "here is a sentence.",
        s2 = "Here Is A Sentence Again.",
        s3 = "hERE iS aNOTHER oNE",
        s4 = "AND ANOTHER ONE, WHAT ABOUT \n LINE \n BREAKS TOO!",
        s5 = "I expect the fUnCtIoN to keep my FORMATTING.";

    assert.equal(exsel.filters.UpperCaseWords.exec({ selectionText: s1 }).modified, 'Here Is A Sentence.');
    assert.equal(exsel.filters.UpperCaseWords.exec({ selectionText: s2 }).modified, 'Here Is A Sentence Again.');
    assert.equal(exsel.filters.UpperCaseWords.exec({ selectionText: s3 }).modified, 'HERE IS ANOTHER ONE');
    assert.equal(exsel.filters.UpperCaseWords.exec({ selectionText: s4 }).modified, 'AND ANOTHER ONE, WHAT ABOUT \n LINE \n BREAKS TOO!');
    assert.equal(exsel.filters.UpperCaseWords.exec({ selectionText: s5 }).modified, 'I Expect The FUnCtIoN To Keep My FORMATTING.');
    assert.equal(exsel.filters.UpperCaseWords.exec({ selectionText: '' }).modified, '');
});

QUnit.test('ROT-13', function(assert) {
    assert.expect(3);
    var
        before = "A quick movement of the enemy will jeopardize six gunboats",
        after = "N dhvpx zbirzrag bs gur rarzl jvyy wrbcneqvmr fvk thaobngf",
        output,
        check = "abcxyz 0123456789 \n ~`!@#$%^&*()_+{}|[]\\:;'\",<.>/?";

    assert.equal(exsel.filters.ROT13.exec({ selectionText: before }).modified, after);
    output = exsel.filters.ROT13.exec({ selectionText: check });
    assert.equal(exsel.filters.ROT13.exec({ selectionText: output.modified }).modified, check);
    assert.equal(exsel.filters.ROT13.exec({ selectionText: '' }).modified, '');
});