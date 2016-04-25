"use strict";

// iterable and iterator design pattern
// next(): boolean
// hasNext(): Object
function Iterator() {}
Iterator.prototype.hasNext = function() {};
Iterator.prototype.next = function() {};

function Iterable() {}
Iterable.prototype.getIterator = function() {};

// ArraySeq
function ArrayIterator(array) {
    Iterator.call(this);
    this.array = array;
    this.index = 0;
}
ArrayIterator.prototype = Object.create(Iterator.prototype);
ArrayIterator.prototype.hasNext = function() {
    return this.index < this.array.length;
}
ArrayIterator.prototype.next = function() {
    if (this.hasNext()) {
        return this.array[this.index++];
    }
}
function ArraySeq(array) {
    Iterable.call(this);
    this.array = array;
}
ArraySeq.prototype = Object.create(Iterable.prototype);
ArraySeq.prototype.getIterator = function() {
    return new ArrayIterator(this.array);
}

// RangeSeq
function RangeIterator(from, to) {
    Iterator.call(this);
    this.from = from;
    this.to = to;
    this.cur = 0;
    this.step = (from < to) ? 1: -1;
}
RangeIterator.prototype = Object.create(Iterator.prototype);
RangeIterator.prototype.hasNext = function() {
    return this.cur <= Math.abs(this.to - this.from);
}
RangeIterator.prototype.next = function() {
    if (this.hasNext())
        return this.from + (this.cur++) * this.step;
}
function RangeSeq(from, to) {
    Iterable.call(this);
    this.from = from;
    this.to = to
}
RangeSeq.prototype = Object.create(Iterable.prototype);
RangeSeq.prototype.getIterator = function() {
    return new RangeIterator(this.from, this.to);
}

// logFive
function logFive(iterable) {
    var iterator = iterable.getIterator();
    for (var i = 0; i < 5 && iterator.hasNext(); i++) {
        console.log(iterator.next());
    }
}

