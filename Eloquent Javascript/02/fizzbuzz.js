"use strict";
for (var i = 1; i <= 100; i++) {
    var out = "";
    if (i % 3 === 0) {
        out += "Fizz";
    }
    if (i % 5 === 0) {
        out += "Buzz";
    }

    if (!out) {
        out = i;
    }

    console.log(out);
}
