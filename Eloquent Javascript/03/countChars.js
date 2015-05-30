function countChar (x, str) {
    var result = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == x) {
            result++;
        }
    }
    return result;
}

// Simple solution