"use strict";

var size = 8;

var palette = [" ", "#"];

for (var row = 0; row < size; row++) {
    var line = "";
    for (var col = 0; col < size; col++) {
        line += palette[(row + col) % 2];
    }
    console.log(line);
}
