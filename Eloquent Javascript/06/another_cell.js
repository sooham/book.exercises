"use strict";

function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {result += string;}
    return result;
}

function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = Math.max(inner.minWidth(), width);
    this.height = Math.max(inner.minHeight(), height);
}

StretchCell.prototype.minWidth = function() {
    return this.width;
}

StretchCell.prototype.minHeight = function() {
    return this.height;
}

StretchCell.prototype.draw = function() {
    // right and bottom pad
    var result = [];
    for (var row = 0; row < this.height; row++) {
        if (this.inner.text[row] === undefined)
            result.push(repeat(" ", this.width));
        else
            result.push(this.inner.text[row] + repeat(" ", this.width - this.inner.text[row].length));
    }

    return result;
}
