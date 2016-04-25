"use strict";

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Object.defineProperty(Vector.prototype, "length", {
    get: function () { return Math.sqrt(this.x * this.x + this.y * this.y);}
});
// x, y property belongs to instance

// plus property belongs to Vector object, not instance
Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.minus = function (other) {
    return new Vector(this.x - other.x, this.y - other.y);
}


