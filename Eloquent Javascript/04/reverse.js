function reverseArray(ary) {
    var result = [];

    for (var i = 0; i < ary.length; i++) {
        result.unshift(ary[i]);
    }

    return result;
}

function reverseArrayInPlace(ary) {
    for (var i = 0; i < Math.floor((ary.length - 1) / 2); i++) {
        temp = ary[ary.length - 1 - i];
        ary[ary.length - 1 - i] = ary[i];
        ary[i] = temp;
    }
}

/* Personally, I am expecting that reverse an array in place (mutating)
 * is less efficient than creating a whole new array.
 */