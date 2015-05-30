function arrayToList(ary) {
    if (ary.length === 0) {
        return null;
    } else {
        return {value: ary[0], rest: arrayToList(ary.slice(1))};
    }
}

function listToArray(list) {
    return [list.value].concat(list.rest !== null ? listToArray(list.rest): []);
}

function prepend(element, list) {
    return {value: element, rest: list};
}

function nth(list, num) {
    if (num > 0) {
        return nth(list.rest, num - 1);
    } else if (num === 0) {
        return list.value;
    } else {
        return undefined;
    }
}