"use strict";

function reverseArray(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.unshift(array[i]);
    }

    return result;
}

function reverseArrayInPlace(array) {
    for (var i = 0; i < Math.floor(array.length / 2); i++) {
        var temp = array[array.length - 1 - i];
        array[array.length - 1 - i] = array[i];
        array[i] = temp;
    }
}
