/* Implement a cell type named StretchCell(inner, width, height)
 * that conforms to the table cell interface, it should wrap
 * another cell and ensure that the resulting cell has at least the given
 * height and width.
  */

function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
}

StretchCell.prototype.minWidth = function() {
    return Math.max(this.inner.minWidth(), this.width);
};

StretchCell.prototype.minHeight = function() {
    return Math.max(this.inner.minHeight(), this.height);
};

StretchCell.prototype.draw = function(width, height){
    return this.innter.draw(width, height);
};


