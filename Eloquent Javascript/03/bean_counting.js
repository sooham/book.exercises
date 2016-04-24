"use strict";

function countChar(str, chr) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === chr) {
            count++;
        }
    }

    return count;
}

function countBs(str) {
    return countChar(str, 'B');
}
