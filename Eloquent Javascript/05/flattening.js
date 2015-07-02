function flatten(ary) {
    return ary.reduce(function (a, b) { return a.concat(b);});
}
