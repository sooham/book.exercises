"use strict";

function arrayToList(array) {
    var list = null;
    for (var i = array.length - 1; i >= 0; i--) {
        list = prepend(array[i], list);
    }
    return list;
}

function listToArray(list) {
    var result = [];
    var cur = list;
    while (cur !== null) {
        result.push(cur.value);
        cur = cur.rest;
    }

    return result;
}

function prepend(element, list) {
    // return a new list with element prepended
    var new_list = {value: element, rest: list};
    return new_list;
}

function nth(list, num) {
    if (num < 0)
      return undefined;

    var cur = list;
    var i = 0;
    while (i < num && cur !== null) {
        cur = cur.rest;
        i++;
    }
    return (cur !== null) ? cur.value : undefined;
}
