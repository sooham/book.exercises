function every(array, f) {
    for (var i = 0; i < array.length; i++) {
        if (!f(array[i])) {
            return false;
        }
    }
    return true;
}

function some(array, f) {
    for (var i = 0; i < array.length; i++) {
        if (f(array[i])) {
            return true;
        }
    }

    return false;
}